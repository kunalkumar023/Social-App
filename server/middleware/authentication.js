import User from "../models/User.js"
import jwt from "jsonwebtoken"
export const authentication=async(req,res,next)=>{

    const {token} = req.cookies;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"Please login first.."
        })
    }

    const decode = jwt.verify(token,process.env.KEY)

    req.user = await User.findById(decode._id)
    next()
}   