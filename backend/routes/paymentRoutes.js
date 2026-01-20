import express from "express";
import {
  createOrder,
  verifyPayment,
} from "../controllers/paymentController.js";
import { Protect } from "../middlewares/authMiddleware.js";

const paymentRouter = express.Router();

paymentRouter.post("/create-order", Protect, createOrder);
paymentRouter.post("/verify", Protect, verifyPayment);

export default paymentRouter;
