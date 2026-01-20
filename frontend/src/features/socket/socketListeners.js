import { fetchAppointments } from "../appointment/appointmentSlice";
import { addNotification } from "../notification/notificationSlice";
import { getSocket } from "./socketSlice"


export const registerSocketListeners = (dispatch)=>{
    const socket = getSocket();
    if(!socket) return;

    socket.on("appointment:new",(data)=>{
        dispatch(addNotification({ message: data.message }));
        dispatch(fetchAppointments());
    });

    socket.on("appointment:update",(data)=>{
        dispatch(addNotification({ message: data.message }));
        dispatch(fetchAppointments());
    })

    socket.on("appointment:paid",(data)=>{
        dispatch(addNotification({ message: data.message }));
        dispatch(fetchAppointments());
    })
}