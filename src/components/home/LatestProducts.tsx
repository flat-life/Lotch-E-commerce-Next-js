'use client'
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import authClient from '@/services/authClient';

interface Product {
	id: number;
	title: string;
	price: number;
	org_price: number;
	images: { image: string }[];
}

interface LatestProductsProps {
	products: Product[];
}

const LatestProducts: React.FC<LatestProductsProps> = ({ products }) => {
	const addToCart = async (productId: number) => {
		const cartId = localStorage.getItem('cartId');

		try {
			if (!cartId) {
				const cartResponse = await authClient.post('/cart/');
				localStorage.setItem('cartId', cartResponse.data.id);
				await addToCart(productId);
			} else {
				await authClient.post(`/cart/${cartId}/items/`, {
					product_id: productId,
					quantity: 1,
				});
				alert('Item added to cart successfully');
			}
		} catch (error) {
			console.error('Error adding item to cart:', error);
			if (error.response?.status === 401) {
				localStorage.removeItem('JWT');
				alert('Session expired. Please log in again.');
			} else {
				alert('Failed to add item to cart');
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
								<h1>Latest Products</h1>
							</div>
						</div>
					</div>
					<div className="row" id="productContainer">
						{products.map((product) => (
							<div key={product.id} className="col-lg-4 col-md-6 single-product">
								<img
									src={product.images[0]?.image || '/img/default-product.jpg'}
									alt={product.title}
									width={300}
									height={200}
								/>
								<div className="product-details">
									<h6>{product.title}</h6>
									<div className="price">
										<h6>${product.price.toFixed(2)}</h6>
										{product.org_price !== product.price && (
											<h6 className="l-through">${product.org_price.toFixed(2)}</h6>
										)}
									</div>
									<div className="prd-bottom">
										<button className="social-info" onClick={() => addToCart(product.id)}>
											<span className="ti-bag"></span>
											<p className="hover-text">Add to bag</p>
										</button>
										<Link href={`/products/${product.id}`}>
											<span className="lnr lnr-move"></span>
											<p className="hover-text">View more</p>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
};

export default LatestProducts;
