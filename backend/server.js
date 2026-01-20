import express from 'express';
import cors from 'cors'
import http from "http";

import { conncetDB } from './config/data.js';
import { PORT } from './env.js';
import {initSocket} from "./services/socket.js"
import authRouter from './routes/authRoutes.js';
import appointmentRouter from './routes/appointmentRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import userRouter from './routes/userRouter.js';

const app = express();


app.use(cors());
app.use(express.json());


const server = http.createServer(app);
initSocket(server);


app.use('/api/auth',authRouter);
app.use('/api/appointments',appointmentRouter);
app.use('/api/payments',paymentRouter)
app.use('/api',userRouter)


app.get('/',(req,res)=>{
    res.send("HelthPlus is in your service")
})


const startServer = async()=>{
    try{
        await conncetDB();
        server.listen(PORT,()=>{
            console.log(`Server is listening to Post : ${PORT}`)
        })
    }catch(error){
        console.log("Unable to Start server :",error)
    }
}
startServer();
