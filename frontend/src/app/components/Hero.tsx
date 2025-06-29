'use client';
import Link from 'next/link';
import { FiEdit3, FiBook } from 'react-icons/fi';

export default function Hero() {
  return (
    <section
      className="relative bg-fixed bg-cover bg-center min-h-screen flex items-center px-6 lg:px-20"
      // style={{ backgroundImage: "url('/coderoom.jpg')" }}
      // style={{ backgroundImage: "url('/home.jpg')" }}
      style={{ backgroundImage: "url('/coderoom1.jpg')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <div className="relative z-10 text-white max-w-2xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 leading-snug sm:leading-tight text-center sm:text-left">
  Build. Write. Share.  
  <span className="block text-[#8FD14F]">Your Coding Journey</span>
</h1>
<p className="text-base sm:text-lg text-gray-200 mb-8 text-center sm:text-left">
  Join a growing community of developers writing tutorials, tips & experiences on Codify.
</p>


        <div className="flex flex-col md:flex-row gap-4">
  <Link
  href="/AddBlog"
  className="flex items-center justify-center gap-2 bg-[#8FD14F] hover:bg-lime-500 text-black px-6 py-3 rounded-md font-medium transition group"
>
  <FiEdit3 className="transition-transform duration-300 group-hover:rotate-45" />
  Write Blog
</Link>
  <Link
    href="/blogs"
    className="flex items-center justify-center gap-2 border border-white text-white hover:bg-[#8FD14F] hover:text-black px-6 py-3 rounded-md font-medium transition group"
  >
    <FiBook className='transition-transform duration-300 group-hover:rotate-45'/>
    Browse Blogs
  </Link>
</div>

      </div>
    </section>
  );
}
