import { Heart, ShoppingCart, Star, Eye, Zap } from "lucide-react";
import { useState } from "react";
import { CartContext } from "../../../context/cartContext";
import { useContext } from "react";
import { toast } from 'sonner';

function ProductCard(props) {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { updateCart } = useContext(CartContext);

  const handleClick = () => {
    setIsLiked(!isLiked);
  };

  const handleAddToCart = () => {
    updateCart({
      _id: props._id,
      name: props.name,
      price: props.price,
      image: props.image,
      description: props.description,
    });
    toast.success('Item added to cart');
  };

  return (
    <div 
      className="group relative bg-white/80 backdrop-blur-sm border border-white/20 rounded-3xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Gradient glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
      
      <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden">
        {/* Header with actions */}
        <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
          {/* Product status badge */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg animate-pulse">
            New
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Quick view button */}
            <button className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-blue-50">
              <Eye className="w-4 h-4 text-gray-700" />
            </button>
            
            {/* Heart button */}
            <button
              onClick={handleClick}
              className={`w-8 h-8 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 ${
                isLiked 
                  ? 'bg-red-500 text-white' 
                  : 'bg-white/90 text-red-500 hover:bg-red-50'
              }`}
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isLiked ? 'fill-white scale-110' : 'hover:fill-red-500'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Image container */}
        <div className="relative h-64 sm:h-72 bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
          <img 
            src={props.image} 
            alt={props.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Floating elements */}
          <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full shadow-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-current" />
              <span className="text-xs font-medium text-gray-700">4.9</span>
            </div>
          </div>
          
          {/* Quick add overlay */}
          <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}>
            <button
              onClick={handleAddToCart}
              className="bg-white text-black px-6 py-3 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Quick Add</span>
            </button>
          </div>
        </div>

        {/* Content section */}
        <div className="p-6 space-y-4">
          {/* Product name and price */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-300">
                {props.name}
              </h3>
              
              {/* Rating stars */}
              <div className="flex items-center gap-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < 4 ? 'text-yellow-500 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="text-xs text-gray-500 ml-1">(128)</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                ${props.price}
              </span>
              <span className="text-xs text-gray-500 line-through">
                ${(parseFloat(props.price) * 1.2).toFixed(2)}
              </span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
            {props.description}
          </p>

          {/* Features */}
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>In Stock</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Zap className="w-3 h-3 text-yellow-500" />
              <span>Fast Delivery</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Premium</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3 pt-2">
            <button
              onClick={handleAddToCart}
              className="flex-1 group/btn relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white font-semibold py-3 px-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4 group-hover/btn:rotate-12 transition-transform duration-300" />
                <span>Add to Cart</span>
              </div>
            </button>
            
            <button className="w-12 h-12 border-2 border-gray-200 rounded-2xl flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 hover:scale-110">
              <Heart className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Special offer */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-3 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">%</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-800">Special Offer</div>
                <div className="text-xs text-gray-600">Free shipping on this item!</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${10 + (i * 10)}%`,
              animationDelay: `${i * 0.2}s`,
              animationDuration: '2s'
            }}
          />
        ))}
      </div>

      {/* Custom styles for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}

export default ProductCard;