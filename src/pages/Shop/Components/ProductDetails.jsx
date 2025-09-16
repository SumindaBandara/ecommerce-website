import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CartContext } from "../../../context/cartContext";
import { useContext } from "react";
import { toast } from 'sonner';


function ProductDetails() {
  // Get the product ID from the URL
  const { id } = useParams();

  // State to store product details
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { updateCart } = useContext(CartContext);


  const handleAddToCart = () => {
    if (product) {
        updateCart({
          _id: product._id, // Use product state instead of props
          name: product.name,
          price: product.price,
          image: product.image,
          description: product.description,
        });
        toast.success('Item added to cart');
      }
    };



  // Fetch product details when the component is mounted
  useEffect(() => {
    // Simulating an API call to fetch product details based on the ID
    fetch(`http://localhost:8000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setProduct(data); // Set the product data
        setIsLoading(false); // Set loading to false
      })
      .catch(() => {
        setIsError(true); // Handle any errors
        setIsLoading(false); // Set loading to false
      });
  }, [id]); // `id` is a dependency to refetch if it changes

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold animate-pulse">Loading...</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-red-500 font-semibold">Error loading product details.</p>
      </div>
    );
  }



  // Render product details if data is available
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {product ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg transform transition-transform hover:scale-105"
            />
            {/* Label */}
            <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs uppercase tracking-wide">
              {product.label || "New"}
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center space-y-5">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            <p className="text-lg text-gray-600">{product.description}</p>
            <p className="text-2xl font-semibold text-green-600">Price: ${product.price}</p>

            {/* Button */}
            <button
            onClick={handleAddToCart}
            type="button"
            className="border-2 border-black px-4 py-1 text-lg rounded-lg mt-2 font-medium hover:bg-black hover:text-white transition"
          >
            Add To Cart
          </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <p className="text-lg font-semibold">Product not found.</p>
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
