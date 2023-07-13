import jwt from "jsonwebtoken"
import { User } from "../models/userModal.js"

export const isAuth = async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
            return res.status(404).json({
                success:false,
                message:"Login first"
            })
    }

    const decoded = jwt.verify(token,process.env.SECRET_KEY)

   req.user = await User.findById(decoded._id)
   next();
}