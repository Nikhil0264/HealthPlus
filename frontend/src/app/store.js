import {configureStore} from '@reduxjs/toolkit';
import authReducer from "../features/auth/authSlice.js";
import socketReducer from "../features/socket/socketSlice.js";
import appointmentReducer from "../features/appointment/appointmentSlice.js";
import paymentReducer from "../features/payment/paymentSlice.js";
import notificationReducer from "../features/notification/notificationSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer,
        socket:socketReducer,
        appointments:appointmentReducer,
        payment: paymentReducer,
        notification: notificationReducer,
    },
})