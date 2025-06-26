'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { FaLockOpen, FaRegEdit, FaTools } from 'react-icons/fa'; // <-- ✅ FaTools imported here
import { MdDeleteOutline } from 'react-icons/md';
import AdminCommentsSection from '@/app/components/AdminCommentsSection';

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    if (!isLoaded) return;

    const adminEmail = 'blogify082@gmail.com';

    if (!isSignedIn) {
      router.push('/sign-in');
    } else if (user?.primaryEmailAddress?.emailAddress !== adminEmail) {
      alert('Access Denied. Admin only!');
      router.push('/');
    }
  }, [isLoaded, isSignedIn, user, router]);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
  };

  const deleteBlog = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchBlogs();
      } else {
        alert('Failed to delete blog.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchBlogs();
    }
  }, [isSignedIn]);

  if (!isLoaded) return <div className="p-6 text-blue-700">Checking access...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-fixed bg-center flex items-center px-10 sm:px-20"
        style={{ backgroundImage: "url('/dashboard.jpg')" }}
      >
        <div className="flex items-center gap-3">
          <FaLockOpen className=" text-gray-900 text-4xl sm:text-5xl" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Admin Dashboard</h1>
            <div className="w-24 h-1 bg-[#8FD14F] rounded"></div>
          </div>
        </div>
      </div>

      {/* Admin Blog Table Section */}
      <div className="p-6 max-w-6xl min-h-screen  mx-auto rounded-lg shadow-lg mt-10">
        {/* 👇 Added FaTools icon with heading */}
        <div className="flex justify-center items-center gap-2 mb-8">
          <FaTools className="text-[#7acb3d] text-2xl" />
          <h2 className="text-3xl font-bold text-[#7acb3d]">Manage Blogs</h2>
        </div>

        {blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="overflow-x-auto rounded-lg">
            <table className="w-full border border-gray-200 text-sm">
              <thead>
                <tr className="bg-[#7acb3d] text-white text-left">
                  <th className="p-3">ID</th>
                  <th className="p-3">Title</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-gray-200 hover:bg-green-700 duration-300">
                    <td className="p-3 text-white">{blog.id}</td>
                    <td className="p-3 text-white">{blog.title}</td>
                    <td className="p-3 space-x-3">
                      <Link href={`/admin/edit/${blog.id}`}>
                        <button className="bg-[#7acb3d] hover:bg-[#69b132] text-white px-4 py-1 rounded transition">
                          <FaRegEdit className='text-2xl' />
                        </button>
                      </Link>
                      <button
                        onClick={() => deleteBlog(blog.id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
                      >
                        <MdDeleteOutline className='text-2xl' />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <AdminCommentsSection/>
      </div>
    </div>
  );
}
