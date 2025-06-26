// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
// import { useUser } from '@clerk/nextjs'; // ✅ Clerk hook

// type Blog = {
//   id: number;
//   title: string;
//   content: string;
//   created_at: string;
//   image_url?: string;
// };

// type Comment = {
//   id : number;
//   content : string;
//   user_id : string;
//   created_at : string;
// }

// export default function BlogDetail() {
//   const params = useParams(); // ye url se id get krta hai like 1,2,3,4
//   const id = params?.id as string; // ye usko num se strung krta hai
//   const { user } = useUser(); // ✅ ye check krt hai kya user clerk ka hai
//   const [comments, setComments] = useState<Comment[]>([])
//   const [newComment , setNewComment] = useState('')

//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [liked, setLiked] = useState(false); // abhi false hai mtlb like nhi kya initially false hai

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/posts/${id}`);
//         if (!res.ok) throw new Error('Blog not found');
//         const data = await res.json();
//         setBlog(data);

//         if (user) {
//           const likeRes = await fetch(`http://localhost:5000/api/posts/${id}/is-liked?user_id=${user.id}`);
//           const likeData = await likeRes.json();
//           setLiked(likeData.liked);
//         }

//         const CommentRes = await fetch(`http://localhost:5000/api/posts/${id}/comments`)
//         const CommentData = await CommentRes.json()
//         setComments(CommentData)

//       } catch (error: any) {
//         console.error('Error fetching blog:', error);
//         setError(error.message);
//       }
//     };

//     fetchBlog();
//   }, [id, user]);

//   const handleLike = async () => {
//     if (!user) {
//       alert("Please login to like this blog.");
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_id: user.id }),
//       });

//       const data = await res.json();
//       setLiked(data.liked); // Toggle state from backend
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     }
//   };

//   //comment handled
//   // Handle comment submit
//   const handleCommentSubmit = async () => {
//     if (!user) {
//       alert("Please login to comment.");
//       return;
//     }

//     if (!newComment.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: user.id,
//           content: newComment.trim(),
//         }),
//       });

//       if (res.ok) {
//         setNewComment('');
//         const updated = await fetch(`http://localhost:5000/api/posts/${id}/comments`);
//         const updatedComments = await updated.json();
//         setComments(updatedComments);
//       }
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   if (error) {
//     return (
//       <div className="p-6 text-center text-[#8FD14F] bg-[#F5F5F5]">
//         🚫 {error}
//       </div>
//     );
//   }

//   if (!blog) {
//     return (
//       <div className="p-6 text-center text-gray-600 bg-[#F5F5F5]">
//         Loading blog details...
//       </div>
//     );
//   }

//   return (
//   <div className="p-6 my-[70px] max-w-3xl mx-auto bg-[#F5F5F5] rounded-md shadow-md">
//     {/* 🖼️ Image */}
//     {blog.image_url && (
//       <img
//         src={blog.image_url}
//         alt={blog.title}
//         className="w-full h-auto rounded-md mb-4"
//       />
//     )}

//     {/* 📅 Date */}
//     <p className="text-sm text-gray-600 mb-2">
//       Posted on: {new Date(blog.created_at).toLocaleString()}
//     </p>

//     {/* 📝 Title & Content */}
//     <h1 className="text-3xl font-bold text-[#8FD14F] mb-4">{blog.title}</h1>
//     <p className="text-gray-800 leading-relaxed">{blog.content}</p>

//     {/* 👍 Like Button */}
//     <div className="mt-6 flex items-center gap-2">
//       <button
//         onClick={handleLike}
//         className="text-black text-2xl hover:scale-110 transition"
//       >
//         {liked ? <AiFillLike /> : <AiOutlineLike />}
//       </button>
//       <span className="text-gray-600 text-sm">
//         {liked ? 'Unlike' : 'Like'}
//       </span>
//     </div>

//     {/* 💬 Comments Section */}
//     <div className="mt-12">
//       <h2 className="text-2xl font-bold text-[#8FD14F] mb-6">💬 Comments</h2>

//       {/* Add Comment */}
//       {user ? (
//         <div className="mb-10">
//           <div className="flex gap-4 items-start">
//             <div className="bg-[#8FD14F] text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
//               {user.firstName?.charAt(0) || 'U'}
//             </div>
//             <div className="flex-1">
//               <textarea
//                 className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FD14F]"
//                 rows={3}
//                 value={newComment}
//                 onChange={(e) => setNewComment(e.target.value)}
//                 placeholder="Write your comment..."
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={handleCommentSubmit}
//                   className="bg-[#8FD14F] text-white px-6 py-2 rounded-md hover:bg-[#76b53c] transition"
//                 >
//                   Post
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ) : (
//         <p className="text-gray-500 mb-8 italic">
//           Please login to post a comment.
//         </p>
//       )}

//       {/* Show Comments */}
//       {comments.length === 0 ? (
//         <p className="text-gray-500">No comments yet. Be the first!</p>
//       ) : (
//         <div className="space-y-6">
//           {comments.map((comment) => (
//             <div
//               key={comment.id}
//               className="flex items-start gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200"
//             >
//               <div className="bg-[#8FD14F] text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
//                 {comment.user_id.slice(0, 2).toUpperCase()}
//               </div>
//               <div className="flex-1">
//                 <p className="text-gray-800">{comment.content}</p>
//                 <p className="text-xs text-gray-400 mt-1">
//                   Posted on {new Date(comment.created_at).toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   </div>
// )}

// -----------------------------------

// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { AiFillLike, AiOutlineLike } from 'react-icons/ai';
// import { useUser } from '@clerk/nextjs';
// import CommentCard from '@/app/components/CommentsCard';
// import { currentUser } from '@clerk/nextjs/server';

// type Blog = {
//   id: number;
//   title: string;
//   content: string;
//   created_at: string;
//   image_url?: string;
// };

// type Comment = {
//   id: number;
//   content: string;
//   user_id: string;
//   created_at: string;
//   user_name:string;
//   replies?: Comment[];
// };

// export default function BlogDetail() {
//   const params = useParams();
//   const id = params?.id as string;
//   const { user } = useUser();

//   const [blog, setBlog] = useState<Blog | null>(null);
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState('');
//   const [error, setError] = useState<string | null>(null);
//   const [liked, setLiked] = useState(false);

//   useEffect(() => {
//     const fetchBlog = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/posts/${id}`);
//         if (!res.ok) throw new Error('Blog not found');
//         const data = await res.json();
//         setBlog(data);

//         if (user) {
//           const likeRes = await fetch(`http://localhost:5000/api/posts/${id}/is-liked?user_id=${user.id}`);
//           const likeData = await likeRes.json();
//           setLiked(likeData.liked);
//         }

//         const commentRes = await fetch(`http://localhost:5000/api/posts/${id}/comments`);
//         const commentData = await commentRes.json();
//         setComments(commentData);
//       } catch (error: any) {
//         setError(error.message);
//       }
//     };

//     fetchBlog();
//   }, [id, user]);

//   const handleLike = async () => {
//     if (!user) {
//       alert('Please login to like this blog.');
//       return;
//     }

//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user_id: user.id }),
//       });

//       const data = await res.json();
//       setLiked(data.liked);
//     } catch (error) {
//       console.error('Error liking blog:', error);
//     }
//   };

//   const handleCommentSubmit = async () => {
//     if (!user) {
//       alert('Please login to comment.');
//       return;
//     }

//     if (!newComment.trim()) return;

//     try {
//       const res = await fetch(`http://localhost:5000/api/posts/${id}/comments`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           user_id: user.id,
//           image_url: user.imageUrl,  // 👈 add this line
//           user_name:user.fullName,
//           content: newComment.trim(),
//         }),
//       });

//       if (res.ok) {
//         setNewComment('');
//         const updated = await fetch(`http://localhost:5000/api/posts/${id}/comments`);
//         const updatedComments = await updated.json();
//         setComments(updatedComments);
//       }
//     } catch (error) {
//       console.error('Error posting comment:', error);
//     }
//   };

//   const handleCommentDeleted = (deletedId: number) => { //🏮🏮🏮🏮✂✂✂
//     setComments((prev) => prev.filter((c) => c.id !== deletedId));
//   };

//   if (error) {
//     return <div className="p-6 text-center text-[#8FD14F] bg-[#F5F5F5]">🚫 {error}</div>;
//   }

//   if (!blog) {
//     return <div className="p-6 text-center text-gray-600 bg-[#F5F5F5]">Loading blog details...</div>;
//   }

//   return (
//     <div className="p-6 my-[70px] max-w-full mx-auto bg-[#F5F5F5] rounded-md shadow-md">
//       {blog.image_url && (
//         <img src={blog.image_url} alt={blog.title} className="w-full h-auto rounded-md mb-4" />
//       )}
//       <p className="text-sm text-gray-600 mb-2">Posted on: {new Date(blog.created_at).toLocaleString()}</p>
//       <h1 className="text-3xl font-bold text-[#8FD14F] mb-4">{blog.title}</h1>
//       <p className="text-gray-800 leading-relaxed">{blog.content}</p>

//       <div className="mt-6 flex items-center gap-2">
//         <button onClick={handleLike} className="text-black text-2xl hover:scale-110 transition">
//           {liked ? <AiFillLike /> : <AiOutlineLike />}
//         </button>
//         <span className="text-gray-600 text-sm">{liked ? 'Unlike' : 'Like'}</span>
//       </div>

//       <div className="mt-12">
//         <h2 className="text-2xl font-semibold text-black mb-6">Comments - 162</h2>

//         {user ? (
//           <div className="mb-8">
//             <div className="flex gap-4 items-start">
//               <div className="bg-[#8FD14F] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg">
//                 {user.firstName?.charAt(0).toUpperCase() || 'U'}
//               </div>
//               <div className="flex-1">
//                 <textarea
//                   className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FD14F]"
//                   rows={3}
//                   value={newComment}
//                   onChange={(e) => setNewComment(e.target.value)}
//                   placeholder="Write a comment..."
//                 />
//                 <div className="flex justify-end mt-2">
//                   <button
//                     onClick={handleCommentSubmit}
//                     className="bg-[#8FD14F] text-white px-5 py-2 rounded hover:bg-[#76b53c] transition"
//                   >
//                     Post
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p className="text-gray-500 mb-4">Please login to post a comment.</p>
//         )}

//         {comments.length === 0 ? (
//           <p className="text-gray-500">No comments yet.</p>
//         ) : (
//           <div className="space-y-6">
//             {comments.map((comment) => (
//               <CommentCard
//                 key={comment.id}
//                 comment={comment}
//                 postId={id}
//                 currentUser={user}
//                 // onCommentDeleted={handleCommentDeleted}
//                 onCommentDeleted={(deletedId) => {
//     setComments((prev) => prev.filter((c) => c.id !== deletedId));
//   }}
//               />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { useUser } from "@clerk/nextjs";
import CommentCard from "@/app/components/CommentsCard";
import Image from "next/image";

type Blog = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  image_url?: string;
  user_name?: string; // ✅ Added
  user_image?: string; // ✅ Added
};

type Comment = {
  id: number;
  content: string;
  user_id: string;
  created_at: string;
  user_name: string;
  replies?: Comment[];
};

export default function BlogDetail() {
  const params = useParams();
  const id = params?.id as string;
  const { user } = useUser();

  const [blog, setBlog] = useState<Blog | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState<number>(0);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        if (!res.ok) throw new Error("Blog not found");
        const data = await res.json();
        setBlog(data);

        if (user) {
          const likeRes = await fetch(
            `http://localhost:5000/api/posts/${id}/is-liked?user_id=${user.id}`
          );
          const likeData = await likeRes.json();
          setLiked(likeData.liked);
        }
        const countRes = await fetch(
          `http://localhost:5000/api/posts/${id}/likes-count`
        );
        const countData = await countRes.json();
        setLikesCount(countData.count);

        const commentRes = await fetch(
          `http://localhost:5000/api/posts/${id}/comments`
        );
        const commentData = await commentRes.json();
        setComments(commentData);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchBlog();
  }, [id, user]);

  const handleLike = async () => {
    if (!user) {
      alert("Please login to like this blog.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/posts/${id}/like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id: user.id }),
      });

      const data = await res.json();
      setLiked(data.liked);
      const updatedCountRes = await fetch(
        `http://localhost:5000/api/posts/${id}/likes-count`
      );
      const updatedCount = await updatedCountRes.json();
      setLikesCount(updatedCount.count);
    } catch (error) {
      console.error("Error liking blog:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!user) {
      alert("Please login to comment.");
      return;
    }

    if (!newComment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/posts/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            image_url: user.imageUrl,
            user_name: user.fullName,
            content: newComment.trim(),
          }),
        }
      );

      if (res.ok) {
        setNewComment("");
        const updated = await fetch(
          `http://localhost:5000/api/posts/${id}/comments`
        );
        const updatedComments = await updated.json();
        setComments(updatedComments);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const handleCommentDeleted = (deletedId: number) => {
    setComments((prev) => prev.filter((c) => c.id !== deletedId));
  };

  if (error) {
    return (
      <div className="p-6 text-center text-[#8FD14F] bg-[#F5F5F5]">
        🚫 {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="p-6 text-center text-gray-600 bg-[#F5F5F5]">
        Loading blog details...
      </div>
    );
  }

  return (
    <div className="p-6 my-[70px] max-w-full mx-auto bg-[#F5F5F5] rounded-md shadow-md">
      {blog.image_url && (
        <Image
          src={blog.image_url}
          alt={blog.title}
          width={800}
          height={500}
          className="w-full h-auto rounded-md mb-4"
        />
      )}

      {/* ✅ Avatar & Name */}
      <div className="flex items-center gap-3 mb-4">
        {blog.user_image ? (
          <Image
            src={blog.user_image}
            alt={blog.user_name || 'user'}
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-[#8FD14F] flex items-center justify-center text-white font-bold">
            {blog.user_name?.slice(0, 2).toUpperCase() || "??"}
          </div>
        )}
        <p className="text-sm text-gray-700">{blog.user_name || "Anonymous"}</p>
      </div>

      <p className="text-sm text-gray-600 mb-2">
        Posted on: {new Date(blog.created_at).toLocaleString()}
      </p>
      <h1 className="text-3xl font-bold text-[#8FD14F] mb-4">{blog.title}</h1>
      <p className="text-gray-800 leading-relaxed">{blog.content}</p>

      <div className="mt-6 flex items-center gap-3">
        <button onClick={handleLike} className="flex items-center gap-1 ">
          {liked ? (
            <AiFillLike className="text-2xl text-black" />
          ) : (
            <AiOutlineLike className="text-2xl" />
          )}
          <span className="text-sm font-medium">{likesCount}</span>
        </button>

        <span className="text-sm text-gray-600 opacity-50">
          {liked ? "You liked this" : "Like this post"}
        </span>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-black mb-6">
          Comments - {comments.length}
        </h2>

        {user ? (
          <div className="mb-8">
            <div className="flex gap-4 items-start">
              <div className="bg-green-950 text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold text-lg">
                {user.firstName?.charAt(0).toUpperCase() || "U"}
              </div>
              <div className="flex-1">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FD14F]"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <div className="flex justify-end mt-2">
                  <button
                    onClick={handleCommentSubmit}
                    className="bg-[#8FD14F] text-white px-5 py-2 rounded hover:bg-[#76b53c] transition"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mb-4">Please login to post a comment.</p>
        )}

        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          <div className="space-y-6">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                postId={id}
                currentUser={user}
                onCommentDeleted={handleCommentDeleted}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
