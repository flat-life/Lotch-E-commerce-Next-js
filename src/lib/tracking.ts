import { openDB } from "idb";

const DB_NAME = "ProductAnalytics";
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("navigationEvents")) {
        db.createObjectStore("navigationEvents", {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains("productRelationships")) {
        db.createObjectStore("productRelationships", {
          keyPath: ["sourceProductId", "targetProductId"],
        });
      }
    },
  });
};

export const trackProductView = async (productId: number) => {
  const db = await initDB();
  const sessionId = sessionStorage.getItem("sessionId") || crypto.randomUUID();

  await db.add("navigationEvents", {
    sessionId,
    productId,
    entryTime: new Date(),
  });

  sessionStorage.setItem("sessionId", sessionId);
  sessionStorage.setItem("currentProduct", productId.toString());
};

export const trackProductExit = async () => {
  const db = await initDB();
  const sessionId = sessionStorage.getItem("sessionId");
  const currentProduct = sessionStorage.getItem("currentProduct");

  if (sessionId && currentProduct) {
    const tx = db.transaction("navigationEvents", "readwrite");
    const store = tx.objectStore("navigationEvents");
    const events = await store.getAll();

    const currentEvent = events
      .reverse()
      .find(
        (e) =>
          e.sessionId === sessionId &&
          e.productId === Number(currentProduct) &&
          !e.exitTime
      );

    if (currentEvent) {
      currentEvent.exitTime = new Date();
      currentEvent.duration =
        currentEvent.exitTime.getTime() - currentEvent.entryTime.getTime();
      await store.put(currentEvent);
    }
  }
};
