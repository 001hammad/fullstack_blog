'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { RxUpdate } from 'react-icons/rx';

// type Blog = {
//   id: number;
//   title: string;
//   content: string;
// };

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/posts/${id}`);
        const data = await res.json();
        setTitle(data.title);
        setContent(data.content);
        setImageUrl(data.image_url || '');
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app//api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content, image_url: imageUrl }),
      });

      if (res.ok) {
        alert('Blog updated successfully!');
        router.push('/admin/blogs');
      } else {
        alert('Update failed!');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-6 text-[#8FD14F]">✍️ Edit Blog</h1>
      
      <form
        onSubmit={handleUpdate}
        className="bg-[#F5F5F5] rounded shadow-md p-6"
      >
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded text-black"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          className="w-full p-3 mb-4 border border-gray-300 rounded h-40 text-black"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded text-black"
          placeholder="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />
        <button
  type="submit"
  className="bg-[#8FD14F] hover:bg-lime-500 text-black font-semibold px-5 py-2 rounded transition flex items-center gap-2"
>
  <RxUpdate className="text-lg" />
  Update Blog
</button>

      </form>
    </div>
  );
}
