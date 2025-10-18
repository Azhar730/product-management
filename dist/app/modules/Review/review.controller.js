"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const review_service_1 = require("./review.service");
// Create Review (Buyer only)
const createReview = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    const result = await review_service_1.reviewService.createReviewIntoDB(productId, user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Review created successfully!",
        data: result,
    });
});
// Get All Reviews for a Specific Product
const getProductReviews = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const result = await review_service_1.reviewService.getProductReviewsFromDB(productId, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Product reviews retrieved successfully!",
        meta: result.meta,
        data: result.data,
    });
});
exports.ReviewControllers = {
    createReview,
    getProductReviews,
};
//# sourceMappingURL=review.controller.js.map