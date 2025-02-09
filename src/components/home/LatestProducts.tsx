"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import authClient from "@/services/authClient";
import ProductCardTiny from "../products/ProductCardTiny";
import { Product } from "@/lib/products";

interface LatestProductsProps {
  products: Product[];
}

const LatestProducts: React.FC<LatestProductsProps> = ({ products }) => {
  return (
    <section className="lattest-product-area pb-40 category-list">
      <div className="single-product-slider">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-title">
                <h1>Latest Products</h1>
              </div>
            </div>
          </div>
          <div className="row" id="productContainer">
            {products.map((product: Product) => (
              <ProductCardTiny
                product={product}
                key={product.id}
                onCompare={null}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;

export const LatestProductsSkeleton = () => (
  <section className="lattest-product-area pb-40 category-list">
    <div className="single-product-slider w-full justify-center">
      <div className="container justify-center">
        <div className="row justify-content-center">
          <div className="col-lg-6 text-center">
            <div className="section-title">
              <h1>Latest Products</h1>
            </div>
          </div>
        </div>
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
    </div>
  </section>
);
