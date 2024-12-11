import React from 'react'

const middle = () => {
  return (
    <div className="relative bg-white py-16 px-6 lg:px-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
        {/* Text Section */}
        <div className="space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
            Upgrade Your Tech Game
          </h1>
          <p className="text-gray-600 text-lg">
            Explore the latest gadgets designed to make your life smarter, faster, and more efficient. Engineered for innovation and packed with cutting-edge technology.
          </p>
          <button className="mt-4 px-6 py-3 bg-black text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Explore Products
          </button>
        </div>

        {/* Image Section */}
        <div className="relative">
  <img
    src="/public/assets/middle/middle3.jpg"
    alt="Tech Product"
    className="rounded-md shadow-lg w-3/4 mx-auto" // Smaller image size with centered alignment
  />
  {/* Decorative Elements */}
  <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-200 rounded-full blur-2xl"></div>
  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-blue-300 rounded-full blur-2xl"></div>
</div>
      </div>
    </div>
  )
}

export default middle;