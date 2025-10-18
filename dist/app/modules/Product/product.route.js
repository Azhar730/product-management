"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = require("./product.controller");
const fileUploader_1 = require("../../../helpers/fileUploader");
const textToJsonParser_1 = __importDefault(require("../../middlewares/textToJsonParser"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const router = (0, express_1.Router)();
router.post("/create", (0, auth_1.default)(client_1.UserRole.SELLER), fileUploader_1.fileUploader.upload.single("file"), textToJsonParser_1.default, product_controller_1.ProductControllers.createProduct);
router.get("/", product_controller_1.ProductControllers.getAllProducts);
router.get("/seller-products", (0, auth_1.default)(client_1.UserRole.SELLER), product_controller_1.ProductControllers.getSellerProducts);
router.patch("/:productId", (0, auth_1.default)(client_1.UserRole.SELLER), fileUploader_1.fileUploader.upload.single("file"), textToJsonParser_1.default, product_controller_1.ProductControllers.updateProduct);
router.delete("/:productId", (0, auth_1.default)(client_1.UserRole.SELLER), product_controller_1.ProductControllers.deleteProduct);
exports.ProductRoutes = router;
//# sourceMappingURL=product.route.js.map