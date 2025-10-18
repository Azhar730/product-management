"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_validation_1 = require("./auth.validation");
const validateRequest_1 = require("../../middlewares/validateRequest");
const router = (0, express_1.Router)();
// login
router.post("/login", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidator.login), auth_controller_1.AuthControllers.loginUser);
// refresh token
router.post("/refresh-token", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidator.refreshToken), auth_controller_1.AuthControllers.refreshToken);
// change password (must be logged in)
router.post("/change-password", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidator.changePassword), auth_controller_1.AuthControllers.changePassword);
// forgot password (send OTP)
router.post("/forgot-password", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidator.forgotPassword), auth_controller_1.AuthControllers.forgotPassword);
// reset password (with OTP)
router.post("/reset-password", (0, validateRequest_1.validateRequest)(auth_validation_1.AuthValidator.resetPasswordValidation), auth_controller_1.AuthControllers.resetPassword);
exports.AuthRoutes = router;
//# sourceMappingURL=auth.route.js.map