import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getOrdersByUser } from "../services/api/orders";
import { toast } from "sonner";

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    toast.error("An unexpected error occurred");
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary p-8 bg-red-50 text-red-800 rounded-lg">
          <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
          <p>Please try refreshing the page or contact support.</p>
          {this.state.error && (
            <details className="mt-4">
              <summary>Error Details</summary>
              <pre className="bg-red-100 p-4 rounded mt-2">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

function OrdersPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchOrders();
    }
  }, [isLoaded, isSignedIn, user]);

  const fetchOrders = async () => {
    // Reset error states
    setIsError(false);
    setErrorMessage("");

    // Validate user and user ID
    if (!user || !user.id) {
      setIsError(true);
      setErrorMessage("User information is not available");
      setIsLoading(false);
      toast.error("User not identified");
      return;
    }

    setIsLoading(true);
    try {
      const fetchedOrders = await getOrdersByUser(user.id);
      
      // Defensive programming: ensure fetchedOrders is an array
      const ordersArray = Array.isArray(fetchedOrders) 
        ? fetchedOrders 
        : (fetchedOrders.orders || []);
      
      console.log('Fetched Orders:', ordersArray);
      
      setOrders(ordersArray);
    } catch (error) {
      console.error("Orders fetch error:", error);
      setIsError(true);
      
      // More specific error handling
      const errorMsg = error.response?.data?.message 
        || error.message 
        || "Failed to load orders";
      
      setErrorMessage(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOrderTotal = (order) => {
    // Ensure orderProducts is an array and handle potential nested product structure
    const products = Array.isArray(order.orderProducts) ? order.orderProducts : [];
    
    return products.reduce((total, product) => {
      const price = product.productId?.price || product.price || 0;
      const quantity = product.quantity || 1;
      return total + (quantity * price);
    }, 0).toFixed(2);
  };

  // Loading state
  if (!isLoaded) {
    return <div className="text-center py-8">Loading user information...</div>;
  }

  // Authentication check
  if (!isSignedIn) {
    return (
      <div className="text-center py-8">
        <p>Please sign in to view your orders.</p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="text-center py-8 bg-red-50 text-red-800">
        <h2 className="text-2xl font-semibold mb-4">Error Loading Orders</h2>
        <p>{errorMessage || "Unable to retrieve orders. Please try again later."}</p>
        <button 
          onClick={fetchOrders} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Retry
        </button>
      </div>
    );
  }

  // Loading orders
  if (isLoading) {
    return <div className="text-center py-8">Loading orders...</div>;
  }

  return (
    <ErrorBoundary>
      <div className="container mx-auto px-4 sm:px-8">
        <section className="py-8">
          <h1 className="text-4xl font-semibold mb-6">Your Orders</h1>
          
          {orders.length === 0 ? (
            <div className="text-center py-8 bg-gray-100 rounded-lg">
              <p className="text-xl text-gray-600">No orders found.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <div 
                  key={order._id} 
                  className="border-2 border-gray-200 p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-gray-800">
                      Order ID: {order._id}
                    </h2>
                    <span 
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        order.paymentStatus === 'Paid' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.paymentStatus || 'Unknown Status'}
                    </span>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      Shipping Address: {order.address?.fname} {order.address?.lname}, 
                      {order.address?.city}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h3 className="text-lg font-semibold mb-2">Order Items</h3>
                    <ul className="divide-y divide-gray-200">
                      {(order.orderProducts || []).map((product) => (
                        <li 
                          key={product.productId?._id || product._id} 
                          className="py-2 flex justify-between"
                        >
                          <div>
                            <span className="font-medium">
                              {product.productId?.name || 'Unknown Product'}
                            </span>
                            <span className="text-gray-500 ml-2">
                              Qty: {product.quantity || 1}
                            </span>
                          </div>
                          <span className="font-semibold">
                            ${(product.productId?.price || 0).toFixed(2)} each
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-between items-center">
                    <span className="text-lg font-bold">Total Price:</span>
                    <span className="text-2xl font-bold text-green-700">
                      ${calculateOrderTotal(order)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </ErrorBoundary>
  );
}

export default OrdersPage;