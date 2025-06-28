// 'use client';

// import { useState } from 'react';

// type CommentType = {
//   id: number;
//   content: string;
//   user_id?: string;
//   created_at: string;
//   image_url: string;
//   replies?: CommentType[];
// };

// type Props = {
//   comment: CommentType;
//   postId: string;
//   currentUser: any;
//   onCommentDeleted?: (id: number) => void;
// };

// export default function CommentCard({ comment, postId, currentUser, onCommentDeleted }: Props) {
//   const [showReply, setShowReply] = useState(false);
//   const [replyText, setReplyText] = useState('');
//   const [replies, setReplies] = useState<CommentType[]>(comment.replies || []);
//   const [isDeleting, setIsDeleting] = useState(false);

//  const handleReplySubmit = async () => {
//   if (!replyText.trim()) return;

//   try {
//     const res = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         user_id: currentUser.id,
//         content: replyText.trim(),
//         image_url: currentUser.imageUrl, // 👈 Clerk se user image
//         parent_id: comment.id,
//       }),
//     });

//     if (res.ok) {
//       const newReply = await res.json(); // ✅ backend se response le rahe hain
//       setReplies((prev) => [...prev, newReply]); // ✅ reply frontend par turant add hoga
//       setReplyText('');
//       setShowReply(false);
//     } else {
//       console.error("Reply failed: Invalid data");
//     }
//   } catch (error) {
//     console.error("Error submitting reply:", error);
//   }
// };


//   const handleDelete = async () => {
//     const confirm = window.confirm("Are you sure you want to delete this comment?");
//     if (!confirm) return;

//     setIsDeleting(true);
//     try {
//       const res = await fetch(`http://localhost:5000/api/comments/${comment.id}`, {
//         method: 'DELETE',
//       });

//       if (res.ok && onCommentDeleted) {
//         onCommentDeleted(comment.id);
//       }
//     } catch (err) {
//       console.error("Error deleting comment", err);
//     } finally {
//       setIsDeleting(false);
//     }
//   };

//   return (
//     <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
//       <div className="flex items-start gap-4">
//        {/* 🟢 Avatar */}
// {comment.image_url ? (
//   <img
//     src={comment.image_url}
//     alt="User Avatar"
//     className="w-10 h-10 rounded-full object-cover"
//   />
// ) : (
//   <div className="bg-[#8FD14F] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
//     {(comment.user_id || '??').slice(0, 2).toUpperCase()}
//   </div>
// )}


//         {/* 📄 Content */}
//         <div className="flex-1">
//           <p className="text-gray-800">{comment.content}</p>
//           <p className="text-xs text-gray-400 mt-1">
//             Posted on {new Date(comment.created_at).toLocaleString()}
//           </p>

//           {/* 🔁 Reply + 🗑️ Delete */}
//           {currentUser && (
//             <div className="flex items-center gap-3 mt-2">
//               <button
//                 onClick={() => setShowReply(!showReply)}
//                 className="text-sm text-blue-500"
//               >
//                 {showReply ? 'Cancel' : 'Reply'}
//               </button>

//               {comment.user_id === currentUser.id && (
//                 <button
//                   onClick={handleDelete}
//                   className="text-sm text-red-500"
//                   disabled={isDeleting}
//                 >
//                   {isDeleting ? 'Deleting...' : 'Delete'}
//                 </button>
//               )}
//             </div>
//           )}

//           {/* 💬 Reply Input */}
//           {showReply && (
//             <div className="mt-2">
//               <textarea
//                 className="w-full p-2 border rounded"
//                 rows={2}
//                 placeholder="Write a reply..."
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//               />
//               <div className="flex justify-end mt-2">
//                 <button
//                   onClick={handleReplySubmit}
//                   className="bg-[#8FD14F] text-white px-4 py-1 rounded hover:bg-[#76b53c]"
//                 >
//                   Post Reply
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* 🔁 Replies */}
//           {replies.length > 0 && (
//             <div className="mt-4 ml-6 space-y-4">
//               {replies.map((reply, index) => (
//                 <div key={reply.id  || `reply-${index}`} className="flex items-start gap-3">
//                   <div className="bg-gray-300 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">
//                     {(reply.user_id || '??').slice(0, 2).toUpperCase()}
//                   </div>
//                   <div>
//                     <p className="text-sm text-gray-700">{reply.content}</p>
//                     <p className="text-xs text-gray-400">
//                       {new Date(reply.created_at).toLocaleString()}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// ---------------------------------------------
// ---------------------------------------------------
// ------------------------------------------------





'use client';

import Image from 'next/image';
import { useState } from 'react';

type CommentType = {
  id: number;
  content: string;
  user_id?: string;
  user_name:string;
  created_at: string;
  image_url?: string;
  replies?: CommentType[];
};


type CurrentUser = {
  id: string;
  fullname: string;
  imageUrl: string;
};


type Props = {
  comment: CommentType;
  postId: string;
  currentUser: CurrentUser;
  onCommentDeleted?: (id: number) => void;
};

export default function CommentCard({ comment, postId, currentUser, onCommentDeleted }: Props) {
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState<CommentType[]>(comment.replies || []);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleReplySubmit = async () => {
    if (!replyText.trim()) return;

    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/posts/${postId}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          user_name:currentUser.fullname, //- --------------
          content: replyText.trim(),
          image_url: currentUser.imageUrl, // Clerk profile image
          parent_id: comment.id,
        }),
      });

      if (res.ok) {
        const newReply = await res.json();
        setReplies((prev) => [...prev, newReply]);
        setReplyText('');
        setShowReply(false);
      } else {
        console.error("Reply failed");
      }
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleDelete = async () => {
    const confirm = window.confirm("Are you sure you want to delete this comment?");
    if (!confirm) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`https://blogbackend-production-8b57.up.railway.app/api/comments/${comment.id}`, {
        method: 'DELETE',
      });

      if (res.ok && onCommentDeleted) {
        onCommentDeleted(comment.id);
      }
    } catch (err) {
      console.error("Error deleting comment", err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
  <div className="bg-white border border-gray-200 p-4 rounded-lg shadow-sm">
    <div className="flex items-start gap-4">
      {/* 🟢 Avatar */}
      {comment.image_url ? (
        <Image
  src={comment.image_url}
  alt="User Avatar"
  width={40}
  height={40}
  className="rounded-full object-cover"
/>
      ) : (
        <div className="bg-[#8FD14F] text-white w-10 h-10 rounded-full flex items-center justify-center font-semibold">
          {(comment.user_id || '??').slice(0, 2).toUpperCase()}
        </div>
      )}

      {/* 📄 Content */}
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-800">
            {comment.user_name || comment.user_id || 'Anonymous'}
          </p>
          <p className="text-xs text-gray-400">
            • {new Date(comment.created_at).toLocaleString()}
          </p>
        </div>

        <p className="text-gray-800 mt-1">{comment.content}</p>

        {/* 🔁 Reply + 🗑️ Delete */}
        {currentUser && (
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => setShowReply(!showReply)}
              className="text-sm text-blue-500"
            >
              {showReply ? 'Cancel' : 'Reply'}
            </button>

            {comment.user_id === currentUser.id && (
              <button
                onClick={handleDelete}
                className="text-sm text-red-500"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Delete'}
              </button>
            )}
          </div>
        )}

        {/* 💬 Reply Input */}
        {showReply && (
          <div className="mt-2">
            <textarea
              className="w-full p-2 border rounded"
              rows={2}
              placeholder="Write a reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <div className="flex justify-end mt-2">
              <button
                onClick={handleReplySubmit}
                className="bg-[#8FD14F] text-white px-4 py-1 rounded hover:bg-[#76b53c]"
              >
                Post Reply
              </button>
            </div>
          </div>
        )}

        {/* 🔁 Replies */}
        {replies.length > 0 && (
          <div className="mt-4 ml-6 space-y-4">
            {replies.map((reply, index) => (
              <div key={reply.id || `reply-${index}`} className="flex items-start gap-3">
                {reply.image_url ? (
                  <Image
                    src={reply.image_url}
                    alt="Reply Avatar"
                    className="w-8 h-8 rounded-full object-cover"
                    width={32} height={32}
                  />
                ) : (
                  <div className="bg-gray-300 text-white w-8 h-8 rounded-full flex items-center justify-center text-xs">
                    {(reply.user_id || '??').slice(0, 2).toUpperCase()}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs font-semibold text-gray-800">
                      {reply.user_name || reply.user_id || 'Anonymous'}
                    </p>
                    <p className="text-xs text-gray-400">
                      • {new Date(reply.created_at).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
}