"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import Link from "next/link";
import type { Blog } from "@/lib/blog";
import Pagination from "../base/Pagination";
import { SlCalender } from "react-icons/sl";
import { IoMdEye } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import BlogItem from "./BlogItem";

interface BlogListProps {
  blogs: Blog[];
}

export default function BlogList({ blogs }: BlogListProps) {
  console.log({ blogs });
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="" dir="ltr">
      <div className="">
        <div className="flex justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black">
          {currentBlogs.map((blog) => (
            <BlogItem key={blog.id} blog={blog} />
          ))}
        </div>
      </div>

      <div className="filter-bar d-flex flex-wrap align-items-center">
        <Pagination
          currentPage={currentPage}
          totalItems={blogs.length}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
