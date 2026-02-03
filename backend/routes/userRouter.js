import express from 'express';
import { Protect } from '../middlewares/authMiddleware.js';
import { getDoctor } from '../controllers/userControllers.js';
import { chatWithAi } from '../controllers/chatController.js';

const userRouter = express.Router();
userRouter.get('/users/doctors',Protect,getDoctor)
userRouter.post('/chat',chatWithAi)

export default userRouter;