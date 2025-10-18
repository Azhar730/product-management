import { User, UserRole } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IGenericResponse } from "../../../interfaces/common";
import QueryBuilder from "../../../helpers/queryBuilder";
import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";


const registerUserIntoDB = async (payload: User) => {
    // 1. Check if user exists
    const existingUser = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (existingUser) {
        throw new ApiError(httpStatus.CONFLICT, "User already exists");
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(payload.password, 12);
    payload.password = hashedPassword;

    // 5. Save user in DB (unverified)
    const result = await prisma.user.create({ data: payload });
    return result
}

const getAllUserFromDB = async (query: Record<string, any>): Promise<IGenericResponse<User[]>> => {
    const queryBuilder = new QueryBuilder(prisma.user, query);
    const users = await queryBuilder
        .range()
        .search(["name"])
        .filter()
        .sort()
        .paginate()
        .fields()
        .execute();
    const meta = await queryBuilder.countTotal();
    return { meta, data: users }
}
const userProfile = async (user: JwtPayload) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })
    if (!userExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    const result = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })
    return result
}
const updateProfile = async (payload: Partial<User>, user: JwtPayload) => {
    const userExists = await prisma.user.findUnique({
        where: {
            email: user.email
        }
    })
    if (!userExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    const result = await prisma.user.update({
        where: {
            email: user.email
        },
        data: payload
    })
    return result;
}
const updateUserRole = async (id: string, role: UserRole) => {
    const userExists = await prisma.user.findUnique({
        where: {
            id
        }
    })
    if (!userExists) {
        throw new ApiError(httpStatus.NOT_FOUND, "User not found")
    }
    const result = await prisma.user.update({
        where: {
            id
        },
        data: {
            role
        }
    })
    return result;
}

export const UserServices = {
    registerUserIntoDB,
    getAllUserFromDB,
    updateProfile,
    updateUserRole,
    userProfile
}