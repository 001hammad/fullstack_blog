'use client';

import { useState } from 'react';
import { FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: 'What is Codify?',
    answer:
      'Codify is a developer-focused platform to share blogs, tutorials, and experiences with the world.',
  },
  {
    question: 'Is Codify free to use?',
    answer:
      'Yes! codify is completely free to use for reading and writing blogs.',
  },
  {
    question: 'Can I edit or delete my blogs later?',
    answer:
      'Absolutely! You can manage your blogs from your profile or admin panel.',
  },
  {
    question: 'How do I sign up?',
    answer:
      'Click the Sign In button on the top right. You can sign in using your email through Clerk.',
  },
  {
    question: 'Is Codify open-source?',
    answer:
      'Currently, Codify is not open-source but we plan to open some parts of it in the future.',
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#E8F9FF] py-20 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Left Side */}
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8FD14F] mb-4">F.A.Q.</h2>
          <p className="text-gray-700 text-base">
            Find answers to commonly asked questions about our services and trading strategies.
          </p>
        </div>

        {/* Right Side: FAQs */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-gray-300 rounded-md bg-white shadow-sm transition-all duration-300"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-left"
                >
                  <span className="text-gray-800 font-bold">{faq.question}</span>
                  {isOpen ? (
                    <FiMinus className="text-[#8FD14F] text-xl" />
                  ) : (
                    <FiPlus className="text-[#8FD14F] text-xl" />
                  )}
                </button>

                <div
                  className={`px-5 text-gray-600 text-sm overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-40 pb-4' : 'max-h-0'
                  }`}
                >
                  {isOpen && <p>{faq.answer}</p>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
