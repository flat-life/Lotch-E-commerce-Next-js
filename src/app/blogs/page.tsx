import Head from 'next/head';
import BlogList from '@/components/blog/BlogList';
import apiClient from '@/services/apiClient';
import { Blog } from '@/lib/blog';
import Link from 'next/link';

interface BlogsPageProps {
  blogs: Blog[];
}

export default async function BlogsPage() { // Make component async
  const blogs = await fetchAllBlogs();

  return (
    <>
      <section className="banner-area organic-breadcrumb">
        <div className="container">
          <div className="breadcrumb-banner d-flex flex-wrap align-items-center justify-content-end">
            <div className="col-first">
              <h1>{('blogs')}</h1>
              <nav className="d-flex align-items-center">
                <Link href="/">{('home')}</Link>
                <span className="lnr lnr-arrow-right" />
                <Link href="/blogs">{('blog')}</Link>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <BlogList blogs={blogs} />
    </>
  );
}

// Fetch data directly in component
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
