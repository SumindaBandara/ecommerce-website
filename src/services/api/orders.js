export const createOrder = async (data) => {
  const token = await window.Clerk?.session?.getToken(); // Get the authentication token

  const res = await fetch("https://storebackend-2.onrender.com/api/orders", {
    method: "POST", // HTTP method for creating a new resource
    headers: {
      "Content-Type": "application/json", // Specify JSON data in the request body
      Authorization: `Bearer ${token}`, // Pass the token for authentication
    },
    body: JSON.stringify(data), // Convert the order data to a JSON string
  });

  console.log("This is the data of created order", data); // Debugging log

  return await res.json(); // Parse and return the JSON response from the server
};




export const getOrderById = async (id) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://storebackend-4.onrender.com/api/orders/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
};
console.log("this is userByID DAtaaaa",getOrderById);

//new
export const getOrdersByUser = async (userId) => {
  const token = await window.Clerk?.session?.getToken();

  const res = await fetch(`https://storebackend-4.onrender.com/api/orders/user/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });


  return await res.json();
};
console.log("this is userByID DAtaaaa",getOrdersByUser);