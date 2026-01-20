import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  verifyPaymentAPI,
} from "../../services/paymentService";


export const createPaymentOrder = createAsyncThunk(
  "payment/createOrder",
  async ({ appointmentId }, { rejectWithValue }) => {
    try {
     
      return await createOrderAPI(appointmentId);
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const verifyPayment = createAsyncThunk(
    "payment/verify",
    async(paymentData)=>{
        return await verifyPaymentAPI(paymentData);
    }
)


const initialState = {
    loading:false,
    success:false,
    error:null,
}

const paymentSlice = createSlice({
    name:"payment",
    initialState,
    reducers:{
        resetPaymentState:(state)=>{
            state.loading = false;
            state.success = false;
            state.error = null;
        },
    },

    extraReducers:(builder)=>{
        builder
        .addCase(createPaymentOrder.pending,(state)=>{
            state.loading = true;
        })
        .addCase(createPaymentOrder.fulfilled,(state)=>{
            state.loading = false;
        })
        .addCase(verifyPayment.fulfilled,(state)=>{
            state.loading = false;
            state.success = true;
        })
        .addCase(verifyPayment.rejected,(state,action)=>{
            state.loading = false;
            state.error = action.error.message;
        });
    },
})


export const { resetPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;