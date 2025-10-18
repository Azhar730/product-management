import { JwtPayload } from "jsonwebtoken";
interface ChangePasswordPayload {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}
export declare const AuthServices: {
    loginUser: (payload: {
        email: string;
        password: string;
    }) => Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
            name: string;
            email: string;
            role: import("@prisma/client").$Enums.UserRole;
            createdAt: Date;
        };
    } | undefined>;
    refreshToken: (token: string) => Promise<{
        accessToken: string;
    }>;
    changePassword: (user: JwtPayload, payload: ChangePasswordPayload) => Promise<{
        message: string;
    }>;
    forgotPassword: (payload: {
        email: string;
    }) => Promise<void>;
    resetPassword: (payload: {
        token: string;
        newPassword: string;
    }) => Promise<{
        message: string;
    }>;
};
export {};
//# sourceMappingURL=auth.service.d.ts.map