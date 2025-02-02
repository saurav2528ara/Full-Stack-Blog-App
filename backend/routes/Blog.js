import express from 'express';
import { Create, deletePost, getposts, update } from '../controllers/Blog.js';
import { isAdmin } from '../middleware/isAdmin.js';
import upload from '../middleware/Multer.js';


const BlogRoutes = express.Router();
BlogRoutes.post('/create',isAdmin,upload.single('postimage'),Create);
BlogRoutes.delete('/delete/:id',isAdmin,deletePost);
BlogRoutes.get('/getposts',getposts);
BlogRoutes.patch('/update/:id',isAdmin,upload.single('postimage'),update);


export default BlogRoutes;