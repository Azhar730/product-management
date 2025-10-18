"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const product_service_1 = require("./product.service");
const http_status_1 = __importDefault(require("http-status"));
const createProduct = (0, catchAsync_1.default)(async (req, res) => {
    const file = req.file;
    const user = req.user;
    const result = await product_service_1.ProductServices.createProductIntoDB(req.body, file, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: `Product created successfully`,
        data: result,
    });
});
const getAllProducts = (0, catchAsync_1.default)(async (req, res) => {
    const result = await product_service_1.ProductServices.getAllProductsFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Products are retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
});
const getSellerProducts = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await product_service_1.ProductServices.getSellerProductsFromDB(user, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Seller products are retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
});
const updateProduct = (0, catchAsync_1.default)(async (req, res) => {
    const file = req.file;
    const { productId } = req.params;
    const user = req.user;
    const result = await product_service_1.ProductServices.updateProductIntoDB(productId, req.body, user, file);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Product updated successfully`,
        data: result
    });
});
const deleteProduct = (0, catchAsync_1.default)(async (req, res) => {
    const { productId } = req.params;
    const user = req.user;
    const result = await product_service_1.ProductServices.deleteProductFromDB(productId, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Product deleted successfully`,
        data: result
    });
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSellerProducts,
    updateProduct,
    deleteProduct
};
//# sourceMappingURL=product.controller.js.map