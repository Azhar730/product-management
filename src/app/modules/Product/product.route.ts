import { Router } from "express";
import { ProductControllers } from "./product.controller";
import { fileUploader } from "../../../helpers/fileUploader";
import textToJSONParser from "../../middlewares/textToJsonParser";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";

const router = Router()

router.post("/create", auth(UserRole.SELLER), fileUploader.upload.single("file"), textToJSONParser, ProductControllers.createProduct)
router.get("/", ProductControllers.getAllProducts)
router.get("/seller-products", auth(UserRole.SELLER), ProductControllers.getSellerProducts)
router.patch("/:productId", auth(UserRole.SELLER), fileUploader.upload.single("file"), textToJSONParser, ProductControllers.updateProduct)
router.delete("/:productId", auth(UserRole.SELLER), ProductControllers.deleteProduct)

export const ProductRoutes = router