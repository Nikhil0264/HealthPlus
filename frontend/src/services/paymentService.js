import api from "./api";


export const createOrderAPI = async(appointmentId) =>{
    try{
    
        const res = await api.post("/payments/create-order",{appointmentId});
        console.log(res)
        return res.data;
    }catch(error){
        console.log(error);
        alert("not creating order");
    }
}


export const verifyPaymentAPI = async(paymentData) =>{
    const res = await api.post("/payments/verify",paymentData);
    return res.data;
}

