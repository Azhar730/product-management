"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const registerUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.registerUserIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: `User registered successfully`,
        data: result,
    });
});
const registerSeller = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.registerSellerIntoDB(req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: `Seller registered successfully`,
        data: result,
    });
});
const getAllUser = (0, catchAsync_1.default)(async (req, res) => {
    const result = await user_service_1.UserServices.getAllUserFromDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `Users retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
});
const userProfile = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await user_service_1.UserServices.userProfile(user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
});
const updateProfile = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await user_service_1.UserServices.updateProfile(req.body, user);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
});
const updateUserRole = (0, catchAsync_1.default)(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await user_service_1.UserServices.updateUserRole(id, role);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: `User is ${role} successfully`,
        data: result,
    });
});
exports.UserController = {
    registerUser,
    getAllUser,
    userProfile,
    updateProfile,
    updateUserRole,
    registerSeller
};
//# sourceMappingURL=user.controller.js.map