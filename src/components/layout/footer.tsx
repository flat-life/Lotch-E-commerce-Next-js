import Link from "next/link";
import { FaHeart, FaTelegram, FaGithub } from "react-icons/fa";
import Image from "next/image";
const Footer = ({ siteSettings }: { siteSettings: any }) => {
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
          Copyright © {new Date().getFullYear()} - All right reserved
        </p>
        <p className="flex items-center gap-1 text-gray-500">
          <span className="text-amber-600 font-semibold">Made </span> with{" "}
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
          <Link href={`${siteSettings?.telegram_link}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current"
            >
              <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
            </svg>
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
        <div className=" w-full flex text-xxs items-center gap-10 pl-9">
          <p className="m-0">Information</p>
          <p className="m-0">Contact Us</p>
          <p className="m-0">Terms of Use</p>
          <p className="m-0">Cookie Policy</p>
          <p className="m-0">Privacy Policy</p>
        </div>
        <div className=" w-full flex text-xxxs items-center gap-10 pl-2 font-bold">
          <p className="m-0">© 2025 FLATLIFE DEV., LTD.</p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
