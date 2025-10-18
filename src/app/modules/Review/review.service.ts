import { Review } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import prisma from "../../../shared/prisma";
import { IGenericResponse } from "../../../interfaces/common";
import QueryBuilder from "../../../helpers/queryBuilder";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

const createReviewIntoDB = async (
    productId:string,
    user: JwtPayload,
    payload: Review
): Promise<Review> => {
    // Check if product exists
    const product = await prisma.product.findUnique({
        where: { id: productId },
    });

    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found!")
    }

    // prevent multiple reviews by same user for same product
    const existingReview = await prisma.review.findFirst({
        where: {
            userId: user.id as string,
            productId
        },
    });

    if (existingReview) {
        throw new ApiError(httpStatus.CONFLICT, "You have already reviewed this product!");
    }
    // Validate rating
    if (payload.rating < 1 || payload.rating > 5) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Rating must be between 1 and 5');
    }
    // Create new review
    const review = await prisma.review.create({
        data: {
            userId: user.id as string,
            productId,
            rating: payload.rating,
            comment: payload.comment,
        },
    });

    return review;
};


const getProductReviewsFromDB = async (
    productId: string,
    query: Record<string, any>
): Promise<IGenericResponse<Review[]>> => {
    const queryBuilder = new QueryBuilder(prisma.review, query);

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

export const reviewService = {
    createReviewIntoDB,
    getProductReviewsFromDB,
};