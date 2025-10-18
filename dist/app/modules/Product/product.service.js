"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const fileUploader_1 = require("../../../helpers/fileUploader");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const queryBuilder_1 = __importDefault(require("../../../helpers/queryBuilder"));
const createProductIntoDB = async (payload, file, user) => {
    if (file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader?.uploadToCloudinary(file);
        payload.productImage = uploadToCloudinary?.secure_url ?? null;
    }
    payload.userId = user.id;
    const result = await prisma_1.default.product.create({ data: payload });
    return result;
};
const getAllProductsFromDB = async (query) => {
    const queryBuilder = new queryBuilder_1.default(prisma_1.default.product, query);
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
const getSellerProductsFromDB = async (user, query) => {
    const queryBuilder = new queryBuilder_1.default(prisma_1.default.product, query);
    const products = await queryBuilder
        .range()
        .search(["title", "description"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute({
        where: {
            userId: user.id, // seller-specific products
        },
    });
    const meta = await queryBuilder.countTotal();
    return { meta, data: products };
};
const updateProductIntoDB = async (id, payload, user, file) => {
    const product = await prisma_1.default.product.findUnique({ where: { id } });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    if (product.userId !== user.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not allowed to update this product");
    }
    if (file) {
        const uploadToCloudinary = await fileUploader_1.fileUploader?.uploadToCloudinary(file);
        payload.productImage = uploadToCloudinary?.secure_url ?? null;
    }
    const result = await prisma_1.default.product.update({
        where: { id },
        data: payload,
    });
    return result;
};
const deleteProductFromDB = async (id, user) => {
    const product = await prisma_1.default.product.findUnique({ where: { id } });
    if (!product) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "Product not found");
    }
    if (product.userId !== user.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not allowed to update this product");
    }
    await prisma_1.default.product.delete({
        where: { id },
    });
    return null;
};
exports.ProductServices = {
    createProductIntoDB,
    getAllProductsFromDB,
    getSellerProductsFromDB,
    updateProductIntoDB,
    deleteProductFromDB
};
//# sourceMappingURL=product.service.js.map