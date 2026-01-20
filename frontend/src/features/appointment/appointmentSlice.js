import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../services/api";

export const fetchAppointments = createAsyncThunk(
    "appointment/fetch",
    async()=>{
        const res = await api.get("/appointments");
        return res.data;
    }
);

const appointmentSlice = createSlice({
    name:"appointments",
    initialState:{
        list:[],
        loading:false,
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchAppointments.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchAppointments.fulfilled,(state,action)=>{
            state.loading = false;
            state.list = action.payload;
        });
    }
})

export default appointmentSlice.reducer;