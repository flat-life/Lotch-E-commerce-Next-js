'use client';

import { useState } from 'react';
import apiClient from '@/services/apiClient';

export default function CommentsSection({
	blogId,
	initialComments,
}: {
	blogId: string;
	initialComments: any[];
}) {
	const [comments, setComments] = useState(initialComments);
	const [formData, setFormData] = useState({ subject: '', message: '' });

	const getToken = () => {
		if (typeof window !== 'undefined') {
			return localStorage.getItem('JWT');
		}
		return null;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const response = await apiClient.post(
				`/blog/blogs/${blogId}/comments/`,
				formData,
				{
					headers: {
						Authorization: `JWT ${getToken()}`,
					},
				}
			);

			if (response.status === 201) {
				setComments([...comments, response.data]);
				setFormData({ subject: '', message: '' });
				alert('Your comment has been received! It will be shown after checking');
			}
		} catch (error) {
			console.error('Error submitting comment:', error);
			alert('Error submitting comment. Please try again.');
		}
	};

	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<section className="comments-area">
			<div className="container">
				<div className="comment-list">
					{comments.map((comment) => (
						<div key={comment.id} className="single-comment justify-content-between d-flex">
							<div className="user justify-content-between d-flex">
								<div className="desc">
									<p className="text-capitalize m-0">
										{`${comment.customer.first_name} ${comment.customer.last_name}`}
									</p>
									<p className="date">{formatDate(comment.created_at)}</p>
									<h6>{comment.subject}</h6>
									<p className="comment">{comment.message}</p>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="comment-form">
					<h4>Leave a Comment</h4>
					<form onSubmit={handleSubmit}>
						<div className="form-group">
							<input
								type="text"
								className="form-control"
								placeholder="Subject"
								value={formData.subject}
								onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
								required
							/>
						</div>
						<div className="form-group">
							<textarea
								className="form-control mb-10"
								rows={5}
								placeholder="Message"
								value={formData.message}
								onChange={(e) => setFormData({ ...formData, message: e.target.value })}
								required
							/>
						</div>
						<button type="submit" className="primary-btn submit_btn">
							Post Comment
						</button>
					</form>
				</div>
			</div>
		</section>
	);
}
