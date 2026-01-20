import { createSlice } from "@reduxjs/toolkit";

const userFromStorage = localStorage.getItem("user")  //? JSON.parse(localStorage.getItem("user")): null;

const tokenFromStorage = localStorage.getItem("token") //|| null;

const initialState = {
    user:userFromStorage,
    token:tokenFromStorage,
    isAuthenticated: true,
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.user = action.payload.user;
            state.token = action.payload.token;
            state.isAuthenticated = true;

            localStorage.setItem("user", JSON.stringify(action.payload.user));

            localStorage.setItem("token", action.payload.token);
        },

        logout:(state)=>{
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.clear();
        },
    },
})

export const {login,logout} =  authSlice.actions;
export default authSlice.reducer;

