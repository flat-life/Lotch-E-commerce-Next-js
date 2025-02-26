"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import authClient from "@/services/authClient";
import ProductCardTiny from "../products/ProductCardTiny";
import { Product } from "@/lib/products";
import { useTranslations } from "next-intl";

interface BestSalesProductsProps {
  products: Product[];
}

const BestSalesProducts: React.FC<BestSalesProductsProps> = ({ products }) => {
  const t = useTranslations("Home");
  const addToCart = async (productId: number) => {
    const cartId = localStorage.getItem("cartId");

    try {
      if (!cartId) {
        const cartResponse = await authClient.post("/cart/");
        localStorage.setItem("cartId", cartResponse.data.id);
        await addToCart(productId);
      } else {
        await authClient.post(`/cart/${cartId}/items/`, {
          product_id: productId,
          quantity: 1,
        });
        alert("Item added to cart successfully");
      }
    } catch (error: any) {
      console.error("Error adding item to cart:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("JWT");
        alert("Session expired. Please log in again.");
      } else {
        alert("Failed to add item to cart");
      }
    }
  };

  return (
    <section className="lattest-product-area pb-40 category-list">
      <div className="single-product-slider">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6 text-center">
              <div className="section-title">
                <h1>{t("BestSalesProducts")}</h1>
              </div>
            </div>
          </div>
          <div className="flex gap-8" id="productContainer">
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

export default BestSalesProducts;
