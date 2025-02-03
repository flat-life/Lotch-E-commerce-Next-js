'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import apiClient from '@/services/apiClient';

interface ComparisonData {
  [key: string]: {
    [productTitle: string]: string | number;
  };
}

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [comparisonData, setComparisonData] = useState<ComparisonData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const productIds = searchParams.getAll('product_ids');

    if (productIds.length === 0) {
      setError('No products selected for comparison');
      setLoading(false);
      return;
    }

    const fetchComparisonData = async () => {
      try {
        const response = await apiClient(
          `/compare/?product_ids=${productIds.join('&product_ids=')}`
        );

        //if (!response.ok) throw new Error('Failed to fetch comparison data');

        const data = response.data
        setComparisonData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load comparison data');
      } finally {
        setLoading(false);
      }
    };

    fetchComparisonData();
  }, [searchParams]);

  if (loading) {
    return (
      <section className="banner-area organic-breadcrumb">
        <div className="container text-center py-5">Loading...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="banner-area organic-breadcrumb">
        <div className="container text-center py-5 text-danger">{error}</div>
      </section>
    );
  }

  if (!comparisonData) {
    return (
      <section className="banner-area organic-breadcrumb">
        <div className="container text-center py-5">No comparison data available</div>
      </section>
    );
  }

  const productKeys = Object.keys(comparisonData);
  const featureKeys = Object.keys(comparisonData).filter(key => key !== 'Title');
  const productTitles = Object.keys(comparisonData['Title']);

  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1 className="text-danger">Compare Products</h1>
            <nav className="d-flex align-items-center">
              <a className="text-danger" href="/">
                Home<span className="lnr lnr-arrow-right"></span>
              </a>
              <a className="text-danger" href="/products">
                Shop
              </a>
              <span className="text-danger">Compare</span>
            </nav>
          </div>
        </div>
      </div>

      <section className="cart_area">
        <div className="container">
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>
                      <h6>Title</h6>
                    </th>
                    {productTitles.map((title, index) => (
                      <th key={index}>{title}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {featureKeys.map((featureKey, index) => (
                    <tr key={index}>
                      <td>
                        <h6>{featureKey}</h6>
                      </td>
                      {productTitles.map((productTitle, idx) => (
                        <td key={idx}>{comparisonData[featureKey][productTitle]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
