import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { getOrdersByUser } from "../services/api/orders";
import { toast } from "sonner";

function OrdersPage() {
  const { user, isLoaded, isSignedIn } = useUser();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      fetchOrders();
    }
  }, [isLoaded, isSignedIn]);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const fetchedOrders = await getOrdersByUser(user.id);
      setOrders(fetchedOrders);
    } catch (error) {
      setIsError(true);
      toast.error("Failed to load orders. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const calculateOrderTotal = (order) => {
    return order.orderProducts.reduce((total, product) => {
      return total + product.quantity * product.productId.price;
    }, 0).toFixed(2);  // Format to 2 decimal places
  };

  if (!isLoaded) {
    return <div>Loading user information...</div>;
  }

  if (!isSignedIn) {
    return <div>Please sign in to view your orders.</div>;
  }

  if (isLoading) {
    return <div>Loading orders...</div>;
  }

  if (isError) {
    return <div>Error loading orders. Please try again later.</div>;
  }

  return (
    <div>
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Your Orders</h1>
        <div className="mt-4">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order._id} className="border-2 p-4 rounded-lg">
                  <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
                  <p>Payment Status: <strong>{order.paymentStatus}</strong></p>
                  <p>Shipping Address: {order.address.fname} {order.address.lname}, {order.address.city}</p>
                  <ul className="mt-2">
                    {order.orderProducts.map((product) => (
                      <li key={product.productId._id} className="text-lg">
                        {product.productId.name} - Quantity: {product.quantity}
                        <span> (${product.productId.price} each)</span>
                      </li>
                    ))}
                  </ul>
                  {/* Display total price for each order */}
                  <p className="text-lg font-bold mt-2">
                    Total Price: ${calculateOrderTotal(order)}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default OrdersPage;
