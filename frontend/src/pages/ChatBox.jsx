import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Stethoscope } from "lucide-react";
import api from "../services/api";

const ChatBox = () => {
  const user = useSelector((state) => state.auth.user);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      message:
        "Hi, this is a secure medical chat. Please avoid sharing passwords or sensitive IDs.",
      sender: "system",
      self: false,
    },
  ]);
  const [sending, setSending] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim() || !user) return;

    const userMessage = message;
    setMessage("");
    setSending(true);

    setMessages((prev) => [
      ...prev,
      {
        message: userMessage,
        sender: user.role,
        self: true,
      },
    ]);

    try {
      const res = await api.post("/chat", { message: userMessage });

      setMessages((prev) => [
        ...prev,
        {
          message: res.data.text,
          sender: "ai",
          self: false,
        },
      ]);
    } catch (error) {
      console.log(error);
      setMessages((prev) => [
        ...prev,
        {
          message: "Currently AI is not responding. Please try again later.",
          sender: "ai",
          self: false,
        },
      ]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl border shadow-sm">
      {/* Header */}
      <div className="px-5 py-3 border-b bg-gradient-to-r from-teal-600 to-blue-600 rounded-t-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-sm font-semibold text-white">
              {user?.role === "doctor" ? "Chat with patient" : "Chat with doctor"}
            </h2>
            <p className="text-[11px] text-teal-100">
              Encrypted, doctor–patient conversation
            </p>
          </div>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-300 animate-pulse" />
      </div>

      {/* Messages */}
      <div className="flex-1 p-5 space-y-3 overflow-y-auto bg-gradient-to-b from-teal-50 via-white to-blue-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.self ? "justify-end" : "justify-start"
            } text-sm`}
          >
            <div
              className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-sm ${
                msg.self
                  ? "bg-teal-600 text-white rounded-br-none"
                  : msg.sender === "system"
                  ? "bg-gray-100 text-gray-700 rounded-xl text-xs"
                  : "bg-white border text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.message}
            </div>
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
          placeholder="Type a medical question or update…"
          className="flex-1 px-4 py-2 rounded-xl border text-sm
        focus:outline-none focus:ring-2 focus:ring-teal-400"
        />
        <button
          disabled={sending}
          className="px-6 py-2 rounded-xl bg-teal-600 text-white font-medium
        hover:bg-teal-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {sending ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

export default ChatBox;
