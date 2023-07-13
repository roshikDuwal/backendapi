import { User } from "../models/userModal.js";
import bcrypt from "bcrypt"
import { sendCookie } from "../utils/cookie.js";
import Errorhandler from "../middleware/error.js";


export const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({});
        res.json({
            success: true,
            users
        })
    } catch (error) {
        next(error)
    }
}

export const getMyProfile = async (req, res) => {
    res.json({
        success: true,
        users: req.user
    })
}

export const registerUser = async (req, res,next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ email })


        if (user) return next(new Errorhandler("email already created", 409))

        const hashedpassword = await bcrypt.hash(password, 10)

        await User.create({
            name,
            email,
            password: hashedpassword
        })

        res.status(201).json({
            success: true,
            message: "User created successfully"
        })
    } catch (error) {
        next(error)
    }
}


export const loginUser = async (req, res,next) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select("+password")


        if (!user) return next(new Errorhandler("Invalid email or password", 404))

        const isMatched = await bcrypt.compare(password, user.password)

        if (!isMatched) return next(new Errorhandler("Password doesnot matched", 404))


        sendCookie(user, res, `Login Successfull , ${user.name}`, 200)
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res) => {
    res.status(200).cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now()),
        sameSite:process.env.NODE_ENV==="Development" ? "lax":"none", 
        secure:process.env.NODE_ENV==="Development" ? false:true,

    }).json({
        success: true,
        message: "Logout successfully",
    })
}



