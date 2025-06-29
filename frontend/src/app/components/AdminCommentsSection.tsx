'use client'

import { useEffect, useState } from 'react'
import { FaTools } from 'react-icons/fa'
import { MdDeleteOutline } from 'react-icons/md'

type Comment = {
  id: number
  blog_id: number
  user_name: string
  content: string
  created_at: string
}

export default function AdminCommentsSection() {
  const [comments, setComments] = useState<Comment[]>([])

  const fetchComments = async () => {
    try {
      const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/comments')
      const data = await res.json()
      setComments(data)
    } catch (error) {
      console.error('Failed to fetch comments:', error)
    }
  }

  const deleteComment = async (id: number) => {
    const confirmDelete = window.confirm('Delete this comment?')
    if (!confirmDelete) return

    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/comments/${id}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        fetchComments()
      } else {
        alert('Failed to delete comment.')
      }
    } catch (error) {
      console.error('Comment delete error:', error)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <div className="mt-20 p-6 max-w-full mx-auto rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-center items-center gap-3 mb-8">
                  <FaTools className="text-[#7acb3d] text-2xl" />
                  <h2 className="text-3xl font-bold text-gray-800">Manage Comments</h2>
                </div>

      {comments.length === 0 ? (
        <p className="text-gray-500">No comments yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-gray-200">
            <thead>
              <tr className="bg-[#7acb3d] text-white">
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Blog ID</th>
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Comment</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {comments.map((c) => (
                <tr key={c.id} className="border-t hover:bg-gray-100 text-black">
                  <td className="p-3">{c.id}</td>
                  <td className="p-3">{c.blog_id}</td>
                  <td className="p-3">{c.user_name}</td>
                  <td className="p-3 max-w-xs truncate">{c.content}</td>
                  <td className="p-3">{new Date(c.created_at).toLocaleString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => deleteComment(c.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      <MdDeleteOutline className="text-xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
