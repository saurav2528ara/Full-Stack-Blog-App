import jwt from 'jsonwebtoken';
import UserModel from '../models/user.js';

const isAdmin = async(req,res,next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Unathorized: No token provided'});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId)
        
        if (!user) {
            return res.status(403).json({ success:false, message: 'Unauthorized: User not found'});
        }
        if (user.role != 'admin') {
            return res.status(403).json({success:false, message: 'Unauthorized: User is not an Admin'});
        }
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
const isLogin = async(req,res,next) => {
    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(401).json({ message: 'Unathorized: No token provided'});
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        const user = await UserModel.findById(decoded.userId)
        
        if (!user) {
            return res.status(403).json({ success:false, message: 'Unauthorized: User not found'});
        }
        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}

export {isAdmin,isLogin};

