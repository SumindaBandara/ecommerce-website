import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import Tab from "./Tab";
import SortButton from "./SortButton";
import { getAllProducts } from "../../../services/api/products";
import { getAllCategories } from "../../../services/api/categories";


function Products() {

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [sortOrder, setSortOrder] = useState("null");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [categories, setCategories] = useState([]);

  


  //handle Sorting Changes
  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

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


  const sortedProducts = products.slice().sort((a, b) => {
    const aPrice = parseFloat(a.price);
    const bPrice = parseFloat(b.price);
    return sortOrder === 'Low to High' ? aPrice - bPrice : bPrice - aPrice;
  });



  



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

        
      <SortButton sortOrder={sortOrder} handleSortChange={handleSortChange} />
        
        <div className="grid grid-cols-4 gap-6 mt-4">
          {sortedProducts.map((el) => (
            <ProductCard
              key={el._id}
              _id={el._id}
              image={el.image}
              name={el.name}
              price={el.price}
              description={el.description}
              selected_id={el._id}
              
            />
            
          ))}
        </div>
      </div>
    </section>
  );
}

export default Products;
