'use client';

import { FaQuoteLeft } from 'react-icons/fa';
import { IoIosStar } from 'react-icons/io';

export default function Feedback() {
  return (
    <section
      className="w-full bg-fixed bg-center bg-cover py-20 px-6 sm:px-10"
      style={{ backgroundImage: "url('/feedback.jpg')" }}
    >
      <div className="max-w-6xl mx-auto  bg-opacity-90 backdrop-blur-md rounded-lg shadow-lg p-10 grid md:grid-cols-5 items-center gap-8">
        {/* Left Side: Big Icon */}
        <div className="col-span-1 flex justify-center md:justify-start">
          <FaQuoteLeft className="text-6xl text-black" />
        </div>

        {/* Right Side: Feedback Content */}
        <div className="col-span-4">
          {/* Stars */}
          <div className="flex items-center space-x-1 mb-3 text-amber-400">
            {[...Array(5)].map((_, i) => (
              <IoIosStar key={i} className="text-3xl" />
            ))}
          </div>

          {/* Feedback Text */}
          <p className="text-gray-800 text-2xl leading-relaxed mb-4">
            Codify has completely changed the way I write and share ideas.
            It&apos;s fast, elegant, and super developer-friendly!
          </p>

          {/* User Name */}
          <p className="text-gray-900 font-semibold">Hammad Hafeez</p>

          {/* User Role */}
          <p className="text-sm text-gray-600">Full Stack Developer</p>
        </div>
      </div>
    </section>
  );
}
