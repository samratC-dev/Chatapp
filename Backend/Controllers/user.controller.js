import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import createTokenandSaveCookie from "../jwt/generateToken.js";
 export const signup= async (req,res)=>{
    const{username,email,password,confirmPassword}=req.body;
    try {
        if(password!==confirmPassword){
        return res.status(400).json({error:"Passwords do not match"}) 
    }
    const user= await User.findOne({email})
    if(user){
        return res.status(400).json({error:"User already exists" })
    }
    const salt= await bcrypt.genSalt(10)
    const hashedPassword= await bcrypt.hash(password,salt)
    const newUser= await new User({
        username,
        email,
        password: hashedPassword,
    }) 
     await newUser.save()
     if(newUser){
         createTokenandSaveCookie(newUser._id,res)
         return res.status(201).json({message:"User created successfully", user:{
            _id:newUser._id,
            username:newUser.username,
            email:newUser.email
         }})

     }
     
    } catch (error) {
        console.log(error)
        return res.status(500).json({error:"Internal server error"})
        
    }      
}
export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })

       
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        console.log("Password match:", ismatch)

        if (!ismatch) {
            return res.status(400).json({ error: "Invalid credentials" })
        }

        createTokenandSaveCookie(user._id, res)
        return res.status(200).json({ message: "Login successful", user })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}
export const logout = async (req,res)=>{
    try {
        res.clearCookie("jwt")
        return res.status(200).json({message:"Logout successful"})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: "Internal server error" })
        
    }

}
export const allUsers=async(req,res)=>{
    try {
        const LoggedInuser=req.user._id
        const filteredUsers=await User.find({_id:{$ne:LoggedInuser}}).select("-password")
        res.status(201).json(filteredUsers)
        
    } catch (error) {
        console.log("error in allUsers controller:"+error)
        
    }

}
