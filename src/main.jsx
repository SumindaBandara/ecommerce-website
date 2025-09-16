import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";

import HomePage from "./pages/home/home.page.jsx";
import CartPage from "./pages/cart/cart.page.jsx";
import RootLayout from "./layouts/root.layout.jsx";
import CheckoutPage from "./pages/checkout/checkout.page.jsx";
import SignInPage from "./pages/auth/sign-in/sign-in.page.jsx";
import SignUpPage from "./pages/auth/sign-up/sign-up.page.jsx";
import PaymentPage from "./pages/payment/payment.page.jsx";
import { Toaster } from 'sonner';
import Shop from "./pages/Shop/Shop.jsx";
import ProductDetails from "./pages/Shop/Components/ProductDetails";
import OrdersPage from "./Orders/OrdersPage.jsx";

import { ClerkProvider } from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/checkout",
        element: <CheckoutPage />,
      },
      {
        path: "/payment",
        element: <PaymentPage />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/shop/:id", // Dynamic route for product details
        element: <ProductDetails />, // Component to handle product details
      },
      {
        path: "orders", // Dynamic route for product details
        element: <OrdersPage />, // Component to handle product details
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignInPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster richColors/>
    </ClerkProvider>
  </React.StrictMode>
);
