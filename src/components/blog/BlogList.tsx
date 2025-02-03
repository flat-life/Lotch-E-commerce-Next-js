'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import Link from 'next/link';
import type { Blog } from '@/lib/blog';
import Pagination from '../base/Pagination';

interface BlogListProps {
	blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
	console.log({ blogs })
	const { t } = useTranslation();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;

	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;
	const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	return (
		<section className="blog_area" dir="ltr">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="blog_left_sidebar">
							{currentBlogs.map((blog) => (
								<article key={blog.id} className="row blog_item">
									<div className="col-lg-3 col-md-3">
										<div className="blog_info text-right">
											<ul className="blog_meta list">
												<li>
													<i className="lnr lnr-user" />
													{blog.author.first_name} {blog.author.last_name}
												</li>
												<li>
													<i className="lnr lnr-calendar-full" />
													{new Date(blog.updated_at).toLocaleDateString(
														undefined,
														{
															year: 'numeric',
															month: 'short',
															day: 'numeric',
														}
													)}
												</li>
												<li>
													<i className="lnr lnr-eye" />
													{blog.views} {t('views')}
												</li>
												<li>
													<i className="lnr lnr-bubble" />
													{blog.comments_count} {t('comments')}
												</li>
											</ul>
										</div>
									</div>
									<div className="col-md-9">
										<div className="blog_post">
											<div className="blog_img">
												<img
													src={blog.thumbnail}
													alt={blog.title}
													width={730}
													height={300}
													className="img-fluid"
												/>
											</div>
											<div className="blog_details">
												<Link href={`/blogs/${blog.id}`}>
													<h2>{blog.title}</h2>
												</Link>
												<Link
													href={`/blogs/${blog.id}`}
													className="genric-btn primary"
												>
													{t('view_more')}
												</Link>
											</div>
										</div>
									</div>
								</article>
							))}
						</div>
					</div>

					<div className="filter-bar d-flex flex-wrap align-items-center">
						<Pagination
							currentPage={currentPage}
							totalItems={blogs.length}
							itemsPerPage={itemsPerPage}
							onPageChange={handlePageChange}
						/>
					</div>
				</div>
			</div>
		</section>
	);
}
