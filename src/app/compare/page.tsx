import Loading from "@/components/base/Loading";
import apiClient from "@/services/apiClient";
import Link from "next/link";
import { Suspense } from "react";

interface ComparisonData {
  [key: string]: {
    [productTitle: string]: string | number;
  };
}

export default async function ComparePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const productIds = getProductIdsFromSearchParams(searchParams);

  if (!productIds.length) {
    return (
      <section className="flex justify-center items-center w-full p-10">
        <div className="text-5xl">No products selected for comparison</div>
      </section>
    );
  }

  const { comparisonData, error } = await fetchComparisonData(productIds);

  if (error) {
    return (
      <section className="flex justify-center items-center w-full p-10">
        <div className="text-5xl">{error}</div>
      </section>
    );
  }

  if (!comparisonData) {
    return (
      <section className="flex justify-center items-center w-full p-10">
        <div className="text-5xl">No comparison data available</div>
      </section>
    );
  }

  return <ComparisonTable comparisonData={comparisonData} />;
}
