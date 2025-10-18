"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("./user.controller");
const textToJsonParser_1 = __importDefault(require("../../middlewares/textToJsonParser"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/register", user_controller_1.UserController.registerUser);
router.post("/register-seller", user_controller_1.UserController.registerSeller);
router.get("/", user_controller_1.UserController.getAllUser);
router.get("/profile", (0, auth_1.default)(client_1.UserRole.BUYER, client_1.UserRole.SELLER), user_controller_1.UserController.userProfile);
router.patch("/update-profile", (0, auth_1.default)(client_1.UserRole.BUYER, client_1.UserRole.SELLER), textToJsonParser_1.default, user_controller_1.UserController.updateProfile);
router.patch("/update-role/:id", user_controller_1.UserController.updateUserRole);
exports.UserRoutes = router;
//# sourceMappingURL=user.route.js.map