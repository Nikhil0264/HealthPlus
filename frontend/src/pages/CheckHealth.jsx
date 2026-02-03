import React, { useState } from "react";
import { Bot, Send, X } from "lucide-react";

const CheckHealth = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hi 👋 I’m your AI health assistant. How can I help you today?"
    }
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", text: message }
    ]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Thanks for sharing. I can help you understand symptoms, but this doesn’t replace a doctor consultation."
        }
      ]);
    }, 800);

    setMessage("");
  };

  return (
    <div className="w-96 h-[520px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-gradient-to-r from-teal-600 to-blue-600 text-white flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <Bot className="w-5 h-5" />
            AI Health Assistant
          </h2>
          <p className="text-xs text-teal-100 mt-1">
            Ask about symptoms, precautions, or next steps
          </p>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/20 transition"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gradient-to-b from-teal-50 via-white to-blue-50">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] px-4 py-3 rounded-2xl text-sm shadow
                ${
                  msg.role === "user"
                    ? "bg-teal-600 text-white rounded-br-none"
                    : "bg-white text-gray-700 rounded-bl-none"
                }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center gap-2">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Describe your symptoms..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 
                       focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <button
            onClick={sendMessage}
            className="p-3 rounded-xl bg-teal-600 text-white 
                       hover:bg-teal-700 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

        <p className="mt-2 text-[11px] text-gray-400 text-center">
          This AI provides general health guidance, not medical diagnosis.
        </p>
      </div>
    </div>
  );
};

export default CheckHealth;
