import React, { useEffect, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useUser } from "@clerk/clerk-react";
import { getOrdersByUser } from "../services/api/orders";
import { toast } from "sonner";
import { 
  CheckCircleIcon, 
  PackageIcon, 
  ClockIcon,
  AlertTriangleIcon,
  RefreshCwIcon
} from "lucide-react";
import Footer from "../pages/home/components/Footer";

// Error Fallback Component
function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="error-boundary p-8 bg-red-50 text-red-800 rounded-lg max-w-md mx-auto mt-10">
      <div className="flex items-center mb-4">
        <AlertTriangleIcon className="w-8 h-8 mr-3 text-red-600" />
        <h1 className="text-2xl font-bold">Something went wrong</h1>
      </div>
      <p className="mb-4">We encountered an unexpected error while loading your orders.</p>
      <details className="mb-4">
        <summary>Error Details</summary>
        <pre className="bg-red-100 p-4 rounded mt-2 text-sm overflow-auto">
          {error.toString()}
        </pre>
      </details>
      <div className="flex space-x-4">
        <button 
          onClick={resetErrorBoundary} 
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          <RefreshCwIcon className="mr-2 w-4 h-4" />
          Try Again
        </button>
        <button 
          onClick={() => window.location.reload()}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
}

function OrdersPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    if (!isLoaded || !isSignedIn || !user?.id) {
      throw new Error("User not identified");
    }

    setIsLoading(true);

    try {
      const fetchedOrders = await getOrdersByUser(user.id);
      const ordersArray = Array.isArray(fetchedOrders) 
        ? fetchedOrders 
        : (fetchedOrders.orders || []);
      
      setOrders(ordersArray);
    } catch (error) {
      console.error("Orders fetch error:", error);
      toast.error(error.response?.data?.message || error.message || "Failed to load orders");
      throw error; // Rethrow to be caught by error boundary
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchOrders();
    }
  }, [isLoaded, isSignedIn, user]);

  const calculateOrderTotal = (order) => {
    const products = Array.isArray(order.orderProducts) ? order.orderProducts : [];
    const total = products.reduce((total, product) => {
      const price = product.productId?.price || product.price || 0;
      const quantity = product.quantity || 1;

      const safePrice = Number(price);
      const safeQuantity = Number(quantity);

      if (isNaN(safePrice) || isNaN(safeQuantity)) {
        console.warn('Invalid price or quantity detected:', { price, quantity, product });
        return total;
      }

      return total + safePrice * safeQuantity;
    }, 0);

    return Number(total).toFixed(2);
  };

  const getOrderStatusIcon = (status) => {
    switch(status) {
      case 'Paid':
        return <CheckCircleIcon className="text-green-500 w-6 h-6" />;
      case 'Pending':
        return <ClockIcon className="text-yellow-500 w-6 h-6" />;
      case 'Processing':
        return <PackageIcon className="text-blue-500 w-6 h-6" />;
      default:
        return null;
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">
          Loading user information...
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="flex justify-center items-center h-screen text-center">
        <p className="text-gray-600 text-xl">Please sign in to view your orders.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-gray-500">
          Loading orders...
        </div>
      </div>
    );
  }

  return (
    <div>
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <header className="mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Your Orders
        </h1>
        <p className="text-gray-600">
          View and track the status of your recent purchases
        </p>
      </header>
      <section className="py-8">

  <div className="flex gap-6 mb-6">
    
    <div className="flex-1">
      <img
        src="public/assets/orders/orders1.jpg"
        alt="Order Introduction"
        className="w-80 h-80 rounded-lg"
      />
    </div>

    
    <div className="flex-1">
      <img
        src="public/assets/orders/orders2.jpg"
        alt="Order Details"
        className="w-80 h-80 rounded-lg"
      />
    </div>
  </div>

  
</section>

      
      {orders.length === 0 ? (
        <div className="bg-gray-100 rounded-lg p-10 text-center">
          <img 
            src="/api/placeholder/400/300" 
            alt="No orders" 
            className="mx-auto mb-6 rounded-lg shadow-md"
          />
          <p className="text-xl text-gray-600">
            You haven't placed any orders yet.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div 
              key={order._id} 
              className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center space-x-3">
                    {getOrderStatusIcon(order.paymentStatus)}
                    <span className="font-semibold text-gray-700">
                      {order.paymentStatus || 'Unknown Status'}
                    </span>
                  </div>
                  <span className="text-gray-500 text-sm">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {(order.orderProducts || []).map((product) => (
                      <div 
                        key={product.productId?._id || product._id} 
                        className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg"
                      >
                        <img 
                          src={product.productId?.image || "/api/placeholder/100/100"}
                          alt={product.productId?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-md"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-gray-800">
                                {product.productId?.name || 'Unknown Product'}
                              </h4>
                              <p className="text-gray-500 text-sm">
                                Qty: {product.quantity || 1}
                              </p>
                            </div>
                            <span className="font-semibold text-gray-900">
                              ${Number(product.productId?.price || 0).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t flex justify-between items-center">
                  <div>
                    <p className="text-gray-600 mb-1">Shipping Address</p>
                    <p className="font-medium text-gray-800">
                      {order.address?.fname} {order.address?.lname}, 
                      {order.address?.city}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold block mb-1">Total</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${calculateOrderTotal(order)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
    </div>
    <Footer/>
    </div>
    
  );
  
}


// Wrapper component with Error Boundary
function OrdersPageWrapper() {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback}
      onReset={() => {
        // Optional: You can add any reset logic here
        window.location.reload();
      }}
    >
      <OrdersPage />
    </ErrorBoundary>
  );
}

export default OrdersPageWrapper;