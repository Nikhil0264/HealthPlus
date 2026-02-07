import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../features/socket/socketSlice";
import api from "../services/api";

const ChatBox = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Listen for incoming messages ONLY

  const user = useSelector((state)=>state.auth.user)
  const sendMessage = async(e) => {
    e.preventDefault();
    console.log(message)
    if (!message.trim()) return;
    console.log(message)
    const userMessage = message;


    
    setMessages((prev) => [
      ...prev,
      {
        message,
        sender: user.role,
        self: true,
      },
    ]);

    setMessage("");
    try{
      const res = await api.post("/chat",{message:userMessage});

      setMessages((prev)=>[
        ...prev,{message:res.data.text,sender:"ai",self:"false"}
      ]);
      console.log("exectuation succesfully",res)
    }catch(error){
      console.log(error);
      setMessages((prev) =>[...prev,{message:"currently ai is not responding",sender:"ai",self:false}])
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border shadow-sm">
  
  {/* Header */}
  <div className="px-5 py-3 border-b bg-gradient-to-r from-teal-50 to-blue-50 rounded-t-2xl">
    <h2 className="text-lg font-semibold text-teal-800">
      {user.role === "doctor" ? "Patient Chat" : "Doctor Chat"}
    </h2>
    <p className="text-xs text-gray-500">
      Secure healthcare conversation
    </p>
  </div>

  {/* Messages */}
  <div className="flex-1 p-5 space-y-3 overflow-y-auto bg-gray-50">
    {messages.map((msg, index) => (
      <div
        key={index}
        className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
          msg.self
            ? "ml-auto bg-teal-600 text-white"
            : "mr-auto bg-white border text-gray-700"
        }`}
      >
        {msg.message}
      </div>
    ))}
  </div>

  {/* Input */}
  <form
    onSubmit={sendMessage}
    className="p-4 flex gap-3 border-t bg-white rounded-b-2xl"
  >
    <input
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      placeholder="Type your message…"
      className="flex-1 px-4 py-2 rounded-xl border
        focus:outline-none focus:ring-2 focus:ring-teal-400"
    />
    <button
      className="px-6 py-2 rounded-xl bg-teal-600 text-white font-medium
        hover:bg-teal-700 transition"
        onClick={sendMessage}
    >
      Send
    </button>
  </form>
</div>

  );
};

export default ChatBox;
