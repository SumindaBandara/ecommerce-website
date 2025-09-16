import React from "react";
import { ArrowRight, Sparkles, ShoppingBag, Star, Zap } from "lucide-react";


function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "2s" }}></div>
        <div className="absolute -bottom-20 left-40 w-80 h-80 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: "4s" }}></div>
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        
        {/* Animated particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      <div className="relative px-8 lg:px-16 py-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh] max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 animate-in slide-in-from-left duration-1000">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 backdrop-blur-sm border border-yellow-400/30 rounded-full text-yellow-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>WEEKLY DISCOUNT</span>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>

            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <span className="block text-white mb-2">Elite Online</span>
                <span className="block bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                  Marketplace
                </span>
                <span className="block text-white text-4xl lg:text-5xl mt-2">
                  for Premium Items
                </span>
              </h1>
              
              {/* Floating elements around text */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-60 animate-bounce"></div>
              <div className="absolute top-20 -left-8 w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-bounce" style={{ animationDelay: "0.5s" }}></div>
            </div>

            {/* Subtitle */}
            <p className="text-xl text-gray-300 leading-relaxed max-w-lg animate-in slide-in-from-left duration-1000" style={{ animationDelay: "200ms" }}>
              Elevate Your Digital Lifestyle with Our Premium Accessories. 
              <span className="text-cyan-400 font-medium"> Explore our range today</span> and elevate your tech setup
            </p>

            {/* Stats */}
            <div className="flex gap-8 py-4 animate-in slide-in-from-left duration-1000" style={{ animationDelay: "400ms" }}>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">10K+</div>
                <div className="text-sm text-gray-400">Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-sm text-gray-400">Customers</div>
              </div>
              <div className="text-center">
                <div className="flex items-center gap-1">
                  <span className="text-2xl font-bold text-white">4.9</span>
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-in slide-in-from-left duration-1000" style={{ animationDelay: "600ms" }}>
              <button className="group relative overflow-hidden px-8 py-4 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 text-white font-semibold rounded-2xl shadow-2xl shadow-purple-500/25 hover:shadow-purple-500/40 transform hover:scale-105 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5" />
                  <span>Shop Now</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </button>
              
              <button className="group px-8 py-4 border-2 border-white/20 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/30 transition-all duration-300">
                <div className="flex items-center gap-3">
                  <Zap className="w-5 h-5" />
                  <span>View Collection</span>
                </div>
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 pt-8 text-sm text-gray-400 animate-in slide-in-from-left duration-1000" style={{ animationDelay: "800ms" }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">✓</span>
                </div>
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">24</span>
                </div>
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">⚡</span>
                </div>
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative animate-in slide-in-from-right duration-1000" style={{ animationDelay: "300ms" }}>
            {/* Main image container */}
            <div className="relative group">
              {/* Glowing border effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300 animate-pulse"></div>
              
              {/* Image container */}
              <div className="relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/assets/hero/hi3.png"
                  alt="Premium Electronics"
                  className="w-full h-[600px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                
                {/* Floating product badges */}
                <div className="absolute top-6 left-6 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm font-medium animate-bounce">
                  New Arrivals
                </div>
                
                <div className="absolute bottom-6 right-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
                  Up to 50% OFF
                </div>
              </div>

              {/* Floating elements around image */}
              <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-60 animate-spin" style={{ animationDuration: "10s" }}></div>
              <div className="absolute -bottom-8 -left-8 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-60 animate-bounce"></div>
              
              {/* Product showcase cards */}
              <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Premium Quality</div>
                    <div className="text-sm text-gray-600">Guaranteed</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -right-8 top-1/4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl animate-float" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white fill-current" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">Top Rated</div>
                    <div className="text-sm text-gray-600">5-Star Products</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}

export default Hero;