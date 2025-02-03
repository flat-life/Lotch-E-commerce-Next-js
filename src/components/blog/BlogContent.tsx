import { Blog } from '@/lib/blog';

export default function BlogContent({ blog }: { blog: Blog }) {
	const formatDate = (dateString: string) => {
		const options: Intl.DateTimeFormatOptions = {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		};
		return new Date(dateString).toLocaleDateString(undefined, options);
	};

	return (
		<section className="blog_area single-post-area section_gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12 posts-list">
						<div className="single-post row">
							<div className="col-lg-12">
								<div className="feature-img">
									<img
										src={blog.thumbnail}
										alt={blog.title}
										width={1200}
										height={600}
										className="img-fluid"
									/>
								</div>
							</div>
							<div className="col-lg-3 col-md-3">
								<div className="blog_info text-right">
									<ul className="blog_meta list">
										<li className="text-capitalize">
											<i className="lnr lnr-user"></i>
											{`${blog.author.first_name} ${blog.author.last_name}`}
										</li>
										<li>
											<i className="lnr lnr-calendar-full"></i>
											{formatDate(blog.updated_at)}
										</li>
										<li>
											<i className="lnr lnr-eye"></i>
											{`${blog.views} Views`}
										</li>
										<li>
											<i className="lnr lnr-bubble"></i>
											{`${blog.comments_count} Comments`}
										</li>
									</ul>
								</div>
							</div>
							<div className="col-lg-9 col-md-9 blog_details">
								<h2>{blog.title}</h2>
								<p className="excert">{blog.body}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
