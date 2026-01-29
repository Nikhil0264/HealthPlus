import React from 'react'
import { getSocket } from '../features/socket/socketSlice';
import VideoCall from '../pages/VideoCall';
import { useEffect } from 'react';
import { useState } from 'react';

const IncomindCall = () => {
    const [incomingCall,setIncomingCall] = useState();
    const socket = getSocket();
    useEffect(()=>{
        

        socket.on("incoming-video-call",({caller})=>{
            setIncomingCall(caller);
        })

        socket.on("video-call-accepted",()=>{
            <VideoCall/>
        })

        socket.on("video-call-rejected",()=>{
            alert("call rejected");
            setIncomingCall(null);
        });

        return () => {
            socket.off("incomming-video-call");
            socket.off("video-call-accepted");
            socket.off("video-call-rejected");
        };
    },[])
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl">
        <h2 className="text-lg font-bold">
          {caller.name} is calling 📞
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() =>
              socket.emit("accept-video-call", { roomId })
            }
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Accept
          </button>

          <button
            onClick={() =>
              socket.emit("reject-video-call", { roomId })
            }
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncomindCall
