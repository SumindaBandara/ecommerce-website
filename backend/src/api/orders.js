import express from "express";
import {
  createOrder,
  getOrderById,
  handlePayment,
  getOrdersByUser,
} from "../application/orders.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const ordersRouter = express.Router();

ordersRouter.post("/", ClerkExpressRequireAuth(), createOrder);
ordersRouter.get("/:id", getOrderById);
ordersRouter.post("/webhook/payment", ClerkExpressRequireAuth(), handlePayment);
ordersRouter.get("/user/:userId", ClerkExpressRequireAuth(), getOrdersByUser);

export default ordersRouter;
