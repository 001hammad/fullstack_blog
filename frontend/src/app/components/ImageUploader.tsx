// ✅ ImageUploader.tsx
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FaImage } from 'react-icons/fa';

export default function ImageUploader({ onUpload }: { onUpload: (url: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_upload'); // ✅ Your unsigned preset

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/dvu8mor0x/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      setPreview(data.secure_url);
      onUpload(data.secure_url); // Pass URL to parent
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <label className="flex items-center gap-2 font-semibold text-gray-700">
        <FaImage className="text-green-600" /> Upload from Device
      </label>
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {uploading && <p className="text-blue-500">Uploading...</p>}

      {preview && (
        <div className="mt-4">
          <p className="text-green-600">Uploaded!</p>
          <Image
  src={preview}
  alt="Uploaded"
  width={256} // w-64 = 16rem = 256px
  height={160} // you can adjust as needed
  className="rounded shadow"
/>
        </div>
      )}
    </div>
  );
}
