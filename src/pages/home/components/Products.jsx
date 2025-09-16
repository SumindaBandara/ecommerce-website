import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  // Function to handle tab clicks and fetch filtered products
  const handleTabClick = (categoryId) => {
    setSelectedCategory(categoryId);
    console.log("Selected category in HandleTabClick:", categoryId);
  };

  // Fetch products based on selected category
  useEffect(() => {
    setIsLoading(true);
    getAllProducts(selectedCategory)
      .then((data) => setProducts(data))
      .catch((e) => {
        setIsError(true);
        setError(e.message);
      })
      .finally(() => setIsLoading(false));
  }, [selectedCategory]);

  useEffect(() => {
    getAllCategories()
      .then((data) => setCategories(data))
      .catch((e) => {
        setIsError(true);
        setError(e.message);
      });
  }, []);

  if (isLoading) {
    return (
      <section className="py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Our Top Products</h1>
        <div className="border mt-4"></div>
        <div className="py-6 lg:py-8">
          <p className="text-center text-gray-600">Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Our Top Products</h1>
        <div className="border mt-4"></div>
        <div className="py-6 lg:py-8">
          <p className="text-red-500 text-center">Some error happened: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4 px-4 sm:py-6 sm:px-6 lg:py-8 lg:px-16">
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">Our Top Products</h1>
      <div className="border mt-4"></div>
      <div className="py-6 lg:py-8">
        {/* Mobile: Scrollable tabs, Desktop: Flex layout */}
        <div className="flex items-center gap-x-2 sm:gap-x-3 lg:gap-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {categories.concat([{ _id: "ALL", name: "ALL" }]).map((el) => (
            <Tab
              selectedCategory={selectedCategory}
              key={el._id}
              category={el}
              onClick={handleTabClick}
            />
          ))}
        </div>
        
        {/* Responsive grid: 1 col on mobile, 2 on tablet, 3-4 on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-6">
          {products.map((el) => (
            <ProductCard
              key={el._id}
              _id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              description={el.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;