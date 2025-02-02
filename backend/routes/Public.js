// for identify user comments
import express from 'express';
import { GetSinglepost } from '../controllers/public.js';

const PublicRoutes = express.Router();

PublicRoutes.get('/singlepost/:id',GetSinglepost);

export default PublicRoutes;