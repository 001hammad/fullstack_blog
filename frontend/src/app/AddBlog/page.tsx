// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import {
//   FaArrowLeft,
//   FaArrowRight,
//   FaHeading,
//   FaFileAlt,
//   FaImage,
//   FaPenNib,
// } from 'react-icons/fa';
// import { useUser } from '@clerk/nextjs';
// import ImageUploader from '../components/ImageUploader';

// export default function AddBlog() {
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [imageUrl, setImageUrl] = useState('');
//   const [isSubmitted, setIsSubmitted] = useState(false);
//   const [imageFile, setImageFile] = useState<File | null>(null);

//   const router = useRouter();
//   const { user } = useUser();

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) setImageFile(file);
//   };

//   const uploadImage = async () => {
//     if (!imageFile) return '';

//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('upload_preset', 'your_preset'); // 🛠️ replace with your Cloudinary preset

//     const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
//       method: 'POST',
//       body: formData,
//     });

//     const data = await res.json();
//     return data.secure_url;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!user) return alert('Please login to upload a blog.');

//     setIsSubmitted(true);

//     let finalImageUrl = imageUrl;

//     // 📷 If file selected, upload it and use its URL
//     if (imageFile) {
//       finalImageUrl = await uploadImage();
//     }

//     const res = await fetch('http://localhost:5000/api/posts', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         title,
//         content,
//         image_url: finalImageUrl,
//         user_id: user.id,
//         user_name: user.fullName,
//         user_image: user.imageUrl,
//       }),
//     });

//     if (res.ok) {
//       setTitle('');
//       setContent('');
//       setImageUrl('');
//       setImageFile(null);
//       router.push('/blogs');
//     }
//   };

//   return (
//     <div className="w-full">
//       {/* Hero Section */}
//       <div
//         className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
//         style={{ backgroundImage: "url('/addblog.jpg')" }}
//       >
//         <div className="flex items-center gap-3">
//           <FaPenNib className="text-white text-4xl" />
//           <div>
//             <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Upload Blog</h1>
//             <div className="w-24 h-1 bg-[#8FD14F] rounded"></div>
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       <section className="bg-[#F5F5F5] py-20 px-6 sm:px-10">
//         <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Title */}
//             <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
//               <FaHeading className="text-gray-500 text-lg" />
//               <input
//                 type="text"
//                 placeholder="Blog Title"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//                 required
//                 className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
//               />
//             </div>

//             {/* Content */}
//             <div className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3">
//               <FaFileAlt className="text-gray-500 text-lg mt-1" />
//               <textarea
//                 placeholder="Blog Content"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 required
//                 rows={5}
//                 className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
//               />
//             </div>

//             {/* Image URL or Upload */}
//             <div className="space-y-3">
//               <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
//                 <FaImage className="text-gray-500 text-lg" />
//                 <input
//                   type="text"
//                   placeholder="Image URL (optional)"
//                   value={imageUrl}
//                   onChange={(e) => setImageUrl(e.target.value)}
//                   className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
//                 />
//               </div>
//               <p className="text-center text-sm text-gray-400">OR Upload Image from Device</p>
//               <ImageUploader />
// <input
//   type="text"
//   value={imageUrl}
//   onChange={(e) => setImageUrl(e.target.value)}
//   placeholder="Or paste image URL"
// />

//             </div>

//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-[#8FD14F] to-lime-400 text-black font-semibold py-2 rounded-md hover:shadow-md transition flex items-center justify-center gap-2 group"
//             >
//               <FaArrowRight className="text-sm group-hover:-translate-x-1 transition" />
//               {isSubmitted ? 'Uploading...' : 'Upload Blog'}
//               <FaArrowLeft className="text-sm group-hover:translate-x-1 transition" />
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }




'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeading,
  FaFileAlt,
  FaImage,
  FaPenNib,
} from 'react-icons/fa'
import { useUser } from '@clerk/nextjs'

// const CLOUDINARY_UPLOAD_PRESET = 'blog_upload'
// const CLOUDINARY_CLOUD_NAME = 'dvu8mor0x'


export default function AddBlog() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const router = useRouter()
  const { user } = useUser()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUrl('') // Clear manual URL if file is selected
    }
  }

  const uploadImageToCloudinary = async () => {
    if (!imageFile) return ''
    const formData = new FormData()
    formData.append('file', imageFile)
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!)

    const res = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
      method: 'POST',
      body: formData,
    })

    const data = await res.json()
    return data.secure_url
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return alert('Please login to upload a blog.')

    setIsSubmitting(true)

    let finalImageUrl = imageUrl
    if (imageFile) {
      finalImageUrl = await uploadImageToCloudinary()
    }

    const res = await fetch('https://blogbackend-production-8b57.up.railway.app/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        content,
        image_url: finalImageUrl,
        user_id: user.id,
        user_name: user.fullName,
        user_image: user.imageUrl,
      }),
    })

    if (res.ok) {
      setTitle('')
      setContent('')
      setImageUrl('')
      setImageFile(null)
      setIsSubmitting(false)
      router.push('/blogs')
    }
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
        style={{ backgroundImage: "url('/addblog.jpg')" }}
      >
        <div className="flex items-center gap-3">
          <FaPenNib className="text-white text-4xl" />
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Upload Blog</h1>
            <div className="w-24 h-1 bg-[#8FD14F] rounded"></div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="bg-[#F5F5F5] py-20 px-6 sm:px-10">
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
              <FaHeading className="text-gray-500 text-lg" />
              <input
                type="text"
                placeholder="Blog Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
              />
            </div>

            {/* Content */}
            <div className="flex items-start gap-3 border border-gray-300 rounded-md px-4 py-3">
              <FaFileAlt className="text-gray-500 text-lg mt-1" />
              <textarea
                placeholder="Blog Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
                rows={5}
                className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
              />
            </div>

            {/* Image URL or Upload */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
                <FaImage className="text-gray-500 text-lg" />
                <input
                  type="text"
                  placeholder="Paste Image URL (optional)"
                  value={imageUrl}
                  onChange={(e) => {
                    setImageUrl(e.target.value)
                    setImageFile(null) // Clear file if URL entered
                  }}
                  className="w-full bg-transparent outline-none text-sm text-black placeholder-gray-500"
                />
              </div>

              <div className="text-center text-sm text-gray-500 font-medium">OR</div>

              <div className="flex flex-col sm:flex-row items-center gap-3 border border-gray-300 rounded-md px-4 py-3">
                <FaImage className="text-gray-500 text-lg" />
                <input type="file" accept="image/*" onChange={handleFileChange} />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[#8FD14F] to-lime-400 text-black font-semibold py-2 rounded-md hover:shadow-md transition flex items-center justify-center gap-2 group"
            >
              <FaArrowRight className="text-sm group-hover:-translate-x-1 transition" />
              {isSubmitting ? 'Uploading...' : 'Upload Blog'}
              <FaArrowLeft className="text-sm group-hover:translate-x-1 transition" />
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}
