'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
};

export default function HeroBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setBlogs(data.slice(0, 3));
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <section className="bg-[#E8F9FF] py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mb-12">
        <p className="text-sm uppercase text-[#7acb3d] tracking-widest mb-2">Blog</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
          Insights & Analysis
        </h2>
        <p className="text-gray-600 text-sm max-w-2xl">
          Explore thought-provoking insights and developer analysis that keep you in sync with the evolving tech world.
        </p>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-gray-700">No blogs yet.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <Link href={`/blog/${blog.id}`} key={blog.id}>
              <div className="bg-white border border-[#7acb3d] rounded-lg shadow hover:shadow-lg transition duration-300 cursor-pointer">
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                )}
                <div className="p-5">
                  <p className="text-sm text-gray-600 mb-1">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </p>
                  <h3 className="text-lg font-semibold text-[#7acb3d] hover:underline mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-700 line-clamp-3">{blog.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
