import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Banner {
	product: {
		title: string;
		description: string;
		images: { image: string }[];
	}[];
}

interface BannerAreaProps {
	banners: Banner[];
}

const BannerArea: React.FC<BannerAreaProps> = ({ banners }) => {
	return (
		<section className="banner-area">
			<div className="container">
				<div className="row fullscreen align-items-center justify-content-start">
					<div className="col-lg-12">
						<div className="active-banner-slider owl-carousel" id="product-slider">
							{banners.map((banner, index) => (
								<div key={index} className="row single-slide align-items-center d-flex">
									<div className="col-lg-5 col-md-6">
										<div className="banner-content">
											<h1>{banner.product[0].title}</h1>
											<p>{banner.product[0].description}</p>
											<Link href="/products">
												<a className="add-btn">
													<span className="lnr lnr-cross"></span>
													<span className="add-text text-uppercase">Shop Now</span>
												</a>
											</Link>
										</div>
									</div>
									<div className="col-lg-7">
										<div className="banner-img">
											<Image
												src={banner.product[0].images[0]?.image || '/img/banner/banner-img.png'}
												alt={banner.product[0].title}
												width={500}
												height={300}
											/>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default BannerArea;
