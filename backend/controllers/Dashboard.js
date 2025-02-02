import PostModel from "../models/Blog.js";
import UserModel from "../models/user.js";
import CommentModel from "../models/comments.js";
import fs from 'fs';
import path from 'path';



const Getalldata = async(req, res) => {
    try {
        const Users = await UserModel.find();
        const Posts = await PostModel.find();
        const Comments= await CommentModel.find();

        if (!Users && !Posts) {
            return res.status(404).json({success:false,message:"Not Data Found"});

        }
    res.status(200).json({success:true, Users,Posts,Comments});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}

const GetUser = async(req, res) => {
    try {
        const Users = await UserModel.find();

        if (!Users) {
            return res.status(404).json({success:false,message:"Not Data Found"});

        }
    res.status(200).json({success:true, Users});
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false,message:"Internal server error"});
        
    }
}
const Userdelete = async (req, res) => {
    try {
        const userId = req.params.id;

        console.log('Received userId:', userId); // Debug log

        // Check if the user exists
        const ExistUser = await UserModel.findById(userId);
        if (!ExistUser) {
            return res.status(404).json({ success: false, message: "No User Found" });
        }

        // Prevent deletion of admin users
        if (ExistUser.role === 'admin') {
            return res.status(403).json({ success: false, message: "Sorry, you are an Admin. You can't delete your account." });
        }

        // Check and delete profile image if it exists
        if (ExistUser.profile) {
            const profilePath = path.join('public/images', ExistUser.profile);
            try {
                await fs.promises.unlink(profilePath);
                console.log('Profile image deleted');
            } catch (error) {
                console.log('Error deleting profile image:', error);
            }
        }

        // Delete the user from the database
        const result = await UserModel.findByIdAndDelete(userId);

        if (result) {
            console.log('User deleted:', result); // Debug log
            return res.status(200).json({ success: true, message: 'User deleted successfully' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to delete user' });
        }
    } catch (error) {
        console.log('Error:', error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};


export {Getalldata,GetUser,Userdelete};
// http://localhost:8000/dashboard