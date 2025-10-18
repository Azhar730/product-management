import { Product } from "@prisma/client";
import prisma from "../../../shared/prisma";
import { IFile } from "../../../interfaces/file";
import { fileUploader } from "../../../helpers/fileUploader";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IGenericResponse } from "../../../interfaces/common";
import QueryBuilder from "../../../helpers/queryBuilder";

const createProductIntoDB = async (payload: Product, file: IFile, user: JwtPayload): Promise<Product> => {
    if (file) {
        const uploadToCloudinary = await fileUploader?.uploadToCloudinary(file);
        payload.productImage = uploadToCloudinary?.secure_url ?? null;
    }
    payload.userId = user.id as string;
    const result = await prisma.product.create({ data: payload });
    return result;
}

const getAllProductsFromDB = async (
    query: Record<string, any>
): Promise<IGenericResponse<Product[]>> => {
    const queryBuilder = new QueryBuilder(prisma.product, query);

    const products = await queryBuilder
        .range()
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute();
    const meta = await queryBuilder.countTotal();

    return { meta, data: products };
};

const getSellerProductsFromDB = async (
    user: JwtPayload,
    query: Record<string, any>
): Promise<IGenericResponse<Product[]>> => {
    const queryBuilder = new QueryBuilder(prisma.product, query);

    const products = await queryBuilder
        .range()
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute({
            where: {
                userId: user.id as string, // seller-specific products
            },
        });

    const meta = await queryBuilder.countTotal();

    return { meta, data: products };
};

const updateProductIntoDB = async (id: string, payload: Partial<Product>, user: JwtPayload, file: IFile): Promise<Product> => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }
    if (product.userId !== user.id) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not allowed to update this product");
    }
    if (file) {
        const uploadToCloudinary = await fileUploader?.uploadToCloudinary(file);
        payload.productImage = uploadToCloudinary?.secure_url ?? null;
    }
    const result = await prisma.product.update({
        where: { id },
        data: payload,
    });
    return result;
}

const deleteProductFromDB = async (id: string, user: JwtPayload) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
        throw new ApiError(httpStatus.NOT_FOUND, "Product not found");
    }
    if (product.userId !== user.id) {
        throw new ApiError(httpStatus.FORBIDDEN, "You are not allowed to update this product");
    }
    await prisma.product.delete({
        where: { id },
    });
    return null
}

export const ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSellerProductsFromDB,
    updateProductIntoDB,
    deleteProductFromDB
}