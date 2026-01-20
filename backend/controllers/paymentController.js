import crypto from "crypto";
import Razorpay from "razorpay";
import { RAZORPAY_KEY_SECRET ,RAZORPAY_KEY_ID} from "../env.js";
import Appointment from "../models/appointmentModel.js";
import Payment from "../models/paymentModel.js";
import { getIO } from "../services/socket.js";


const razorpay = new Razorpay({
    key_id:RAZORPAY_KEY_ID,
    key_secret:RAZORPAY_KEY_SECRET,
})


export const createOrder = async(req,res)=>{
    try{
        const {appointmentId} = req.body;

        const appointment = await Appointment.findById(appointmentId);

        if(!appointment){
            return res.status(404).json({message:"Appointment not Found"});
        }

        const options = {
            amount:appointment.fee*100,
            currency:"INR",
            receipt:`receipt_${appointmentId}`,
        }
        
        const order = await razorpay.orders.create(options);
        //we have to set razor pay credentials hence error occur 
       
        await Payment.create({
            user:req.user._id,
            appointment:appointmentId,
            orderId:order.id,
            amount:appointment.fee,
        });

        res.json({
            orderId: order.id,
            amount: options.amount,
            currency: "INR",
            key: RAZORPAY_KEY_ID,
        });

    }catch(error){
        console.log(error);
        res.status(500).json({message:error.message});
    }
}


export const verifyPayment = async(req,res)=>{
    try{
        const {
           razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            appointmentId,
        } = req.body;
        
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto.createHmac("sha256",RAZORPAY_KEY_SECRET).update(body).digest("hex");

        if(expectedSignature !== razorpay_signature){
            return res.status(400).json({message:"Invalid Payment Signature" });
        }

        await Payment.findOneAndUpdate(
            {orderId:razorpay_order_id},
            {
                paymentId:razorpay_payment_id,
                signature:razorpay_signature,
                status:"paid",
            }
        );

        const appointment = await Appointment.findByIdAndUpdate(appointmentId,{
            status:"confirmed",paymentStatus:"paid"
        },{new:true})

        const io = getIO();
        io.to(`doctor_${appointment.doctor}`).emit("appointment:paid", {
            message: "Appointment payment completed",
            appointmentId: appointment._id,
        });

        res.json({ message: "Payment verified and appointment confirmed" });
    }catch(error){
         res.status(500).json({ message: error.message });
    }
}