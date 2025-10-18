"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_service_1 = require("./order.service");
// Create a new order
const createOrder = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await order_service_1.OrderServices.createOrderIntoDB(user, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.CREATED,
        success: true,
        message: "Order created successfully",
        data: result,
    });
});
// ✅ Get all orders for logged-in user
const getMyOrders = (0, catchAsync_1.default)(async (req, res) => {
    const user = req.user;
    const result = await order_service_1.OrderServices.getMyOrdersFromDB(user, req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Orders retrieved successfully",
        meta: result.meta,
        data: result.data,
    });
});
exports.OrderControllers = {
    createOrder,
    getMyOrders,
};
//# sourceMappingURL=order.controller.js.map