"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const client_1 = require("@prisma/client");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const queryBuilder_1 = __importDefault(require("../../../helpers/queryBuilder"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const registerUserIntoDB = async (payload) => {
    // 1. Check if user exists
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "User already exists");
    }
    // 3. Hash password
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashedPassword;
    // 5. Save user in DB (unverified)
    const result = await prisma_1.default.user.create({ data: payload });
    return result;
};
const registerSellerIntoDB = async (payload) => {
    // 1. Check if user exists
    const existingUser = await prisma_1.default.user.findUnique({
        where: { email: payload.email },
    });
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "User already exists");
    }
    // 3. Hash password
    const hashedPassword = await bcrypt_1.default.hash(payload.password, 12);
    payload.password = hashedPassword;
    // 4. Set role to SELLER
    payload.role = client_1.UserRole.SELLER;
    // 5. Save user in DB (unverified)
    const result = await prisma_1.default.user.create({ data: payload });
    return result;
};
const getAllUserFromDB = async (query) => {
    const queryBuilder = new queryBuilder_1.default(prisma_1.default.user, query);
    const users = await queryBuilder
        .range()
        .search(["name"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute();
    const meta = await queryBuilder.countTotal();
    return { meta, data: users };
};
const userProfile = async (user) => {
    const userExists = await prisma_1.default.user.findUnique({
        where: {
            email: user.email
        }
    });
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = await prisma_1.default.user.findUnique({
        where: {
            email: user.email
        }
    });
    return result;
};
const updateProfile = async (payload, user) => {
    const userExists = await prisma_1.default.user.findUnique({
        where: {
            email: user.email
        }
    });
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = await prisma_1.default.user.update({
        where: {
            email: user.email
        },
        data: payload
    });
    return result;
};
const updateUserRole = async (id, role) => {
    const userExists = await prisma_1.default.user.findUnique({
        where: {
            id
        }
    });
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User not found");
    }
    const result = await prisma_1.default.user.update({
        where: {
            id
        },
        data: {
            role
        }
    });
    return result;
};
exports.UserServices = {
    registerUserIntoDB,
    registerSellerIntoDB,
    getAllUserFromDB,
    updateProfile,
    updateUserRole,
    userProfile
};
//# sourceMappingURL=user.service.js.map