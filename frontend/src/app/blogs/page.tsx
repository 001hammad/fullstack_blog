"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaBook } from "react-icons/fa";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/posts");
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
        style={{ backgroundImage: "url('/blog.jpg')" }}
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Blog
          </h1>
          <div className="w-20 h-1 bg-[#8FD14F] rounded"></div>
        </div>
      </div>

      {/* Blog Listing Section */}
      <section className="bg-[#F9FAFB] py-16 px-6 sm:px-10 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl flex  font-bold text-[#111827] mb-12 text-left">
            <FaBook /> <p>Latest Blog Posts</p>
          </h2>

          {blogs.length === 0 ? (
            <p className="text-center text-gray-600">No blogs found.</p>
          ) : (
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog) => (
                <Link href={`/blog/${blog.id}`} key={blog.id}>
                  <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer">
                    {blog.image_url && (
                      <Image
                        src={blog.image_url}
                        alt={blog.title}
                        width={800}
                        height={208}
                        className="w-full object-cover"
                      />
                    )}
                    <div className="p-5">
                      <p className="text-sm text-gray-400 mb-2">
                        {new Date(blog.created_at).toLocaleDateString()}
                      </p>
                      <h2 className="text-xl font-semibold text-gray-800 hover:text-[#8FD14F] transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-gray-600 mt-3 line-clamp-3">
                        {blog.content}
                      </p>
                      <span className="inline-block mt-4 text-sm text-[#8FD14F] font-medium hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
