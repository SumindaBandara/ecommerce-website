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
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Our Top Products</h1>
        <div className="border mt-4"></div>
        <div className="py-8">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-8 px-16">
        <h1 className="text-4xl font-semibold">Our Top Products</h1>
        <div className="border mt-4"></div>
        <div className="py-8">
          <p className="text-red-500">Some error happened: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 px-16">
      <h1 className="text-4xl font-semibold">Our Top Products</h1>
      <div className="border mt-4"></div>
      <div className="py-8">
        <div className="flex items-center gap-x-4">
          {categories.concat([{ _id: "ALL", name: "ALL" }]).map((el) => (
            <Tab
              selectedCategory={selectedCategory}
              key={el._id}
              category={el}
              onClick={handleTabClick}
            />
          ))}
        </div>
        <div className="grid grid-cols-4 gap-6 mt-4">
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
