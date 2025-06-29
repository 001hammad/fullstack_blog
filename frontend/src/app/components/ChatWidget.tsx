'use client'

import { useState } from 'react'
import { TbMessageChatbotFilled } from 'react-icons/tb'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 cursor-pointer animate-bounce hover:animate-none hover:duration-500 right-6 bg-[#8FD14F] text-white p-3 rounded-full shadow-lg z-[60] hover:scale-105 transition group"
      >
        <TbMessageChatbotFilled size={38} className='transition-transform duration-300 group-hover:rotate-45' />
      </button>

      {/* Iframe Chatbot Panel */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 w-[90vw] h-[75vh] sm:w-[300px] sm:h-[450px] shadow-xl border border-gray-300 rounded-lg overflow-hidden z-50 bg-white">
          <iframe
            src="https://web-production-40fba.up.railway.app/" 
            title="Codify Chatbot"
            className="w-full h-full"
          />
        </div>
      )}
    </>
  )
}
