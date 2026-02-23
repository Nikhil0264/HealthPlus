import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSocket } from '../features/socket/socketSlice';

const IncomindCall = () => {
  const [incomingCall, setIncomingCall] = useState(null); // stores roomId
  const navigate = useNavigate();
  const socket = getSocket();

  useEffect(() => {
    // Guard: socket may not be connected yet
    if (!socket) return;

    socket.on("incoming-video-call", ({ roomId }) => {
      setIncomingCall(roomId);
    });

    socket.on("video-call-accepted", () => {
      if (incomingCall) {
        navigate(`/video-call/${incomingCall}`);
      }
    });

    socket.on("video-call-rejected", () => {
      alert("Call rejected");
      setIncomingCall(null);
    });

    return () => {
      socket.off("incoming-video-call");  // fixed typo: was "incomming-video-call"
      socket.off("video-call-accepted");
      socket.off("video-call-rejected");
    };
  }, [socket, incomingCall, navigate]);

  // Don't render anything if no incoming call
  if (!incomingCall) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-xl">
        <h2 className="text-lg font-bold">
          Incoming video call 📞
        </h2>

        <div className="flex gap-4 mt-4">
          <button
            onClick={() => {
              socket.emit("accept-video-call", { roomId: incomingCall });
              navigate(`/video-call/${incomingCall}`);
            }}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Accept
          </button>

          <button
            onClick={() => {
              socket.emit("reject-video-call", { roomId: incomingCall });
              setIncomingCall(null);
            }}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default IncomindCall;
