import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { BiMenu } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import { LuUserRound } from "react-icons/lu";
import { TbShoppingCart } from "react-icons/tb";
import Image from "next/image";
import LanguageSwitcher from "../base/LanguageSwitcher";
import { useTranslations } from "next-intl";

const Header = () => {
  const t = useTranslations("Header");
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const searchQuery = formData.get("search_input") as string;
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/products?${params.toString()}`);
  };

  return (
    <header className="w-full">
      <div
        className="bg-[#F4F5F8] flex gap-10 py-1 text-xxs px-5 text-black font-extralight"
        dir="rtl"
      >
        <p className="m-0">{t("information")}</p>
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="">
            <div className="flex items-center">
              <p className="m-0">{t("corporate")}</p> <IoIosArrowDown />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 
            rounded-box z-[1] w-52 p-2 shadow text-xxs"
          >
            <li>
              <p className="hover:underline">{t("corporateTop")}</p>
            </li>
            <li>
              <p className="hover:underline">{t("aboutCasio")}</p>
            </li>
            <li>
              <p className="hover:underline">{t("news")}</p>
            </li>
            <li>
              <p className="hover:underline">{t("investorRelations")}</p>
            </li>
            <li>
              <p className="hover:underline">{t("sustainability")}</p>
            </li>
          </ul>
        </div>
        <p className="m-0">{t("support")}</p>
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="">
            <div className="flex items-center w-52">
              <p className="m-0">{t("service")}</p> <IoIosArrowDown />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-full p-2 shadow text-xxs"
          >
            <li>
              <p className="hover:underline">
                {t("souvenirsAndPremiumProducts")}
              </p>
            </li>
            <li>
              <p className="hover:underline">{t("apps")}</p>
            </li>
          </ul>
        </div>
      </div>
      <LanguageSwitcher />
      <div className="bg-white flex items-center pb-4 sticky top-0 w-full">
        <div className="navbar bg-base-100 w-full sticky">
          <div className="dropdown lg:hidden flex items-center">
            <div tabIndex={0} role="button" className="btn btn-ghost mt-3">
              <BiMenu />
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-full p-2 shadow"
              >
                <li>
                  <Link href="/products">{t("watches")}</Link>
                </li>
                <li>
                  <Link href="/blogs">{t("blogs")}</Link>
                </li>
                <li>
                  <Link href="/chat">{t("support")}</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex-1 ml-5">
            <Link href="/">
              <div className="text-gray-900 font-lighter flex items-center gap-4">
                <Image
                  src="/edifice.svg"
                  alt="edifice"
                  width="100"
                  height="14"
                  className="h-[14px]"
                />
                |
                <img src="/casio-logo.svg" className="w-10" />
              </div>
            </Link>
          </div>
          <div className="navbar-center flex-1 hidden lg:flex text-gray-700">
            <ul className="menu menu-horizontal px-1 flex items-center text-gray-700">
              <li className="text-gray-700">
                <Link className="text-gray-700" href="/products">
                  {t("watches")}
                </Link>
              </li>
              <li>
                <Link className="text-gray-700" href="/blogs">
                  {t("blogs")}
                </Link>
              </li>
              <li>
                <Link className="text-gray-700" href="/chat">
                  {t("support")}
                </Link>
              </li>
              <li>
                <Link
                  className="text-gray-700"
                  href="https://yousofasadi.vercel.app/"
                >
                  {t("aboutMe")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex-none text-gray-700">
            <form className="" onSubmit={handleSearch}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  id="search_input"
                  name="search_input"
                  placeholder={t("searchPlaceholder")}
                  defaultValue={searchParams.get("search") || ""}
                />
                <button type="submit">
                  <IoSearchSharp />
                </button>
              </label>
            </form>
          </div>
          <div className="flex-none px-5">
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle"
              >
                <Link href="/cart">
                  <div className="indicator text-gray-700">
                    <TbShoppingCart className="size-6 " />
                  </div>
                </Link>
              </div>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle text-gray-700"
              >
                <Link href="/profile">
                  <div className="indicator text-gray-700">
                    <LuUserRound className="size-6" />
                  </div>
                </Link>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-full p-2 shadow"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
