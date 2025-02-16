import Head from "next/head";
import BlogList from "@/components/blog/BlogList";
import apiClient from "@/services/apiClient";
import { Blog } from "@/lib/blog";
import Link from "next/link";
import BlogBanner from "@/components/blog/BlogBanner";

interface BlogsPageProps {
  blogs: Blog[];
}

export default async function BlogsPage() {
  // Make component async
  const blogs = await fetchAllBlogs();

  return (
    <>
      <BlogBanner />
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
