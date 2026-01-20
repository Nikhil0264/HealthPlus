import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../features/socket/socketSlice";
import { Video } from "lucide-react";
const SocketDashboard = ({ roomId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);

  useEffect(() => {
  dispatch(connectSocket(authUser.token));

  const socket = getSocket();
  if (!socket) return;

  const joinRoom = () => {

    socket.emit("join-room", {
      roomId,
      userId: user._id,
      name: user.name,
      role: user.role,
    });
  };

  if (socket.connected) {
    joinRoom();
  } else {
    socket.on("connect", joinRoom);
  }

  socket.on("receive-message", (data) => {
    setMessages((prev) => [...prev, data]);
  });

  return () => {
    socket.off("receive-message");
    socket.off("connect", joinRoom);
  };
}, [dispatch, authUser.token, roomId, user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("send-message", {
      roomId,
      senderId: user._id,
      senderName: user.name,
      role: user.role,
      text: message,
      time: new Date().toISOString(),
    });

    setMessage("");
  };

  const startVideoCall = ()=>{
    const socket = getSocket();
    if (!socket) return;

  } 

  return (
    <div className="flex flex-col h-full bg-[#efeae2]">

      {/* HEADER */}
      <div className="h-16 bg-[#075e54] text-white flex items-center px-4 shadow">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          {user.name?.[0]}
        </div>
        <div className="ml-3">
          <p className="font-semibold leading-none">
            {user.role === "doctor" ? "Patient" : "Doctor"}
          </p>
          <p className="text-xs text-white/70">online</p>
        </div>
        <button
    onClick={() => startVideoCall()}
    className="p-2 rounded-full hover:bg-white/20 transition"
    title="Start Video Call"
  >
    <Video size={22} />
  </button>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 bg-[url('/whatsapp-bg.png')]">
        {messages.map((msg, index) => {
          const isMe = msg.role === user.role;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`relative max-w-[75%] px-3 py-2 rounded-lg text-sm shadow
                  ${isMe
                    ? "bg-[#dcf8c6] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                  }`}
              >
                {!isMe && (
                  <p className="text-xs font-semibold text-green-700 mb-1">
                    {msg.senderName}
                  </p>
                )}

                <p>{msg.text}</p>

                <p className="text-[10px] text-gray-500 text-right mt-1">
                  {new Date(msg.time).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="h-16 bg-[#f0f0f0] flex items-center px-3 gap-2">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Type a message"
          className="flex-1 bg-white rounded-full px-4 py-2 outline-none shadow-sm"
        />
        <button
          onClick={sendMessage}
          className="bg-[#075e54] text-white w-10 h-10 rounded-full flex items-center justify-center"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default SocketDashboard;
