import React from 'react';
import { ArrowRight, Zap, Shield, Star, Smartphone, Headphones, Laptop } from 'lucide-react';

const Middle = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 sm:py-16 lg:py-24 px-4 sm:px-6 lg:px-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated gradient orbs */}
        <div className="absolute top-10 left-10 sm:top-20 sm:left-20 w-32 h-32 sm:w-48 sm:h-48 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 sm:bottom-20 sm:right-20 w-40 h-40 sm:w-56 sm:h-56 lg:w-96 lg:h-96 bg-gradient-to-r from-cyan-400/20 to-indigo-400/20 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
        
        {/* Floating tech icons */}
        <div className="absolute top-1/4 left-8 opacity-10 animate-bounce">
          <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-blue-500" />
        </div>
        <div className="absolute top-1/3 right-12 opacity-10 animate-bounce" style={{ animationDelay: "1s" }}>
          <Headphones className="w-6 h-6 sm:w-8 sm:h-8 text-purple-500" />
        </div>
        <div className="absolute bottom-1/4 left-16 opacity-10 animate-bounce" style={{ animationDelay: "2s" }}>
          <Laptop className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-500" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-16">
          {/* Text Section */}
          <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left animate-in slide-in-from-left duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200/50 rounded-full text-blue-700 text-sm font-medium backdrop-blur-sm">
              <Zap className="w-4 h-4" />
              <span>Latest Technology</span>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight">
                <span className="block text-gray-900">Upgrade Your</span>
                <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  Tech Game
                </span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              Explore the latest gadgets designed to make your life 
              <span className="text-blue-600 font-semibold"> smarter, faster, and more efficient</span>. 
              Engineered for innovation and packed with cutting-edge technology.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center">
                  <Shield className="w-5 h-5 text-green-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">Warranty</div>
                  <div className="text-xs text-gray-600">2 Years</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-full flex items-center justify-center">
                  <Star className="w-5 h-5 text-yellow-600 fill-current" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">Rating</div>
                  <div className="text-xs text-gray-600">4.9/5 Stars</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 justify-center lg:justify-start">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-100 to-cyan-100 rounded-full flex items-center justify-center">
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900 text-sm">Fast Setup</div>
                  <div className="text-xs text-gray-600">5 Minutes</div>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 items-center lg:items-start">
              <button className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold rounded-2xl shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center gap-3">
                  <span>Explore Products</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button className="group w-full sm:w-auto px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300">
                <span>View Catalog</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">24</span>
                </div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="relative order-1 lg:order-2 animate-in slide-in-from-right duration-1000" style={{ animationDelay: "200ms" }}>
            <div className="relative group max-w-md mx-auto lg:max-w-none">
              {/* Main glow effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative bg-gradient-to-br from-white/80 to-gray-50/80 backdrop-blur-sm border border-white/50 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/middle/middle3.jpg"
                  alt="Premium Tech Products"
                  className="w-full h-64 sm:h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Image overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent"></div>
                
                {/* Floating badges */}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full text-xs sm:text-sm font-medium animate-bounce">
                  Premium Quality
                </div>
                
                <div className="absolute bottom-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  Best Seller
                </div>
                
                {/* Tech specs popup */}
                <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-8 bg-white/95 backdrop-blur-sm p-3 sm:p-4 rounded-2xl shadow-xl border border-white/50 animate-float hidden sm:block">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-800">Ultra HD Display</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-800">AI Powered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-xs font-medium text-gray-800">Wireless Connect</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative floating elements */}
              <div className="absolute -top-4 -left-4 w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-60 animate-spin" style={{ animationDuration: "8s" }}></div>
              <div className="absolute -bottom-4 -right-4 w-6 h-6 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-1/4 -left-2 w-4 h-4 sm:w-6 sm:h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-8px) translateX(2px); }
          66% { transform: translateY(-4px) translateX(-2px); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Middle;