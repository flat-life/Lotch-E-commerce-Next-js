"use client";
import { Product } from "@/lib/products";
import { useTranslations } from "next-intl";

const FeaturesImage = ({ product }: { product: Product }) => {
  const t = useTranslations("FeaturesImage");

  return (
    <>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/03_10bar.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">{t("waterResistant")}</h1>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/58_collaboration.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">{t("collaboration")}</h1>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/22_ligth_strong.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">{t("lightAndStrong")}</h1>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/46_tough_mat.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">{t("extraToughBand")}</h1>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/55_sporty.png"
            alt={product.title}
            className="w-full object-cover h-full p-5"
          />
          <h1 className="text-md font-extrabold">{t("sportyDesign")}</h1>
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-[#F4F5F8] flex-col justify-center items-center text-center p-14">
          <img
            src="/globalfeatures/57_limited.png"
            alt={product.title}
            className="w-full object-cover h-full"
          />
          <h1 className="text-md font-extrabold">{t("limitedModel")}</h1>
        </div>
      </div>
    </>
  );
};

export default FeaturesImage;
