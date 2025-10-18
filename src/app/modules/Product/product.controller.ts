import { JwtPayload } from "jsonwebtoken";
import { IFile } from "../../../interfaces/file";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProductServices } from "./product.service";
import httpStatus from "http-status";

const createProduct = catchAsync(async (req, res) => {
    const file = req.file as IFile;
    const user = req.user as JwtPayload
    const result = await ProductServices.createProductIntoDB(req.body,file,user);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `Product created successfully`,
        data: result,
    });
})

const getAllProducts = catchAsync(async (req, res) => {
    const result = await ProductServices.getAllProductsFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Products are retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
})
const getSellerProducts = catchAsync(async (req, res) => {
    const user = req.user as JwtPayload
    const result = await ProductServices.getSellerProductsFromDB(user,req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Seller products are retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
})
const updateProduct = catchAsync(async (req, res) => {
    const file = req.file as IFile;
    const {productId} = req.params
    const user = req.user as JwtPayload
    const result = await ProductServices.updateProductIntoDB(productId as string,req.body,user,file);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Product updated successfully`,
        data: result
    });
})
const deleteProduct = catchAsync(async (req, res) => {
    const {productId} = req.params
    const user = req.user as JwtPayload
    const result = await ProductServices.deleteProductFromDB(productId as string,user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Product deleted successfully`,
        data: result
    });
})


export const ProductControllers = {
    createProduct,
    getAllProducts,
    getSellerProducts,
    updateProduct,
    deleteProduct
}