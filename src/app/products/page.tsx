import ProductList from '@/components/products/ProductList';
import SidebarFilters from '@/components/products/SidebarFilters';
import Banner from '@/components/base/Banner';
import { fetchInitialData } from '@/lib/products';

export default async function ProductsPage() {
  const { initialProducts, collections, features } = await fetchInitialData();

  return (
    <div className="container">
      <Banner />
      <div className="row">
        <div className="col-xl-3 col-lg-4 col-md-5">
        </div>
        <ProductList initialProducts={initialProducts} collections={collections} features={features} />
      </div>
    </div>
  );
}
