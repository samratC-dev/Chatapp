import jwt from "jsonwebtoken"
const createTokenandSaveCookie=(userid,res)=>{
    const token=jwt.sign({userid},process.env.JWT_TOKEN,{
        expiresIn:"15d"
    })
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true,
        sameSite:"none"
    }) 

}
export default createTokenandSaveCookie
