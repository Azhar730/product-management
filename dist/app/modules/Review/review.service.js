"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewService = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const queryBuilder_1 = __importDefault(require("../../../helpers/queryBuilder"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const createReviewIntoDB = async (productId, user, payload) => {
    // Check if product exists
    const product = await prisma_1.default.product.findUnique({
        where: { id: productId },
    });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found!");
    }
    // prevent multiple reviews by same user for same product
    const existingReview = await prisma_1.default.review.findFirst({
        where: {
            userId: user.id,
            productId
        },
    });
    if (existingReview) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "You have already reviewed this product!");
    }
    // Validate rating
    if (payload.rating < 1 || payload.rating > 5) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Rating must be between 1 and 5');
    }
    // Create new review
    const review = await prisma_1.default.review.create({
        data: {
            userId: user.id,
            productId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });
    return review;
};
const getProductReviewsFromDB = async (productId, query) => {
    const queryBuilder = new queryBuilder_1.default(prisma_1.default.review, query);
    const reviews = await queryBuilder
        .range()
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute({
        where: { productId },
        include: {
            user: {
                select: {
                    name: true,
                    email: true,
                },
            },
        },
    });
    const meta = await queryBuilder.countTotal();
    return { meta, data: reviews };
};
exports.reviewService = {
    createReviewIntoDB,
    getProductReviewsFromDB,
};
//# sourceMappingURL=review.service.js.map