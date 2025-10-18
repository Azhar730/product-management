"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Create a new order (Buyer only)
router.post("/create-order", (0, auth_1.default)(client_1.UserRole.BUYER), order_controller_1.OrderControllers.createOrder);
// Get all orders for logged-in user (Buyer or Seller can view their own)
router.get("/my-orders", (0, auth_1.default)(client_1.UserRole.BUYER, client_1.UserRole.SELLER), order_controller_1.OrderControllers.getMyOrders);
exports.OrderRoutes = router;
//# sourceMappingURL=order.route.js.map