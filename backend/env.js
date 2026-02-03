import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT
export const MONGODB_URI = process.env.MONGODB_URI 
export const JWT_SECRET = process.env.JWT_SECRET
export const RAZORPAY_KEY_ID = process.env.RAZORPAY_KEY_ID
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET
export const AI_CHAT_KEY = process.env.AI_CHAT_KEY