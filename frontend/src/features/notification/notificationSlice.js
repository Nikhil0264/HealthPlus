import { createSlice } from "@reduxjs/toolkit";



const notificationSlice = createSlice({
    name:"notification",
    initialState:{
        list:[],
        unreadCount:0,
    },
    reducers:{
        addNotification:(state,action)=>{
            state.list.unshift(action.payload);
            state.unreadCount += 1;
        },
        markAllAsRead:(state)=>{
            state.unreadCount = 0;
        },
        clearNotifications:(state)=>{
            state.list = [];
            state.unreadCount = 0;
        },

    }
})

export const {
  addNotification,
  markAllAsRead,
  clearNotifications,
} = notificationSlice.actions;

export default notificationSlice.reducer;