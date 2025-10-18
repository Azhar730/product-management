import { Router } from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// Create a new order (Buyer only)
router.post(
    "/create-order",
    auth(UserRole.BUYER),
    OrderControllers.createOrder
);

// Get all orders for logged-in user (Buyer or Seller can view their own)
router.get(
    "/my-orders",
    auth(UserRole.BUYER, UserRole.SELLER),
    OrderControllers.getMyOrders
);

export const OrderRoutes = router;