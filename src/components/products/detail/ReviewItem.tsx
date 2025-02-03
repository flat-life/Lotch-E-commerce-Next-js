'use client';

import { useTranslation } from 'react-i18next';
import { ProductReview } from '@/lib/products';

interface ReviewItemProps {
	review: ProductReview;
	onReply: (reviewId: number) => void;
	level?: number;
}

export const ReviewItem = ({ review, onReply, level = 0 }: ReviewItemProps) => {
	const { t } = useTranslation();
	const marginLeft = level * 32;
	return (
		<div className="review-item" style={{ marginLeft: `${marginLeft}px` }}>
			<div className="media">
				<div className="media-body">
					<h4>{`${review.customer.first_name} ${review.customer.last_name}`}</h4>
					<h5>{new Date(review.created_at).toLocaleDateString()}</h5>
					<div className="rating">
						{Array.from({ length: 5 }, (_, i) => (
							<span key={i} className={`star ${i < review.rating ? 'filled' : ''}`}>
								★
							</span>
						))}
					</div>
					<button
						className="reply-btn"
						onClick={() => onReply(review.id)}
					>
						{t('product.reply')}
					</button>
				</div>
			</div>
			<h6>{review.title}</h6>
			<p>{review.description}</p>

			{review.replies?.map((reply) => (
				<ReviewItem
					key={reply.id}
					review={reply}
					onReply={onReply}
					level={level + 1}
				/>
			))}
		</div>
	);
};
