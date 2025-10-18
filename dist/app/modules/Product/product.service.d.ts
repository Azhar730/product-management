import { Product } from "@prisma/client";
import { IFile } from "../../../interfaces/file";
import { JwtPayload } from "jsonwebtoken";
import { IGenericResponse } from "../../../interfaces/common";
export declare const ProductServices: {
    createProductIntoDB: (payload: Product, file: IFile, user: JwtPayload) => Promise<Product>;
    getAllProductsFromDB: (query: Record<string, any>) => Promise<IGenericResponse<Product[]>>;
    getSellerProductsFromDB: (user: JwtPayload, query: Record<string, any>) => Promise<IGenericResponse<Product[]>>;
    updateProductIntoDB: (id: string, payload: Partial<Product>, user: JwtPayload, file: IFile) => Promise<Product>;
    deleteProductFromDB: (id: string, user: JwtPayload) => Promise<null>;
};
//# sourceMappingURL=product.service.d.ts.map