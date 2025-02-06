'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link'
import Image from 'next/image';

export default function ClientLayout({
	siteSettings,
	language,
	setLanguage,
	children,
}: {
	siteSettings: any;
	language: string;
	setLanguage: (lang: string) => void;
	children: React.ReactNode;
}) {
	const router = useRouter();

	const changeLanguage = (lang: string) => {
		setLanguage(lang);
	};
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget as HTMLFormElement);
		const searchQuery = formData.get('search_input') as string;

		const params = new URLSearchParams(searchParams.toString());

		if (searchQuery) {
			params.set('search', searchQuery);
		} else {
			params.delete('search');
		}

		router.push(`/products?${params.toString()}`);
	};
	return (





		<div dir={language === 'fa' ? 'rtl' : 'ltr'}>

			<header className="">
				<div>
					<Link href="/">
						<div className="text-gray-900 font-lighter flex items-center gap-4">
							<Image src='edifice.svg' alt="edifice" width='100' height='14' className="h-[14px]" />
							|
							<img src='casio-logo.svg' className='w-10' />
						</div>
					</Link>
				</div>
				<div className="main_menu">
					<nav className="navbar navbar-expand-lg navbar-light main_box">
						<form className="m-4" id="language-form">
							<input type="button" onClick={() => changeLanguage('fa')} value="fa" />
							<input type="button" onClick={() => changeLanguage('en')} value="en" />
						</form>
						<div className="container">
							<Link id="logo_top" className="navbar-brand logo_h" href="/">
								<img id="logoImage" className="img-fluid" style={{ width: '110px' }} src={siteSettings?.logo} alt="" />
							</Link>
							<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
								<span className="icon-bar"></span>
							</button>
							<div className="collapse navbar-collapse offset" id="navbarSupportedContent">
								<ul className="nav navbar-nav menu_nav ml-auto">
									<li className="nav-item mx-3"><Link href="/">Home</Link></li>
									<li className="nav-item mx-3"><Link href="/products">Shop</Link></li>
									<li className="nav-item mx-3"><Link href="/blogs">Blog</Link></li>
									<li className="nav-item mx-3"><Link href="/login">Login/Register</Link></li>
									<li className="nav-item mx-3"><a className="nav-link" href="https://yousofasadi.vercel.app/">About Me</a></li>
									<li className="nav-item mx-3"><Link href="/chat">Support</Link></li>
								</ul>
								<ul className="nav navbar-nav navbar-right">
									<li className="nav-item"><Link href="/cart"><span className="ti-bag"></span></Link></li>
									<li className="nav-item"><Link href="/profile"><span className="ti-user"></span></Link></li>
									<li className="nav-item">
										<button className="search"><span className="lnr lnr-magnifier" id="search"></span></button>
									</li>
								</ul>
							</div>
						</div>
					</nav>
				</div>
				<div className="" id="search_input_box">
					<div className="container">
						<form className="d-flex justify-content-between" onSubmit={handleSearch}>
							<input
								type="text"
								className="form-control"
								id="search_input"
								name="search_input"
								placeholder="Search Here"
								defaultValue={searchParams.get('search') || ''}
							/>
							<button type="submit" className="btn"></button>
							<span className="lnr lnr-cross" id="close_search" title="Close Search"></span>
						</form>
					</div>
				</div>
			</header>

			<main>{children}</main>

			<footer className="footer-area section_gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-footer-widget">
								<h6>About Us</h6>
								<p id="aboutUsText">{siteSettings?.footer_text}</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6">
							<div className="single-footer-widget">
								<h6>Address</h6>
								<p id="addressText">{siteSettings?.address}</p>
							</div>
						</div>
						<div className="col-lg-3 col-md-6 col-sm-6"></div>
						<div className="col-lg-2 col-md-6 col-sm-6">
							<div className="single-footer-widget">
								<h6>Follow Us</h6>
								<p>Let us be social</p>
								<div className="footer-social d-flex align-items-center">
									<a href={siteSettings?.telegram_link} id="telegramLink"><i className="fa fa-telegram"></i></a>
									<a href={siteSettings?.instagram_link} id="instagramLink"><i className="fa fa-instagram"></i></a>
									<a href={siteSettings?.whatsapp_link} id="whatsappLink"><i className="fa fa-whatsapp"></i></a>
									<a href={siteSettings?.twitter_link} id="twitterLink"><i className="fa fa-twitter"></i></a>
								</div>
							</div>
						</div>
					</div>
					<div className="footer-bottom d-flex justify-content-center align-items-center flex-wrap">
						<p className="footer-text m-0">
							Copyright &copy;{new Date().getFullYear()} All rights reserved | Made with <i className="fa fa-heart-o" aria-hidden="true"></i> by <a href="https://github.com/flat-life" target="_blank">Flatlife</a>
						</p>
					</div>
				</div>
			</footer>


		</div>
	);
};


