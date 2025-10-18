import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { reviewService } from "./review.service";
import { JwtPayload } from "jsonwebtoken";

// Create Review (Buyer only)
const createReview = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const user = req.user as JwtPayload
  const result = await reviewService.createReviewIntoDB(productId as string, user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Review created successfully!",
    data: result,
  });
});

// Get All Reviews for a Specific Product
const getProductReviews = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await reviewService.getProductReviewsFromDB(productId as string, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product reviews retrieved successfully!",
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewControllers = {
  createReview,
  getProductReviews,
};