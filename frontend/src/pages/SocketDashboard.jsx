import React, { useEffect } from "react";
import { Video } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { connectSocket, getSocket } from "../features/socket/socketSlice";
import { useNavigate } from "react-router-dom";

const SocketDashboard = ({ roomId, user }) => {
  const token = useSelector((state) => state.auth.token);
  const socket = useSelector(getSocket);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) dispatch(connectSocket(token));
  }, [token, dispatch]);

  useEffect(() => {
    if (!socket || !roomId) return;
    socket.emit("join-room", { roomId });
  }, [socket, roomId]);

  useEffect(() => {
    if (!socket) return;

    const handleIncomingCall = ({ roomId }) => {
      console.log("incoming-video-call received");
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
    <div>
      {user?.role === "doctor" && (
        <button onClick={handleVideoCall}>
          <Video className="inline mr-2" />
          Call
        </button>
      )}
    </div>
  );
};

export default SocketDashboard;
