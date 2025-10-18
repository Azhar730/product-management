import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserServices } from "./user.service";
import httpStatus from "http-status";
 
const registerUser = catchAsync(async (req, res) => {
    const result = await UserServices.registerUserIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.CREATED,
        success: true,
        message: `User registered successfully`,
        data: result,
    });
})

const getAllUser = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `Users retrieved successfully`,
        meta: result.meta,
        data: result.data,
    });
})

const userProfile = catchAsync(async (req, res) => {
    const user = req.user as JwtPayload
    const result = await UserServices.userProfile(user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "User profile retrieved successfully",
        data: result,
    });
})

const updateProfile = catchAsync(async (req, res) => {
    const user = req.user as JwtPayload
    const result = await UserServices.updateProfile(req.body, user);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Profile updated successfully",
        data: result,
    });
})
const updateUserRole = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;
    const result = await UserServices.updateUserRole(id as string, role);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: `User is ${role} successfully`,
        data: result,
    });
})

export const UserController = {
    registerUser,
    getAllUser,
    userProfile,
    updateProfile,
    updateUserRole
}
 