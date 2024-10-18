import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const connectionString =
      "mongodb+srv://sumindabandarapc:OJtZ72JI6LV3M1md@cluster0.msrqh.mongodb.net/";
      await mongoose.connect(connectionString);
    console.log("Connected to the database", connectionString);
  } catch (error) {
    console.log(error);
    console.log("Error connecting to the database");

    // Example: Check your database connection string
const mongoURI = process.env.MONGO_URI; // Ensure this points to the new database


  }
};
