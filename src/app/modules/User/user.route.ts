import { Router } from "express"
import { UserController } from "./user.controller"
import { fileUploader } from "../../../helpers/fileUploader"
import textToJSONParser from "../../middlewares/textToJsonParser"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router = Router()

router.post("/register", fileUploader.upload.single("file"), textToJSONParser, UserController.registerUser)
router.get("/", UserController.getAllUser)
router.get("/profile", auth(UserRole.BUYER, UserRole.SELLER), UserController.userProfile)
router.patch("/update-profile", auth(UserRole.BUYER, UserRole.SELLER), textToJSONParser, UserController.updateProfile)
router.patch("/update-role/:id", UserController.updateUserRole)

export const UserRoutes = router;