import jwt from "jsonwebtoken"
import User from "../Models/user.model.js"

const secureroute=async(req,res,next)=>{
    
    try {
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({error:"Unauthorized"})
        }
        const decoded=jwt.verify(token,process.env.JWT_TOKEN)
        if(!decoded){
            return res.status(401).json({error:"Unauthorized"})
        }
        const user=await User.findById(decoded.userid).select("-password")
        if (!user){
            return res.status(401).json({error:"user not found"})
        }
        req.user=user;
        next()

        
    } catch (error) {
        console.log("error is secureRoute:",error)
        res.status(500).json({error:"Internal server error"})
        
    }

}
export default secureroute
