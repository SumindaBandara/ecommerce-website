export const getAllProducts = async (categoryId) => {
  try {
    const res = await fetch(`https://storebackend-2.onrender.com/api/products?categoryId=${encodeURIComponent(categoryId)}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.statusText}`);
    }

    const products = await res.json();
    console.log("Fetched products:", products); // Debug log
    return Array.isArray(products) ? products : []; // Ensure the response is an array
  } catch (error) {
    console.error("Error fetching products:", error);
    return []; // Return an empty array in case of error
  }
};
