import express from 'express';
import { allowRoles, Protect } from '../middlewares/authMiddleware.js';
import { createAppointment, getAppointments, updateAppointmentStatus } from '../controllers/appointmentController.js';

const appointmentRouter = express.Router();

appointmentRouter.post("/",Protect,allowRoles("patient"),createAppointment);
appointmentRouter.get('/',Protect,getAppointments);
appointmentRouter.put("/:id/status",Protect,allowRoles("doctor","admin"),updateAppointmentStatus);


export default appointmentRouter;