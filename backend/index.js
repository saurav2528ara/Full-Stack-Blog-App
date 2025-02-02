import express from "express";
import dotenv from 'dotenv';
import DBCon from "./utils/db.js";
import AuthRoutes from "./routes/Auth.js";
import cookieParser from "cookie-parser";
import BlogsRoutes from "./routes/Blog.js";
import DashboardRoutes from "./routes/Dashboard.js";
import CommentsRoutes from "./routes/Comments.js";
import PublicRoutes from "./routes/Public.js";
import cors from 'cors';
dotenv.config();
const PORT = process.env.PORT;
const app = express();
const corsOptions = {
    origin:true,
    credentials:true
}

DBCon()
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.get('/', (req, res) => {
    res.send("hello from backend");
})
app.use('/auth',AuthRoutes);
app.use('/blog',BlogsRoutes);
app.use('/dashboard',DashboardRoutes);
app.use('/comment',CommentsRoutes);
app.use('/public', PublicRoutes);


app.listen(PORT, () => {
    console.log(`app is running PORT at ${PORT}`);
    
})