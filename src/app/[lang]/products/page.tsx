import ProductList from "@/components/products/ProductList";
import Banner from "@/components/base/Banner";
import { fetchInitialData } from "@/lib/products";

export default async function ProductsPage() {
  const { initialProducts, collections, features } = await fetchInitialData();

  return (
    <div className="container">
      <div className="">
        <ProductList
          initialProducts={initialProducts}
          collections={collections}
          features={features}
        />
      </div>
    </div>
  );
}
