import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    patient:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    doctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    dateTime:Date,
    status:{
        type:String,
        enum:["pending","confirmed","completed"],
        default:"pending"
    },
    fee:{
        type:Number,
    },
    paymentStatus:{
        type:String,
        enum:["pending","paid"],
        default:"pending",
    }
},{timestamps:true});

const Appointment = mongoose.model("Appointment",appointmentSchema)

export default Appointment;
