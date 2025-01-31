'use client'
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function Banner() {
	const { t } = useTranslation();

	return (
		<section className="banner-area organic-breadcrumb">
			<div className="container">
				<div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
					<div className="col-first">
						<h1 className="text-danger">{t("Shop")}</h1>
						<nav className="d-flex align-items-center">
							<Link className="text-danger" href="/">
								{t("Home")}<span className="lnr lnr-arrow-right"></span>
							</Link>
							<Link className="text-danger" href="/products">
								{t("Shop")}<span className="lnr lnr-arrow-right"></span>
							</Link>
						</nav>
					</div>
				</div>
			</div>
		</section>
	);
}
