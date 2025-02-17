"use client";
import { useTranslations } from "next-intl";

const BlogBanner = () => {
  const t = useTranslations("BlogBanner");

  return (
    <section className="">
      <div className="flex-col justify-center items-center flex lg:px-64 md:px-40 sm:px-20 px-10">
        <img src="/banner/ga-2100-banner-main.jpg" alt={t("altText")} />
        <div className="bg-gray-200 w-full my-10 p-16 text-black">
          <div className="">
            <h1 className="font-bold text-3xl">{t("brandName")}</h1>
            <p className="font-light tracking-wider">{t("description")}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogBanner;
