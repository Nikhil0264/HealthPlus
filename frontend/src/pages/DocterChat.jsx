import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../features/socket/socketSlice";

const DoctorChat = ({ roomId, patient }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth);
  const doctor = authUser.user;

  useEffect(() => {
    dispatch(connectSocket(authUser.token));
    const socket = getSocket();
    if (!socket) return;

    const onConnect = () => {
      socket.emit("join-room", {
        roomId,
        userId: doctor._id,
        name: doctor.name,
        role: "doctor",
      });
    };

    socket.on("connect", onConnect);

    socket.on("receive-message", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("receive-message");
    };
  }, [dispatch, authUser.token, roomId, doctor._id, doctor.name]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const socket = getSocket();
    if (!socket) return;

    socket.emit("send-message", {
      roomId,
      senderId: doctor._id,
      senderName: doctor.name,
      role: "doctor",
      text: message,
      time: new Date().toISOString(),
    });

    setMessage("");
  };

  return (
    <div className="flex flex-col h-full bg-[#efeae2]">

      {/* HEADER */}
      <div className="h-16 bg-[#075e54] text-white flex items-center px-4 shadow">
        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center font-bold">
          <p>patient</p>
        </div>
        <div className="ml-3">
          <p className="font-semibold">{patient.name}</p>
          <p className="text-xs text-white/70">patient</p>
        </div>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
        {messages.map((msg, index) => {
          const isMe = msg.senderId === doctor._id;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] px-3 py-2 rounded-lg text-sm shadow
                  ${isMe
                    ? "bg-[#dcf8c6] rounded-tr-none"
                    : "bg-white rounded-tl-none"
                  }`}
              >
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
          className="flex-1 bg-white rounded-full px-4 py-2 outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-[#075e54] text-white w-10 h-10 rounded-full"
        >
          ➤
        </button>
      </div>
    </div>
  );
};

export default DoctorChat;
