'use client';

import { useRef } from 'react';
import emailjs from 'emailjs-com';
import BackButton from '../components/BackButton';

export default function Contact() {
  const form = useRef<HTMLFormElement | null>(null);

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    emailjs
      .sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,  
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        form.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      )
      .then(
        (result) => {
          console.log('Success:', result.text);
          alert('Message sent successfully!');
          form.current?.reset();
        },
        (error) => {
          console.error('Error:', error.text);
          alert('Failed to send message. Try again.');
        }
      );
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <div
        className="h-[60vh] bg-cover bg-center flex items-center px-10 sm:px-20"
        style={{ backgroundImage: "url('/contact.jpg')" }}
      >
        <div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Contact</h1>
          <p><BackButton/></p>
          <div className="w-20 h-1 bg-[#8FD14F] rounded"></div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="bg-[#F5F5F5 py-20 px-6 sm:px-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left Info */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#8FD14F] mb-6">Get in Touch</h2>
            <p className="text-gray-700 mb-8">
              Reach out today and let&apos;s start discussing your trading goals. Connect with us now to
              explore how we can elevate your trading experience.
            </p>

            <div className="space-y-5 text-gray-800 text-sm">
              <div>
                <h4 className="font-semibold text-[#8FD14F]">Phone</h4>
                <p>+92 317 277 4237</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#8FD14F]">Email</h4>
                <p>iamhammad224@gmail.com</p>
              </div>
              <div>
                <h4 className="font-semibold text-[#8FD14F]">Address</h4>
                <p>2972 Westheimer Rd. Karachi, Pakistan 85486</p>
              </div>
            </div>
          </div>

          {/* Right Form */}
          <form ref={form} onSubmit={sendEmail} className="bg-white p-6 rounded-md shadow-md space-y-5">
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-medium">Name</label>
              <input
                type="text"
                name="user_name"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8FD14F]"
                placeholder="Your Name"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-medium">Email</label>
              <input
                type="email"
                name="user_email"
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8FD14F]"
                placeholder="Your Email"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1 font-medium">Message</label>
              <textarea
                name="message"
                rows={4}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:border-[#8FD14F]"
                placeholder="Your Message"
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-[#8FD14F] cursor-pointer hover:bg-[#7acb3d] text-white text-sm font-medium px-5 py-2 rounded-md transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
