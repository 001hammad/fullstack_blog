'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* Top Row */}
        <div className="grid md:grid-cols-3 gap-10 border-b border-gray-600 pb-8">
          {/* Logo & Description */}
          <div>
            <h2 className="text-2xl font-bold text-[#8FD14F] mb-3">Codify</h2>
            <p className="text-sm text-gray-300">
              A space where coders share ideas, learn, and grow together.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-2 text-sm">
            <Link href="/" className="hover:text-[#8FD14F] transition">Home</Link>
            <Link href="/AddBlog" className="hover:text-[#8FD14F] transition">Write a Blog</Link>
            <Link href="/contact" className="hover:text-[#8FD14F] transition">Contact</Link>
          </div>

          {/* External Links */}
          <div className="flex flex-col gap-2 text-sm">
            <Link
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#8FD14F] transition"
            >
              GitHub
            </Link>
            <Link
              href="#"
              className="hover:text-[#8FD14F] transition"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="hover:text-[#8FD14F] transition"
            >
              Terms of Service
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6 text-xs text-gray-400">
          <p>&copy; {new Date().getFullYear()} Codify. All rights reserved.</p>
          <p>Made with 🧡 by Hammad</p>
        </div>
      </div>
    </footer>
  );
}
