"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IoIosArrowDown } from "react-icons/io";
import { TbShoppingCart } from "react-icons/tb";
import { LuUserRound } from "react-icons/lu";
import { IoSearchSharp } from "react-icons/io5";
import { BiMenu } from "react-icons/bi";
import { FaGithub, FaHeart, FaTelegram } from "react-icons/fa";
import { VscWatch } from "react-icons/vsc";
import Header from "./Header";
import Footer from "./footer";

export default function ClientLayout({
  siteSettings,
  children,
}: {
  siteSettings: any;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const pathname = usePathname();

  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer siteSettings={siteSettings} />
    </div>
  );
}
