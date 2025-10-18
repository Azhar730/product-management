import { Router } from "express";
import { ReviewControllers } from "./review.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router();

// Create a new review (Buyer only)
router.post(
  "/create/:productId",
  auth(UserRole.BUYER),
  ReviewControllers.createReview
);

// Get all reviews for a specific product (Public - anyone can see)
router.get(
  "/:productId",
  ReviewControllers.getProductReviews
);

export const ReviewRoutes = router;