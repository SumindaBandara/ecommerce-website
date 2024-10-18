const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));

export const getAllCategories = async () => {
  try {
    const res = await fetch("http://localhost:8000/api/categories", {
      method: "GET", 
    });
    const categories = await res.json();
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};