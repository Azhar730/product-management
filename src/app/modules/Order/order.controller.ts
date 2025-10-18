import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderServices } from "./order.service";
import { JwtPayload } from "jsonwebtoken";

// Create a new order
const createOrder = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload
  const result = await OrderServices.createOrderIntoDB(user, req.body);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});

// ✅ Get all orders for logged-in user
const getMyOrders = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload
  const result = await OrderServices.getMyOrdersFromDB(user, req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders retrieved successfully",
    meta: result.meta,
    data: result.data,
  });
});

export const OrderControllers = {
  createOrder,
  getMyOrders,
};