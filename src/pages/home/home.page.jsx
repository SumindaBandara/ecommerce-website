import Hero from "./components/Hero";
import Products from "./components/Products";
import Middle from "./components/middle";
import Footer from "./components/Footer";
import AIProductFinder from "./components/AIProductFinder";
import { useState, useEffect } from "react";
import { getAllProducts } from "../../services/api/products";

function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      const data = await getAllProducts(""); // fetch all products
      setProducts(data);
      setLoading(false);
    }
    loadProducts();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      
      <Hero />
      <AIProductFinder products={products} />
      <Products />
      <Middle />
      <Footer />
    </div>
  );
}

export default HomePage;
