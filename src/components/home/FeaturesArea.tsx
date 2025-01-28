import React from 'react';
import Image from 'next/image';

const FeaturesArea: React.FC = () => {
	const features = [
		{
			icon: '/img/features/f-icon1.png',
			title: 'Free Delivery',
			description: 'Free Shipping on all order',
		},
		{
			icon: '/img/features/f-icon2.png',
			title: 'Return Policy',
			description: 'Free Shipping on all order',
		},
		{
			icon: '/img/features/f-icon3.png',
			title: '24/7 Support',
			description: 'Free Shipping on all order',
		},
		{
			icon: '/img/features/f-icon4.png',
			title: 'Secure Payment',
			description: 'Free Shipping on all order',
		},
	];

	return (
		<section className="features-area section_gap">
			<div className="container">
				<div className="row features-inner">
					{features.map((feature, index) => (
						<div key={index} className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-features">
								<div className="f-icon">
									<Image src={feature.icon} alt={feature.title} width={50} height={50} />
								</div>
								<h6>{feature.title}</h6>
								<p>{feature.description}</p>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FeaturesArea;
