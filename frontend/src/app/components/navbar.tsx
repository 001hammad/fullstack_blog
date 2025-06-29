'use client';

import Link from 'next/link';
import { useState } from 'react';
import { UserButton, SignInButton, SignedIn, SignedOut } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import { X, Menu } from 'lucide-react';
import { FaDollarSign } from 'react-icons/fa';

export default function Navbar() {
  const { user } = useUser();
  const isAdmin = user?.primaryEmailAddress?.emailAddress === 'blogify082@gmail.com';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-50 bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-extrabold text-white tracking-wide">
            Codify<span className="text-[#8FD14F]">.</span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-white hover:text-[#8FD14F] font-medium transition-colors">Home</Link>
            <Link href="/blogs" className="text-white hover:text-[#8FD14F] font-medium transition-colors">Blogs</Link>
            <Link href="/AddBlog" className="text-white hover:text-[#8FD14F] font-medium transition-colors">Write</Link>
            <Link href="/contact" className="text-white hover:text-[#8FD14F] font-medium transition-colors">Contact</Link>
            {/* <Link href="/FeedBack" className="text-white bg-[#8FD14F] px-3 py-1.5 rounded hover:bg-lime-500 font-semibold transition shadow-sm">Feedback</Link> */}
           <Link
  href="/FeedBack"
  className="flex items-center gap-2 text-green-800 bg-gradient-to-r from-lime-300 to-green-400 px-5 py-2 rounded-full font-bold shadow-lg group border-2 border-green-700 hover:scale-105 hover:from-lime-400 hover:to-green-500 transition-all duration-300"
>
  <FaDollarSign className="text-lg text-green-900 drop-shadow className='transition-transform duration-300 group-hover:rotate-45" />
  Feedback
</Link>



            {isAdmin && (
              <Link href="/admin/blogs" className="text-red-500 hover:text-[#8FD14F] font-medium transition-colors">Admin</Link>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center space-x-4">
            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-[#8FD14F] hover:bg-lime-500 text-black font-medium px-4 py-1.5 rounded transition">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(true)}>
              <Menu className="text-white w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide Menu */}
      <div className={`fixed top-0 right-0 h-full w-54 bg-[#1a1a1a] shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center px-4 py-4 border-b border-[#8FD14F]">
          <h2 className="text-white text-lg font-bold">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <X className="text-white w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col p-4 space-y-4">
          <Link href="/" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#8FD14F]">Home</Link>
          <Link href="/blogs" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#8FD14F]">Blog</Link>
          <Link href="/AddBlog" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#8FD14F]">Write</Link>
            <Link href="/FeedBack" className="text-white bg-[#8FD14F] px-3 py-1.5 rounded hover:bg-lime-500 font-semibold transition shadow-sm">Feedback</Link>
          <Link href="/contact" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#8FD14F]">Contact</Link>
          {isAdmin && (
            <Link href="/admin/blogs" onClick={() => setMenuOpen(false)} className="text-white hover:text-[#8FD14F]">Admin</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
