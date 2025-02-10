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
        <div className="">
          <div className="">
            <div className="flex justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black">
              {currentBlogs.map((blog) => (
                <article key={blog.id} className="bg-gray-200 p-16">
                  <div className="">
                    <div className="">
                      <ul className="">
                        <Link href={`/blogs/${blog.id}`}>
                          <h2 className="text-5xl font-bold">{blog.title}</h2>
                        </Link>
                        <div className="my-4 text-md">
                          <div className="flex gap-2">
                            <li className="flex gap-3 items-center">
                              <SlCalender />
                              {new Date(blog.updated_at).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}
                            </li>
                            <p>by</p>
                            <li className="capitalize text-neutral">
                              {blog.author.first_name} {blog.author.last_name}
                            </li>
                          </div>
                          <li className="flex gap-3 items-center">
                            <IoMdEye />
                            {blog.views} {t("views")}
                          </li>
                          <li className="flex gap-3 items-center">
                            <MdMessage />
                            {blog.comments_count} {t("comments")}
                          </li>
                        </div>
                      </ul>
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <div className="">
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="genric-btn primary"
                        >
                          <img
                            src={blog.thumbnail}
                            alt={blog.title}
                            className=""
                          />
                        </Link>
                      </div>
                      <div>
                        <p className="line-clamp-4 tracking-widest my-8">
                          {blog.body}
                        </p>
                      </div>
                      <div className="btn bg-black text-white rounded-none">
                        <Link
                          href={`/blogs/${blog.id}`}
                          className="genric-btn primary"
                        >
                          {t("view_more")}
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
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
        </div>
      </div>
    </section>
  );
}
