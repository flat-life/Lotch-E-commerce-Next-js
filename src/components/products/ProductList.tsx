"use client";
import { useState, useEffect } from "react";
import FilterBar from "./FilterBar";
import { buildApiUrl, Product, ApiResponse } from "@/lib/products";
import Pagination from "../base/Pagination";
import SidebarFilters from "./SidebarFilters";
import AppliedFilters from "./AppliedFilters";
import apiClient from "@/services/apiClient";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import ProductCardTiny from "./ProductCardTiny";

export default function ProductList({
  initialProducts,
  collections,
  features,
}: {
  initialProducts: ApiResponse;
  collections: any;
  features: any;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [products, setProducts] = useState(initialProducts.results);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(initialProducts.count);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [appliedFilters, setAppliedFilters] = useState<Record<string, any>>(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      const filters: Record<string, any> = {};
      if (params.get("search")) filters.search = params.get("search");
      return filters;
    }
  );

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const newFilters: Record<string, any> = {};

    params.forEach((value, key) => {
      newFilters[key] = value;
    });

    setAppliedFilters((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(newFilters)) return prev;
      return newFilters;
    });
  }, [searchParams]);

  const updateFilters = (newFilters: Record<string, any>) => {
    setAppliedFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  };

  const removeFilter = (filterKey: string) => {
    console.log(filterKey);
    const params = new URLSearchParams(searchParams.toString());

    if (filterKey === "search") {
      params.delete("search");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      return;
    }

    setAppliedFilters((prev) => {
      const newFilters = { ...prev };
      delete newFilters[filterKey];
      if (filterKey === "featureKey") {
        delete newFilters["featureValue"];
      }
      return newFilters;
    });
  };
  useEffect(() => {
    //const abortController = new AbortController();

    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const url = buildApiUrl(currentPage, appliedFilters);
        //				const response = await apiClient.get(url, {
        //					signal: abortController.signal
        //				});
        const response = await apiClient.get(url);

        setProducts(response.data.results);
        console.log(response.data.results);
        setTotalCount(response.data.count);
      } catch (error) {
        //if (!abortController.signal.aborted) {
        console.error("Error fetching products:", error);
        //}
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();

    //return () => abortController.abort();
  }, [currentPage, appliedFilters]);

  const handleCompare = () => {
    const compareUrl = `/compare/?product_ids=${selectedProducts.join(
      "&product_ids="
    )}`;
    window.location.href = compareUrl;
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap gap-8 p-4">
      {/* Sidebar Filters - Left Column */}
      <div className="w-full md:w-64 shrink-0">
        <SidebarFilters
          collections={collections}
          features={features}
          onFilterChange={updateFilters}
          appliedFilters={appliedFilters}
        />
      </div>

      {/* Main Content - Right Column */}
      <div className="flex-1">
        <FilterBar
          onFilterChange={updateFilters}
          selectedProducts={selectedProducts}
          onCompare={handleCompare}
          appliedFilters={appliedFilters}
        />

        <AppliedFilters filters={appliedFilters} onRemove={removeFilter} />

        <section className="mt-4">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="card bg-base-200 h-96 skeleton rounded-none "
                >
                  <div className="card-body rounded-none">
                    <div className="h-48 skeleton bg-base-300 rounded-none mb-4"></div>
                    <div className="h-4 bg-base-300 rounded-none w-3/4"></div>
                    <div className="h-4 bg-base-300 rounded-none w-1/2 mt-2"></div>
                    <div className="h-4 skeleton bg-base-300 rounded-none w-full mt-2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product) => (
                <ProductCardTiny
                  key={product.id}
                  product={product}
                  onCompare={(productId) =>
                    setSelectedProducts((prev) =>
                      prev.includes(productId)
                        ? prev.filter((id) => id !== productId)
                        : [...prev, productId]
                    )
                  }
                />
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 flex justify-center">
          <Pagination
            currentPage={currentPage}
            totalItems={totalCount}
            itemsPerPage={9}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
}
