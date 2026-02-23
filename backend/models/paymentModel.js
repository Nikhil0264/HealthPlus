import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
    },
    orderId: String,
    paymentId: String,
    signature: String,
    amount: Number,
    status: {
        type: String,
        enum: ["created", "paid", "failed"],
        default: "created",
    },
}, {
    timestamps: true
});

const Payment = mongoose.model("Payment", paymentSchema);

export default Payment;