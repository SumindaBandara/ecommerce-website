const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const getAllProducts = async (categoryId) => {
  const res = await fetch(`http://localhost:8000/api/products?categoryId=${categoryId}`, {
    method: "GET",
  });
  console.log("Respond Of GetAllProducts data:", res);
  const products = await res.json();
  return products;
};

