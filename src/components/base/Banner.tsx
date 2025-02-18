"use client";

import Link from "next/link";

export default function Banner() {
  return (
    <section className="banner-area organic-breadcrumb">
      <div className="container">
        <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
          <div className="col-first">
            <h1 className="text-danger">{"Shop"}</h1>
            <nav className="d-flex align-items-center">
              <Link className="text-danger" href="/">
                {"Home"}
                <span className="lnr lnr-arrow-right"></span>
              </Link>
              <Link className="text-danger" href="/products">
                {"Shop"}
                <span className="lnr lnr-arrow-right"></span>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
