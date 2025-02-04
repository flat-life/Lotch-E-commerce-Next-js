'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Product, ProductReview } from '@/lib/products';
import { ReviewItem } from './ReviewItem';
import { ReviewForm } from './ReviewForm';
import { addToCart } from '@/lib/cart';

interface ProductDetailsProps {
	product: Product;
	initialReviews: ProductReview[];
	lang: string;
}

export const ProductDetails = ({ product, initialReviews, lang = 'en' }: ProductDetailsProps) => {
	const { t } = useTranslation();
	const [quantity, setQuantity] = useState(1);
	const [parentReviewId, setParentReviewId] = useState<number | null>(null);
	const [reviews, setReviews] = useState<ProductReview[]>(initialReviews);

	const handleAddToCart = async () => {
		try {
			await addToCart(
				product.id,
				quantity
			);
		} catch (error) {
		}
	};

	const handleReviewSubmit = async (reviewData: {
		rating: number;
		title: string;
		description: string;
		parent_review?: number;
	}) => {
		try {
			const response = await fetch(`/api-v1/products/${product.id}/reviews/`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `JWT ${localStorage.getItem('JWT')}`
				},
				body: JSON.stringify(reviewData)
			});

			if (response.ok) {
				const newReview = await response.json();
				setReviews(prev => [...prev, newReview]);
			}
		} catch (error) {
			console.error('Review submission failed:', error);
		}
	};

	return (
		<div className="product-details">
			<div className="image-gallery">
				{product.images.map((image) => (
					<div key={image.id} className="image-item">
						<img
							src={image.image}
							alt={product.translations[lang]?.title}
							width={600}
							height={400}
							className="product-image"
						/>
					</div>
				))}
			</div>

			<div className="product-info">
				<h1>{product.translations[lang]?.title}</h1>
				<div className="price">{product.price.toFixed(2)}</div>
				<div className="quantity-selector">
					<button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
					<span>{quantity}</span>
					<button onClick={() => setQuantity(quantity + 1)}>+</button>
				</div>
				<button
					onClick={handleAddToCart}
					className="add-to-cart-btn"
					disabled={product.inventory === 0}
				>
					{t('product.add_to_cart')}
				</button>
			</div>

			<div className="specifications">
				<h3>{t('product.specifications')}</h3>
				<table>
					<tbody>
						{product.value_feature.map((feature) => (
							<tr key={feature.id}>
								<td>{feature.key.translations[lang]?.key}</td>
								<td>{feature.value.translations[lang]?.value}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			<div className="reviews-section">
				<h3>{t('product.reviews')}</h3>
				<div className="reviews-list">
					{reviews.map((review) => (
						<ReviewItem
							key={review.id}
							review={review}
							onReply={setParentReviewId}
						/>
					))}
				</div>
				<ReviewForm
					productId={product.id}
					parentReviewId={parentReviewId}
					setParentReviewId={setParentReviewId}
					onSubmit={handleReviewSubmit}
				/>
			</div>
		</div>
	);
};
