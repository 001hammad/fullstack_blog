'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@clerk/nextjs';
import { FaTools, FaUser, FaRegEdit } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';

type FeedbackType = {
  id: number;
  user_name: string;
  content: string;
  created_at: string;
};

export default function AdminFeedBackPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>('');
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

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/feedback');
      const data = await res.json();
      setFeedbacks(data);
    } catch (error) {
      console.error('Failed to fetch feedbacks:', error);
    }
  };

  const deleteFeedback = async (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this feedback?');
    if (!confirmDelete) return;

    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/feedback/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchFeedbacks();
      } else {
        alert('Failed to delete feedback.');
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleEdit = (id: number, content: string) => {
    setEditingId(id);
    setEditContent(content);
  };

  const handleUpdate = async () => {
    if (!editingId) return;

    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/feedback/${editingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: editContent,
        }),
      });

      if (res.ok) {
        setEditingId(null);
        setEditContent('');
        fetchFeedbacks();
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  useEffect(() => {
    if (isSignedIn) {
      fetchFeedbacks();
    }
  }, [isSignedIn]);

  if (!isLoaded) return <div className="flex justify-center items-center h-screen text-blue-700">Checking access...</div>;
  if (!isSignedIn) return null;

  return (
    <div className="w-full mt-[40px] bg-gray-50">
      {/* Admin Content Section */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Manage Feedbacks Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex justify-center items-center gap-3 mb-8">
            <FaTools className="text-[#7acb3d] text-2xl" />
            <h2 className="text-3xl font-bold text-gray-800">Manage Feedbacks</h2>
          </div>

          {feedbacks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No feedbacks found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {feedbacks.map((feedback) => (
                <div key={feedback.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <FaUser className="text-[#7acb3d] text-xl" />
                      <div>
                        <h3 className="font-medium text-gray-900">{feedback.user_name}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(feedback.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(feedback.id, feedback.content)}
                        className="text-gray-600 hover:text-[#7acb3d] p-2 rounded-full hover:bg-gray-100 transition"
                        title="Edit"
                      >
                        <FaRegEdit className="text-lg cursor-progress" />
                      </button>
                      <button
                        onClick={() => deleteFeedback(feedback.id)}
                        className="text-gray-600 hover:text-red-600 p-2 rounded-full hover:bg-gray-100 transition"
                        title="Delete"
                      >
                        <MdDeleteOutline className="text-lg cursor-progress" />
                      </button>
                    </div>
                  </div>

                  {editingId === feedback.id ? (
                    <div className="mt-4">
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#7acb3d] focus:border-transparent"
                      />
                      <div className="flex justify-end gap-3 mt-3">
                        <button
                          onClick={() => setEditingId(null)}
                          className="px-4 py-2 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleUpdate}
                          className="px-4 py-2 bg-[#7acb3d] text-white rounded-lg hover:bg-[#69b132] transition"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-700 mt-3">{feedback.content}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}