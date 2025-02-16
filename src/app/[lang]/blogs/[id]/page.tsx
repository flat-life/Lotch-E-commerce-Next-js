import { notFound } from "next/navigation";
import BannerArea from "@/components/base/Banner";
import CommentsSection from "@/components/blog/CommentSectoins";
import apiClient from "@/services/apiClient";
import BlogContent from "@/components/blog/BlogContent";
import BlogBanner from "@/components/blog/BlogBanner";

export async function generateStaticParams() {
  const fetchAllBlogIds = async () => {
    const response = await apiClient.get("/blog/blogs/");
    return response.data.results.map((blog: { id: string }) => ({
      id: blog.id.toString(),
    }));
  };

  try {
    return await fetchAllBlogIds();
  } catch (error) {
    console.error("Error generating static paths:", error);
    return [];
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const fetchBlogDetails = async () => {
    const response = await apiClient.get(`/blog/blogs/${id}/`);
    return response.data;
  };

  const fetchBlogComments = async () => {
    const response = await apiClient.get(`/blog/blogs/${id}/comments/`);
    return response.data;
  };

  try {
    const [blogDetails, comments] = await Promise.all([
      fetchBlogDetails(),
      fetchBlogComments(),
    ]);

    if (!blogDetails) return notFound();

    return (
      <>
        <BlogBanner />
        <div className="flex justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black">
          <BlogContent blog={blogDetails} />
        </div>
        <CommentsSection blogId={id} initialComments={comments} />
      </>
    );
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return notFound();
  }
}

export const revalidate = 3600;
