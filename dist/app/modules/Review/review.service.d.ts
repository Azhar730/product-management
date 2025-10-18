import { Review } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { IGenericResponse } from "../../../interfaces/common";
export declare const reviewService: {
    createReviewIntoDB: (productId: string, user: JwtPayload, payload: Review) => Promise<Review>;
    getProductReviewsFromDB: (productId: string, query: Record<string, any>) => Promise<IGenericResponse<Review[]>>;
};
//# sourceMappingURL=review.service.d.ts.map