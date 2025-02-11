"use client";

import { SetStateAction, useState } from "react";
import apiClient from "@/services/apiClient";
import { Comment } from "@/lib/blog";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

export default function CommentsSection({
  blogId,
  initialComments,
}: {
  blogId: string;
  initialComments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [formData, setFormData] = useState({ subject: "", message: "" });

  const getToken = () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("JWT");
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiClient.post(
        `/blog/blogs/${blogId}/comments/`,
        formData,
        {
          headers: {
            Authorization: `JWT ${getToken()}`,
          },
        }
      );

      if (response.status === 201) {
        setComments([...comments, response.data]);
        setFormData({ subject: "", message: "" });
        alert(
          "Your comment has been received! It will be shown after checking"
        );
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
      alert("Error submitting comment. Please try again.");
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <section className="flex justify-center lg:px-64 md:px-40 sm:px-20 px-10 text-black">
      <div className="w-full">
        <div className="flex-col space-y-5 my-10">
          {comments.map((comment) => (
            <Comments comment={comment} />
          ))}
        </div>
        <CommentForm
          setFormData={setFormData}
          formData={formData}
          handleSubmit={handleSubmit}
        />
      </div>
    </section>
  );
}
