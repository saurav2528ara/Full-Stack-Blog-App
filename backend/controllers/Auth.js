import UserModel from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const Register = async(req, res) => {
    try {
        const {FullName,email,password}=req.body;

        const existUser=await UserModel.find({email});
        if (!existUser) {
            return res.status(303).json({success:false,message:"User already Exist Please Login"})
        }
        const imagePath = req.file.filename;
        const haspassword = await bcrypt.hashSync(password,10);
        const NewUser = new UserModel({
            FullName,email,password:haspassword,profile:imagePath
        })
        
        await NewUser.save()
        return res.status(200).json({success:true,message:"User Register Successfully",user:NewUser})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"})
        
    }
}
const Login = async(req, res) => {
    try {
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(400).json({success:false,message:"All fields are required"});
        }
        const FindUser = await UserModel.findOne({email});

        if(!FindUser) {
            return res.status(400).json({success:false, message: "No user found please register"});

        }
        const comparepassword = await bcrypt.compare(password, FindUser.password);
        if(!comparepassword) {
            return res.status(400).json({success:false, message: "Invalid Password"});
        }
        const token=jwt.sign({userId:FindUser._id},process.env.JWT_SECRET)
        res.cookie('token',token,{
            httpOnly: true,
            secure: false,
            maxAge: 3 * 24 * 60 * 60 * 100
            // After 3 days token will expre
        })
        res.status(200).json({success:true,message:"login successfully",user:FindUser,token});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
const Logout = async(req, res) => {
    try {
        res.clearCookie('token')
        res.status(200).json({success:true,message:"logout successfully"});

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
export {Register, Login, Logout} 
