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
    <div className="col-xl-9 col-lg-8 col-md-7">
      <SidebarFilters
        collections={collections}
        features={features}
        onFilterChange={updateFilters}
        appliedFilters={appliedFilters}
      />

      <FilterBar
        onFilterChange={updateFilters}
        selectedProducts={selectedProducts}
        onCompare={handleCompare}
        appliedFilters={appliedFilters}
      />

      <AppliedFilters filters={appliedFilters} onRemove={removeFilter} />

      <section className="lattest-product-area pb-40 category-list">
        {isLoading ? (
          <div className="text-center">
            <div
              className="self-center grid grid-cols-4 w-full justify-center space-y-4"
              id="productContainer"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="flex w-64 flex-wrap gap-4">
                  <div className="skeleton h-48 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-28"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-full"></div>
                  <div className="skeleton h-4 w-28"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="row" id=" flex gap-8">
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

      <Pagination
        currentPage={currentPage}
        totalItems={totalCount}
        itemsPerPage={9}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
