import React from 'react'

const Label = () => {
  return (
    <section className="w-full bg-yellow-200    py-34 px-6 sm:px-10 ">
  <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
    
    {/* Left Side: Text */}
    <div className="mb-6 sm:mb-0">
      <h3 className="text-sm uppercase tracking-widest text-[#8FD14F] font-semibold mb-2">
        What&apos;s New
      </h3>
      <p className="text-2xl sm:text-3xl font-bold text-gray-800">
        Fresh picks and stories handpicked for coders.
      </p>
    </div>

    {/* Right Side: Button */}
    <button className="bg-[#8FD14F] hover:bg-[#7acb3d] text-white font-medium px-6 py-3 rounded-md transition">
      Discover More
    </button>
  </div>
</section>


  )
}

export default Label
