import Head from "next/head";
import BlogList from "@/components/blog/BlogList";
import apiClient from "@/services/apiClient";
import { Blog } from "@/lib/blog";
import Link from "next/link";

interface BlogsPageProps {
  blogs: Blog[];
}

export default async function BlogsPage() {
  // Make component async
  const blogs = await fetchAllBlogs();

  return (
    <>
      <section className="">
        <div className="flex-col justify-center items-center flex  lg:px-64 md:px-40 sm:px-20 px-10">
          <img src="/banner/ga-2100-banner-main.jpg" alt="" />
          <div className="bg-gray-200 w-full my-10 p-16 text-black">
            <div className="">
              <h1 className="font-bold text-3xl">{"EDIFICE"}</h1>
              <p className="font-light tracking-wider">
                The latest news, limited editions, new releases, and reviews
                from the world of men’s automotive-inspired EDIFICE watches on
                CASIOBLOG. Slim, stylish, equipped with sapphire crystal, and
                highly functional — these watches are the perfect choice for
                fans of a classic, conservative look.
              </p>
            </div>
          </div>
        </div>
      </section>

      <BlogList blogs={blogs} />
    </>
  );
}

async function fetchAllBlogs() {
  let blogs: Blog[] = [];
  let page = 1;
  let totalPages = 1;

  do {
    const response = await apiClient.get(`/blog/blogs/`, {
      params: { page },
    });
    blogs = [...blogs, ...response.data.results];
    totalPages = Math.ceil(response.data.count / response.data.per_page);
    page++;
  } while (page <= totalPages);

  return blogs;
}

// Optional: Add revalidation (ISR)
export const revalidate = 3600; // Revalidate every hour
