import express from 'express';
import { Protect } from '../middlewares/authMiddleware.js';
import { getDoctor } from '../controllers/userControllers.js';

const userRouter = express.Router();
userRouter.get('/users/doctors',Protect,getDoctor)


export default userRouter;