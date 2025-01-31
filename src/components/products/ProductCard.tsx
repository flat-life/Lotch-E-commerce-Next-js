'use client';

import { Product } from '@/lib/products';
import { addToCart } from '@/lib/cart';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';

export default function ProductCard({ product, onCompare }: {
	product: Product;
	onCompare: (productId: string) => void;
}) {
	const { t } = useTranslation();

	return (
		<div className="col-lg-4 col-md-6 single-product">
			<img
				src={product.images?.[0]?.image || '/default-product.jpg'}
				className="img-fluid"
				alt={product.title}
			/>

			<div className="product-details">
				<h6>{product.title}</h6>
				<div className="price">
					<h6>${product.price.toFixed(2)}</h6>
					{product.org_price !== product.price && (
						<h6 className="l-through">${product.org_price.toFixed(2)}</h6>
					)}
				</div>
			</div>

			<div className="prd-bottom">
				<button
					className="social-info"
					onClick={() => addToCart(product.id)}
				>
					<span className="ti-bag"></span>
					<p className="hover-text">{t('Add to bag')}</p>
				</button>

				<button
					className="social-info"
					onClick={() => onCompare(product.id)}
				>
					<span className="lnr lnr-sync"></span>
					<p className="hover-text">{t('Compare')}</p>
				</button>

				<Link
					href={`/products/${product.id}`}
					className="social-info"
				>
					<span className="lnr lnr-move"></span>
					<p className="hover-text">{t('View more')}</p>
				</Link>
			</div>
		</div>
	);
}
