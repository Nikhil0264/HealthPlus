import Appointment from "../models/appointmentModel.js";
import { getIO } from "../services/socket.js";


export const createAppointment = async(req,res)=>{
    try{
        const {doctor,dateTime,fee} = req.body;
        if(!doctor || !dateTime ||!fee){
            return res.staus(400).json({message:"Provide All Values"});
        }

        const appointment = await Appointment.create({
            patient:req.user._id,
            doctor,
            dateTime,
            fee,
        });

        const io = getIO();
        io.to(`doctor_${doctor}`).emit("appointment:new",{
            message:"New appointment booked",
            appointmentId:appointment._id,
            patientId:req.user._id,
            dateTime,
        })

        res.status(201).json(appointment);
    }catch(error){
        res.status(500).json({message:error.message})
    }
}


export const getAppointments = async(req,res)=>{
    const filter = req.user.role === "doctor" ? {doctor:req.user._id} : {patient:req.user._id};

    const appointments = await Appointment.find(filter).populate("patient doctor","name role");

    res.json(appointments);
}


export const updateAppointmentStatus = async(req,res)=>{
    try{
        const {status} = req.body;
        const appointmentId = req.params.id;

        if(!status){
            return res.status(400).json({message:"Status is required"});
        }

        const appointment = await Appointment.findById(appointmentId);
        if(!appointment){
            return res.status(404).json({message:"Appointment not found"});
        }

        appointment.status = status;
        await appointment.save();

        const io = getIO();
        io.to('patient_${appointment.patient}').emit("appointment:update",{
            meassage:`Your appointment is ${status},`,
            appointmentId:appointment._id,
            status,
        })
        res.json(appointment);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}