import express from "express"
import {registerUser,loginUser,logoutUser,  getAllUsers, getMyProfile } from "../controllers/user.js";
import {isAuth} from "../middleware/auth.js"


const router = express.Router()

router.get("/all",getAllUsers)

router.get("/profile", isAuth ,getMyProfile)

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/logout",logoutUser)


export default router;