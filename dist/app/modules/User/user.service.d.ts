import { User, UserRole } from "@prisma/client";
import { IGenericResponse } from "../../../interfaces/common";
import { JwtPayload } from "jsonwebtoken";
export declare const UserServices: {
    registerUserIntoDB: (payload: User) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    registerSellerIntoDB: (payload: User) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllUserFromDB: (query: Record<string, any>) => Promise<IGenericResponse<User[]>>;
    updateProfile: (payload: Partial<User>, user: JwtPayload) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateUserRole: (id: string, role: UserRole) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    }>;
    userProfile: (user: JwtPayload) => Promise<{
        name: string;
        id: string;
        email: string;
        password: string;
        role: import("@prisma/client").$Enums.UserRole;
        createdAt: Date;
        updatedAt: Date;
    } | null>;
};
//# sourceMappingURL=user.service.d.ts.map