import apiClient from "@/services/apiClient";
import { openDB, DBSchema, IDBPDatabase } from "idb";
import { Product } from "./products";

interface ProductAnalyticsDB extends DBSchema {
  userSessions: {
    key: string;
    value: {
      sessionId: string;
      productHistory: number[];
      lastActivity: Date;
    };
  };
  navigationChains: {
    key: [number, number];
    value: {
      sourceId: number;
      targetId: number;
      weight: number;
      lastUpdated: Date;
    };
    indexes: {
      bySource: "sourceId";
    };
  };
}

const DB_NAME = "ProductFlow";
const DB_VERSION = 2; // Incremented version to force schema update
const SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const initDB = async (): Promise<IDBPDatabase<ProductAnalyticsDB>> => {
  return openDB<ProductAnalyticsDB>(DB_NAME, DB_VERSION, {
    upgrade(db, oldVersion) {
      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains("userSessions")) {
        db.createObjectStore("userSessions", { keyPath: "sessionId" });
      }

      if (!db.objectStoreNames.contains("navigationChains")) {
        const chainStore = db.createObjectStore("navigationChains", {
          keyPath: ["sourceId", "targetId"],
        });
        chainStore.createIndex("bySource", "sourceId");
      }
    },
  });
};

class SessionManager {
  private sessionId: string;
  private db: IDBPDatabase<ProductAnalyticsDB>;

  constructor(db: IDBPDatabase<ProductAnalyticsDB>) {
    this.db = db;
    this.sessionId =
      sessionStorage.getItem("flowSession") || crypto.randomUUID();
    sessionStorage.setItem("flowSession", this.sessionId);
  }

  async trackProductView(productId: number) {
    const tx = this.db.transaction(
      ["userSessions", "navigationChains"],
      "readwrite"
    );
    try {
      const session = await tx.objectStore("userSessions").get(this.sessionId);
      const now = new Date();

      // Handle new or expired session
      if (
        !session ||
        now.getTime() - session.lastActivity.getTime() > SESSION_TIMEOUT
      ) {
        await tx.objectStore("userSessions").put({
          sessionId: this.sessionId,
          productHistory: [productId],
          lastActivity: now,
        });
      } else {
        // Update existing session
        const updatedHistory = [...session.productHistory, productId];
        await tx.objectStore("userSessions").put({
          ...session,
          productHistory: updatedHistory,
          lastActivity: now,
        });

        // Create relationships with all previous products
        const previousProducts = updatedHistory.slice(0, -1);
        await this.updateNavigationChains(tx, previousProducts, productId);
      }

      await tx.done;
    } catch (error) {
      tx.abort();
      throw error;
    }
  }

  private async updateNavigationChains(
    tx: any,
    sources: number[],
    target: number
  ) {
    await Promise.all(
      sources.map(async (sourceId) => {
        if (sourceId === target) return;

        const entry = await tx
          .objectStore("navigationChains")
          .get([sourceId, target]);
        await tx.objectStore("navigationChains").put({
          sourceId,
          targetId: target,
          weight: entry ? entry.weight + 1 : 1,
          lastUpdated: new Date(),
        });
      })
    );
  }

  async cleanExpiredSessions() {
    const tx = this.db.transaction("userSessions", "readwrite");
    const store = tx.objectStore("userSessions");
    let cursor = await store.openCursor();
    const now = new Date();

    while (cursor) {
      if (
        now.getTime() - cursor.value.lastActivity.getTime() >
        SESSION_TIMEOUT
      ) {
        await cursor.delete();
      }
      cursor = await cursor.continue();
    }
    await tx.done;
  }
}

// Initialize database and session manager
let dbInstance: IDBPDatabase<ProductAnalyticsDB> | null = null;

export const getDB = async () => {
  if (!dbInstance) {
    dbInstance = await initDB();
    const manager = new SessionManager(dbInstance);
    await manager.cleanExpiredSessions();
  }
  return dbInstance;
};

// Tracking API
export const trackProductView = async (productId: number) => {
  const db = await getDB();
  const manager = new SessionManager(db);
  await manager.trackProductView(productId);
};

export const getProductSuggestions = async (
  productId: number
): Promise<Product[]> => {
  const db = await initDB();
  const tx = db.transaction("navigationChains");
  const chains = await tx.store.index("bySource").getAll(productId);

  // Get top 4 most frequent connections
  const sorted = chains.sort((a, b) => b.weight - a.weight).slice(0, 4);

  // Fetch product details
  return Promise.all(
    sorted.map(async ({ targetId }) => {
      try {
        const response = await apiClient.get(`/products/${targetId}`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch suggestion:", error);
        return null;
      }
    })
  ).then((results) => results.filter(Boolean) as Product[]);
};
