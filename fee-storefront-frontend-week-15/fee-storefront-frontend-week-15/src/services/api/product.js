export const createCategory = async () => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch("https://fee-storefront-backend.onrender.com/api/categories", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name: "Macbook" }),
  });

  return await res.json();
};
