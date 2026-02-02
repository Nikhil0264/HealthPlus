import React, { useEffect } from "react";
import { Video, ShieldCheck } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../features/socket/socketSlice";
import { useNavigate } from "react-router-dom";
import ChatBox from "./ChatBox";

const SocketDashboard = ({ roomId, user }) => {
  const token = useSelector((state) => state.auth.token);
  const socket = useSelector(getSocket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Connect socket
  useEffect(() => {
    if (token) dispatch(connectSocket(token));
  }, [token, dispatch]);

  // Join room (once)
  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit("join-room", { roomId });
  }, [socket, roomId]);

  // Incoming video call
  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = ({ roomId }) => {
      navigate(`/video-call/${roomId}`);
    };

    socket.on("incoming-video-call", handleIncomingCall);
    return () => socket.off("incoming-video-call", handleIncomingCall);
  }, [socket, navigate]);

  const handleVideoCall = () => {
    socket.emit("requesting-video-call", { roomId });
    navigate(`/video-call/${roomId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 p-6">
  <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
    
    {/* ===== Header ===== */}
    <div className="flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-teal-50 to-blue-50">
      <div>
        <h1 className="text-xl font-semibold text-teal-800">
          {user?.role === "doctor"
            ? "Patient Consultation"
            : "Doctor Consultation"}
        </h1>
        <p className="text-sm text-gray-500">
          Room ID: <span className="font-medium">{roomId}</span>
        </p>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-teal-600 text-sm">
          <ShieldCheck size={18} />
          Secure
        </div>

        {user?.role === "doctor" && (
          <button
            onClick={handleVideoCall}
            className="flex items-center gap-2 px-5 py-2 rounded-xl
              bg-teal-600 text-white font-medium shadow-md
              hover:bg-teal-700 transition"
          >
            <Video size={18} />
            Start Call
          </button>
        )}
      </div>
    </div>

    {/* ===== Content ===== */}
    <div className="grid grid-cols-1 md:grid-cols-3 h-[75vh]">
      
      {/* Left Panel */}
      <div className="hidden md:flex flex-col border-r bg-teal-50/40 p-6">
        <h3 className="text-sm font-semibold text-teal-800 mb-4">
          Consultation Details
        </h3>

        <div className="space-y-3 text-sm text-gray-600">
          <p>
            <span className="font-medium">Doctor:</span>{" "}
            {user?.role === "doctor" ? user.name : "Assigned Doctor"}
          </p>
          <p>
            <span className="font-medium">Patient:</span>{" "}
            {user?.role === "patient" ? user.name : "Patient"}
          </p>
          <p>
            <span className="font-medium">Status:</span>{" "}
            <span className="text-green-600">Online</span>
          </p>
        </div>

        <div className="mt-auto text-xs text-gray-400">
          End-to-end encrypted medical chat.
        </div>
      </div>

      {/* Chat */}
      <div className="col-span-2 p-4 bg-white">
        <ChatBox roomId={roomId} />
      </div>
    </div>
  </div>
</div>

  );
};

export default SocketDashboard;
