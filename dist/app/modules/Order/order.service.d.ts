import { Order } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";
import { IGenericResponse } from "../../../interfaces/common";
export declare const OrderServices: {
    createOrderIntoDB: (user: JwtPayload, payload: {
        productId: string;
        quantity: number;
    }) => Promise<Order>;
    getMyOrdersFromDB: (user: JwtPayload, query: Record<string, any>) => Promise<IGenericResponse<Order[]>>;
};
//# sourceMappingURL=order.service.d.ts.map