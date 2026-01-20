import { createSlice } from "@reduxjs/toolkit";
import {io} from "socket.io-client";

let socket;

const socketSlice = createSlice({
    name:"socket",
    initialState:{
        connected:false,
    },
    reducers:{
        connectSocket:(state,action)=>{
            if(!socket){
                socket = io("http://localhost:9000",{
                    auth:{
                        token:action.payload,
                    },
                });
                console.log(socket.id)
            }
            state.connected = true;
        },

        disconnectSocket:(state)=>{
            if(socket){
                socket.disconnect();
                socket = null;
            }
            state.connected = false;
        }

    }
})


export const { connectSocket, disconnectSocket } = socketSlice.actions;
export default socketSlice.reducer;

export const getSocket = () => socket;