'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ReviewFormProps {
	parentReviewId?: number | null;
	setParentReviewId: Dispatch<SetStateAction<number | null>>
	onSubmit: (review: {
		rating: number;
		title: string;
		description: string;
		parent_review?: number;
	}) => Promise<void>;
}

export const ReviewForm = ({ parentReviewId, onSubmit, setParentReviewId }: ReviewFormProps) => {
	const { t } = useTranslation();
	const [rating, setRating] = useState(3);
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSubmit({
			rating,
			title,
			description,
			...(parentReviewId && { parent_review: parentReviewId })
		});
		setTitle('');
		setDescription('');
	};

	const handleRemovereplie = () => {
		setParentReviewId(0)
	}
	return (
		<div className="review-form">
			<h4>{t('product.post_comment')}</h4>
			{parentReviewId && (
				<button onClick={handleRemovereplie}>
					<div className="reply-notice">
						{t('product.replying_to_review')}
					</div>
				</button>
			)}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>{t('product.rating')}</label>
					<select
						value={rating}
						onChange={(e) => setRating(Number(e.target.value))}
					>
						{[1, 2, 3, 4, 5].map((num) => (
							<option key={num} value={num}>
								{num} {t('product.stars')}
							</option>
						))}
					</select>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder={t('product.title')}
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<textarea
						placeholder={t('product.message')}
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<button type="submit" className="">
					{t('product.post')}
					submit
				</button>
			</form>
		</div>
	);
};
