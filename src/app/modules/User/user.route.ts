import { Router } from "express"
import { UserController } from "./user.controller"
import textToJSONParser from "../../middlewares/textToJsonParser"
import auth from "../../middlewares/auth"
import { UserRole } from "@prisma/client"

const router = Router()

router.post("/register", UserController.registerUser)
router.post("/register-seller", UserController.registerSeller)
router.get("/", UserController.getAllUser)
router.get("/profile", auth(UserRole.BUYER, UserRole.SELLER), UserController.userProfile)
router.patch("/update-profile", auth(UserRole.BUYER, UserRole.SELLER), textToJSONParser, UserController.updateProfile)
router.patch("/update-role/:id", UserController.updateUserRole)

export const UserRoutes = router;