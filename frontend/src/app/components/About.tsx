'use client';

import Image from 'next/image';

export default function AboutSection() {
  return (
    <section className="bg-[#E8F9FF]">
      <div className="grid md:grid-cols-2 items-stretch gap-0">
        {/* Left Side: Image */}
        <Image
          src="/about1.jpg"
          alt="About Blogify"
          width={600}
          height={600}
          className="w-full h-full object-cover border-2 border-t-0 border-l-0 border-[#8FD14F] rounded-br-full"
        />

        {/* Right Side: Text with matching height and bg */}
        <div className="bg-[#E8F9FF] flex flex-col justify-center px-8 py-12">
          <p className="text-sm uppercase text-[#8FD14F] tracking-widest mb-2">About</p>

          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
            Codify empowers developers to share, inspire and grow together.
          </h2>

          <p className="text-gray-700 text-sm mb-2 leading-relaxed">
            Whether you&apos;re writing technical tutorials or sharing your thoughts,
            Codify gives you the space to do it beautifully and efficiently.
          </p>
          <p className="text-gray-700 text-sm mb-6 leading-relaxed">
            Built with <span className="text-[#8FD14F] font-medium">Next.js 15</span>,{' '}
            <span className="text-[#8FD14F] font-medium">Clerk</span>, and{' '}
            <span className="text-[#8FD14F] font-medium">Tailwind CSS</span>.
          </p>

          <button className="bg-[#8FD14F] hover:bg-[#7acb3d] text-white px-5 py-2 rounded-md text-sm font-medium transition">
            Read More
          </button>
        </div>
      </div>
    </section>
  );
}
