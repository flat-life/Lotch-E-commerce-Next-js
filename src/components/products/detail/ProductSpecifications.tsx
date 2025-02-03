import { useTranslation } from 'react-i18next';

interface ProductSpecificationsProps {
	features: ProductFeature[];
}

export function ProductSpecifications({ features }: ProductSpecificationsProps) {
	const t = useTranslation('ProductDetails');

	return (
		<section className="product_description_area">
			<div className="container">
				<ul className="nav nav-tabs" id="myTab" role="tablist">
					<li className="nav-item">
						<a className="nav-link active" id="specs-tab" data-toggle="tab" href="#specs" role="tab">
							{t('specifications')}
						</a>
					</li>
				</ul>

				<div className="tab-content" id="myTabContent">
					<div className="tab-pane fade show active" id="specs" role="tabpanel">
						<div className="table-responsive">
							<table className="table">
								<tbody>
									{features.map((feature) => (
										<tr key={feature.id}>
											<td><h5>{feature.key}</h5></td>
											<td><h5>{feature.value}</h5></td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
