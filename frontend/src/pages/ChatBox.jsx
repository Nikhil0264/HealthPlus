import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getSocket } from '../features/socket/socketSlice'

const ChatBox = ({roomId}) => {
    const socket = useSelector(getSocket);
    const [message,setMessage] = useState('');
    const [msgs,setMsgs] = useState([]);

    const sendMessage = (e)=>{
        e.preventDefault();
        socket.emit("send-message",{message,roomId});
        console.log(msgs)
        setMessage("");
        socket.on("receive-message",(data)=>{ 
            setMsgs((prev)=>[...prev,data.message])
        })
    }
    
  return (
    <div>
        {msgs}
        <h1>My Name</h1>
        <input placeholder='Enter yout name' value={message} type='text' onChange={(e)=>setMessage(e.target.value)}/>
        {message}
        <button onClick={sendMessage}>send</button>
    </div>
  )
}

export default ChatBox
