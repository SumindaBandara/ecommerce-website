import express from "express";
import {
  createOrder,
  getOrderById,
  handlePayment,
  getOrdersByUser,
} from "../application/orders.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import AuthorizationMiddleware from "./middleware/authorization-middleware.js";

const ordersRouter = express.Router();

ordersRouter.route("/").post(ClerkExpressRequireAuth({}), createOrder);
ordersRouter.route("/:id").get(ClerkExpressRequireAuth({}),  getOrderById);
ordersRouter.route("/webhook/payment").post(handlePayment);
ordersRouter.route("/user/:userId").get(ClerkExpressRequireAuth({}),  getOrdersByUser);

export default ordersRouter;

