import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://sumindabandarapc:ABCD@cluster0.msrqh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
      await mongoose.connect(connectionString);
    console.log("Connected to the database", connectionString);
  } catch (error) {
    console.log(error);
    console.log("Error connecting to the database");

    // Example: Check your database connection string
const mongoURI = process.env.MONGO_URI; // Ensure this points to the new database


  }
};
