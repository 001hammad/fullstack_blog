'use client';

import Image from 'next/image';
import { FaUserTie, FaAward } from 'react-icons/fa';
import BackButton from '../components/BackButton';

export default function AboutPage() {
  return (
    <div className="bg-white text-black">
      {/* Hero Banner */}
      <div className="relative h-[50vh] w-full">
        <Image
          src="/aboutpage.jpg"
          alt="About Hero Background"
          layout="fill"
          objectFit="cover"
          className="z-0"
        />
        <div className="relative h-[60vh] flex items-center justify-start px-6 sm:px-20">
  <div>
    <h1 className="text-5xl font-bold text-white mb-2">ABOUT</h1>
    <div className="w-20 h-1 bg-[#7acb3d] rounded"></div>
    <p><BackButton/></p>
  </div>
</div>

      </div>

      {/* Main Content */}
      <section className="py-16 px-6 sm:px-20 max-w-6xl mx-auto space-y-16">
        {/* Introduction */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">What is Codify?</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Codify is a modern blog platform where developers and tech enthusiasts can
              share their thoughts, especially on topics like programming, coding,
              and digital trends. Users can interact through likes and comments,
              making it an engaging space for learners and professionals alike.
            </p>
          </div>
          <div>
            <Image
              src="/q.jpg"
              alt="Blog illustration"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Image
              src="/mission.jpg"
              alt="Mission image"
              width={600}
              height={400}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              My vision is to make Codify a go-to space for digital learners and developers.
              I&apos;m working on adding premium features to enhance user experience and
              monetize the platform. The goal is to create an ecosystem where users
              feel inspired, informed, and valued.
            </p>
          </div>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-semibold mb-4">Meet the Founder</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              Hi, I&apos;m <strong>Hammad Hafeez</strong>, the solo developer and creator behind Codify.
              I manage everything from design to deployment. With a background in leadership
              as a student leader under the Governor IT Initiative, and achievements like
              calligraphy certification and school awards, I bring creativity and passion
              into this project.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><FaUserTie className="text-[#7acb3d]" /> Student Leader (Governor IT Initiative)</li>
              <li className="flex items-center gap-2"><FaAward className="text-[#7acb3d]" /> Certified in Calligraphy</li>
              <li className="flex items-center gap-2"><FaAward className="text-[#7acb3d]" /> Multiple School Awards</li>
            </ul>
          </div>
          <div>
            <Image
              src="/eid.jpg"
              alt="Hammad Hafeez"
              width={500}
              height={500}
              className="rounded-full shadow-xl object-cover"
            />
          </div>
        </div>

        {/* Audience Section */}
        <div className="bg-[#F9FAFB] p-10 rounded-xl">
          <h2 className="text-3xl font-semibold mb-6">Who is Codify for?</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Whether you&apos;re a beginner just stepping into IT or a professional looking to share
            or learn, Codify is built for you. Especially if you&apos;re into web development,
            digital tools, or simply want to be part of a thoughtful tech community.
          </p>
        </div>

        {/* Contact Note */}
        <div className="text-center text-sm text-gray-500 pt-10">
          📩 For any queries, you can reach me at: <strong>iamhammad224@gmail.com</strong><br />
          (You can also use the contact section already available on the website.)
        </div>
      </section>
    </div>
  );
}
