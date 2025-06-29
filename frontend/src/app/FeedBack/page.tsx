// 'use client'

// import { useEffect, useState } from 'react'
// import { FaUser, FaCommentDots, FaRegEdit } from 'react-icons/fa'
// import BackButton from '../components/BackButton'
// import { IoIosPaperPlane } from 'react-icons/io'

// type FeedbackType = {
//   id: number
//   user_name: string
//   content: string
//   created_at: string
// }

// export default function FeedbackPage() {
//   const [formData, setFormData] = useState({ user_name: '', content: '' })
//   const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
//   const [editingId, setEditingId] = useState<number | null>(null)
//   const [editContent, setEditContent] = useState<string>('')

//   useEffect(() => {
//     const savedName = localStorage.getItem('feedback_user_name')
//     if (savedName) {
//       setFormData((prev) => ({ ...prev, user_name: savedName }))
//     }
//     fetchFeedbacks()
//   }, [])

//   const fetchFeedbacks = async () => {
//     const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/feedback')
//     const data = await res.json()
//     setFeedbacks(data)
//   }

//   const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value })
//   }

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault()
//     localStorage.setItem('feedback_user_name', formData.user_name)

//     const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/feedback', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(formData),
//     })

//     if (res.ok) {
//       setFormData((prev) => ({ ...prev, content: '' }))
//       fetchFeedbacks()
//     }
//   }

//   const handleEdit = (id: number, content: string) => {
//     setEditingId(id)
//     setEditContent(content)
//   }

//   const handleUpdate = async () => {
//     const feedbackToEdit = feedbacks.find((fb) => fb.id === editingId)
//     const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/feedback/${editingId}`, {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         user_name: feedbackToEdit?.user_name,
//         content: editContent,
//       }),
//     })

//     if (res.ok) {
//       setEditingId(null)
//       setEditContent('')
//       fetchFeedbacks()
//     }
//   }

//   return (
//   <div className="">
//     {/* ✅ Hero Banner (Full Width Image) */}
//     <div
//       className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
//       style={{ backgroundImage: "url('/review.jpg')" }}
//     >
//       <div>
//         <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
//           Your - FeedBack
//         </h1>
//         <div className="w-20 h-1 bg-[#8FD14F] rounded mt-2"></div>
//         <p><BackButton /></p>
//       </div>
//     </div>

//     {/* ✅ Main Section - Form & Feedback */}
//     <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200"
//       >
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <FaUser className="inline mr-2 text-[#B22222]" />
//             Your Name
//           </label>
//           <input
//             type="text"
//             name="user_name"
//             value={formData.user_name}
//             onChange={handleChange}
//             required
//             className="block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             <FaCommentDots className="inline mr-2 text-[#B22222]" />
//             Your Feedback
//           </label>
//           <textarea
//             name="content"
//             rows={4}
//             value={formData.content}
//             onChange={handleChange}
//             required
//             className="block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
//           />
//         </div>

//        <button
//   type="submit"
//   className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8FD14F] to-lime-400 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-lime-200/50 transition-all duration-300 group"
// >
//   <IoIosPaperPlane className="text-lg group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
//   Submit Feedback
// </button>
//       </form>

//       {/* Feedback List */}
//       <div className="mt-14 mb-12 space-y-6">
//         {feedbacks.map((fb) => (
//           <div
//             key={fb.id}
//             className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <div>
//                 <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
//                   <FaUser className="text-[#B22222]" /> {fb.user_name}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   {new Date(fb.created_at).toLocaleString()}
//                 </p>
//               </div>

//               {formData.user_name === fb.user_name && editingId !== fb.id && (
//                 <button
//                   onClick={() => handleEdit(fb.id, fb.content)}
//                   className="text-[#B22222] hover:text-red-800 text-sm font-medium flex items-center gap-1"
//                 >
//                   <FaRegEdit /> Edit
//                 </button>
//               )}
//             </div>

//             {editingId === fb.id ? (
//               <div className="mt-3">
//                 <textarea
//                   value={editContent}
//                   onChange={(e) => setEditContent(e.target.value)}
//                   rows={3}
//                   className="w-full p-3 border border-gray-300 rounded-lg"
//                 />
//                 <button
//                   onClick={handleUpdate}
//                   className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
//                 >
//                   Save
//                 </button>
//               </div>
//             ) : (
//               <p className="mt-3 text-gray-700">{fb.content}</p>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   </div>
// );}

'use client'

import { useEffect, useState } from 'react'
import { FaUser, FaCommentDots, FaRegEdit } from 'react-icons/fa'
import { IoIosPaperPlane } from 'react-icons/io'
import BackButton from '../components/BackButton'
import { useUser } from '@clerk/nextjs'

type FeedbackType = {
  id: number
  user_name: string
  user_id: string
  content: string
  created_at: string
}

export default function FeedbackPage() {
  const { user, isSignedIn } = useUser()

  const [formData, setFormData] = useState({
    user_name: '',
    user_id: '',
    content: ''
  })

  const [feedbacks, setFeedbacks] = useState<FeedbackType[]>([])
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState<string>('')

  useEffect(() => {
    if (user && isSignedIn) {
      setFormData((prev) => ({
        ...prev,
        user_name: user.fullName || '',
        user_id: user.id,
      }))
    }
  }, [user, isSignedIn])

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/feedback')
    const data = await res.json()
    setFeedbacks(data)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (res.ok) {
      setFormData((prev) => ({ ...prev, content: '' }))
      fetchFeedbacks()
    }
  }

  const handleEdit = (id: number, content: string) => {
    setEditingId(id)
    setEditContent(content)
  }

  const handleUpdate = async () => {
    const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/feedback/${editingId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: formData.user_id,
        content: editContent,
      }),
    })

    if (res.ok) {
      setEditingId(null)
      setEditContent('')
      fetchFeedbacks()
    }
  }

  return (
    <div>
      {/* ✅ Hero Banner */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
        style={{ backgroundImage: "url('/review.jpg')" }}
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">
            Your - FeedBack
          </h1>
          <div className="w-20 h-1 bg-[#8FD14F] rounded mt-2"></div>
          <p><BackButton /></p>
        </div>
      </div>

      {/* ✅ Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-6 border border-gray-200"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaUser className="inline mr-2 text-[#B22222]" />
              Your Name
            </label>
            <input
              type="text"
              name="user_name"
              value={formData.user_name}
              onChange={handleChange}
              disabled
              className="block w-full rounded-xl border border-gray-300 px-4 py-2 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <FaCommentDots className="inline mr-2 text-[#B22222]" />
              Your Feedback
            </label>
            <textarea
              name="content"
              rows={4}
              value={formData.content}
              onChange={handleChange}
              required
              className="block w-full rounded-xl border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#B22222]"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#8FD14F] to-lime-400 text-white font-bold py-3 rounded-xl hover:shadow-lg hover:shadow-lime-200/50 transition-all duration-300 group"
          >
            <IoIosPaperPlane className="text-lg group-hover:rotate-45 group-hover:scale-110 transition-transform duration-300" />
            Submit Feedback
          </button>
        </form>

        {/* ✅ Feedback List */}
        <div className="mt-14 mb-12 space-y-6">
          {feedbacks.map((fb) => (
            <div
              key={fb.id}
              className="bg-white p-6 rounded-xl border border-gray-200 shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center mb-2">
                <div>
                  <p className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <FaUser className="text-[#B22222]" /> {fb.user_name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(fb.created_at).toLocaleString()}
                  </p>
                </div>

                {formData.user_id === fb.user_id && editingId !== fb.id && (
                  <button
                    onClick={() => handleEdit(fb.id, fb.content)}
                    className="text-[#B22222] hover:text-red-800 text-sm font-medium flex items-center gap-1"
                  >
                    <FaRegEdit /> Edit
                  </button>
                )}
              </div>

              {editingId === fb.id ? (
                <div className="mt-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full p-3 border border-gray-300 rounded-lg"
                  />
                  <button
                    onClick={handleUpdate}
                    className="mt-2 bg-green-600 text-white px-4 py-1 rounded-lg hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p className="mt-3 text-gray-700">{fb.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
