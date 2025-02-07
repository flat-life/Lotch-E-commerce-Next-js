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
            {products.map((product) => (
              <ProductCardTiny product={product} key={product.id} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestProducts;
