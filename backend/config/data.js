import mongoose from 'mongoose';
import { MONGODB_URI } from '../env.js';
export const conncetDB = async()=>{
    try{
        await mongoose.connect(MONGODB_URI);
        console.log("Database connected successfully");
    }catch(error){
        console.log("Unable to connect to Database :",error);
    }
}