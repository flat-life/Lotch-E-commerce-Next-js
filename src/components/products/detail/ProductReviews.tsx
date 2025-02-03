// app/products/[id]/ProductReviews.tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'react-i18next';

interface ProductReviewsProps {
	productId: string;
	initialReviews: ProductReview[];
}

export function ProductReviews({ productId, initialReviews }: ProductReviewsProps) {
	const t = useTranslations('ProductDetails');
	const [reviews, setReviews] = useState(initialReviews);
	const [parentReviewId, setParentReviewId] = useState<string | null>(null);

	const handleSubmitReview = async (reviewData: ReviewFormData) => {
		// Implement review submission
	};

	return (
		<div className="tab-pane fade" id="reviews" role="tabpanel">
			<div className="row">
				<div className="col-lg-6">
					<div className="comment_list">
						{reviews.map((review) => (
							<ReviewItem
								key={review.id}
								review={review}
								onReply={() => setParentReviewId(review.id)}
							/>
						))}
					</div>
				</div>

				<div className="col-lg-6">
					<ReviewForm
						onSubmit={handleSubmitReview}
						parentReviewId={parentReviewId}
						onClearReply={() => setParentReviewId(null)}
					/>
				</div>
			</div>
		</div>
	);
}
