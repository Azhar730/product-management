"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const express_1 = require("express");
const review_controller_1 = require("./review.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
// Create a new review (Buyer only)
router.post("/create/:productId", (0, auth_1.default)(client_1.UserRole.BUYER), review_controller_1.ReviewControllers.createReview);
// Get all reviews for a specific product (Public - anyone can see)
router.get("/:productId", review_controller_1.ReviewControllers.getProductReviews);
exports.ReviewRoutes = router;
//# sourceMappingURL=review.route.js.map