"use strict";

import "dotenv/config";
import express from "express";
import productsRouter from "./api/products.js";
import categoriesRouter from "./api/categories.js";
import ordersRouter from "./api/orders.js";
import { connectDB } from "./infrastructure/db.js";
import { globalErrorHandler } from "./api/middleware/global-error-handler.js";
import cors from "cors";
import airouter from "./api/ai.js";

const app = express();

// ✅ CORS setup (must be first middleware)
const allowedOrigins = [
  "https://techzones.netlify.app", // deployed frontend
  "http://localhost:5173",         // dev frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Handle preflight explicitly
app.options("*", cors());

// ✅ Parse JSON
app.use(express.json());

// ✅ Routes
app.use("/api/products", productsRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/ai", airouter);

// ✅ Global error handler
app.use(globalErrorHandler);

// ✅ Connect DB
connectDB();

// ✅ Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});
