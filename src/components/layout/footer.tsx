import Link from "next/link";
import { FaHeart, FaTelegram, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { FaLinkedin } from "react-icons/fa6";

const Footer = ({ siteSettings }: { siteSettings: any }) => {
  const t = useTranslations("Footer");

  return (
    <footer className="footer footer-center bg-[#F7F8FA] text-primary-content pt-10">
      <aside className="px-10">
        <Image
          src="/edifice.svg"
          alt="edifice"
          width="190"
          height="30"
          className=""
        />
        <p className="font-bold">
          {siteSettings?.footer_text}
          <br />
          <span className="text-gray-500 font-light">
            {siteSettings?.address}
          </span>
        </p>
        <p className="text-gray-500">
          {t("copyright", { year: new Date().getFullYear() })}
        </p>
        <p className="flex items-center gap-1 text-gray-500">
          <span className="text-amber-600 font-semibold">{t("made")}</span> with{" "}
          <span className="text-rose-600 w-fit h-fit">
            <FaHeart />
          </span>{" "}
          by{" "}
          <Link
            className="text-blue-800 font-semibold"
            href="https://github.com/flat-life"
            target="_blank"
          >
            Flatlife
          </Link>
        </p>
      </aside>
      <nav className="text-gray-800">
        <div className="grid grid-flow-col gap-4">
          <Link href="https://www.linkedin.com/in/yousof-a-asadi">
            <FaLinkedin className="size-6" />
          </Link>
          <Link href={`${siteSettings?.telegram_link}`}>
            <FaTelegram className="size-6" />
          </Link>
          <Link href="https://github.com/flat-life">
            <FaGithub className="size-6" />
          </Link>
        </div>
      </nav>
      <div className="w-full">
        <div className="w-full flex text-xxs items-center gap-10 pl-9">
          <p className="m-0">{t("information")}</p>
          <p className="m-0">{t("contactUs")}</p>
          <p className="m-0">{t("termsOfUse")}</p>
          <p className="m-0">{t("cookiePolicy")}</p>
          <p className="m-0">{t("privacyPolicy")}</p>
        </div>
        <div className="w-full flex text-xxxs items-center gap-10 pl-2 font-bold">
          <p className="m-0">{t("companyCopyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
