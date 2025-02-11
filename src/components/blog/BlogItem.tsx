import { Blog } from "@/lib/blog";
import Link from "next/link";
import { IoMdEye } from "react-icons/io";
import { MdMessage } from "react-icons/md";
import { SlCalender } from "react-icons/sl";

const BlogItem = ({ blog }: { blog: Blog }) => {
  return (
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
                  {new Date(blog.updated_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </li>
                <p>by</p>
                <li className="capitalize text-neutral">
                  {blog.author.first_name} {blog.author.last_name}
                </li>
              </div>
              <li className="flex gap-3 items-center">
                <IoMdEye />
                {blog.views} {"views"}
              </li>
              <li className="flex gap-3 items-center">
                <MdMessage />
                {blog.comments_count} {"comments"}
              </li>
            </div>
          </ul>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="">
            <Link href={`/blogs/${blog.id}`} className="genric-btn primary">
              <img src={blog.thumbnail} alt={blog.title} className="" />
            </Link>
          </div>
          <div>
            <p className="line-clamp-4 tracking-widest my-8">{blog.body}</p>
          </div>
          <div className="btn bg-black text-white rounded-none">
            <Link href={`/blogs/${blog.id}`} className="genric-btn primary">
              {"view_more"}
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
export default BlogItem;
