'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { FaLockOpen, FaRegEdit, FaTools } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import AdminCommentsSection from '@/app/components/AdminCommentsSection';
import AdminFeedBackPage from '@/app/components/AdminPageFeedback';
import AdminUsersPage from '@/app/components/user';

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
      const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/posts');
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
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/posts/${id}`, {
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

  if (!isLoaded) return <div className="flex justify-center items-center h-screen text-blue-700">Checking access...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{ backgroundImage: "url('/dashboard.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <div className="relative h-full flex items-center px-6 sm:px-20 z-10 container mx-auto">
          <div className="flex items-center gap-4">
            <FaLockOpen className="text-white text-4xl sm:text-5xl" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-3">Admin Dashboard</h1>
              <div className="w-24 h-1.5 bg-[#8FD14F] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Admin Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Manage Blogs Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex justify-center items-center gap-3 mb-8">
            <FaTools className="text-[#7acb3d] text-2xl" />
            <h2 className="text-3xl font-bold text-gray-800">Manage Blogs</h2>
          </div>

          {blogs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No blogs found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-[#7acb3d]">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {blog.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">
                        {blog.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex space-x-2">
                          <Link href={`/admin/edit/${blog.id}`}>
                            <button className="flex items-center justify-center p-2 rounded-md bg-[#7acb3d] hover:bg-[#69b132] text-white transition-colors duration-200">
                              <FaRegEdit className="text-lg" />
                            </button>
                          </Link>
                          <button
                            onClick={() => deleteBlog(blog.id)}
                            className="flex items-center justify-center p-2 rounded-md bg-red-600 hover:bg-red-700 text-white transition-colors duration-200"
                          >
                            <MdDeleteOutline className="text-lg" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <AdminCommentsSection />
        </div>
        <div>
          <AdminFeedBackPage />
        </div>
        <div>
          <AdminUsersPage/>
        </div>
      </div>
    </div>
  );
}