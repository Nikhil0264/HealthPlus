import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../features/socket/socketSlice";
import { useParams } from "react-router-dom";
import Call from "../services/videoCall";

const VideoCall = () => {
  const { roomId } = useParams();
  const socket = useSelector(getSocket);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  useEffect(() => {
    if (!socket) return;

    const start = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      localStreamRef.current = stream;
      localVideoRef.current.srcObject = stream;

      Call.addLocalStream(stream);

      Call.onRemoteStream((remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });

      Call.onIceCandidate((candidate) => {
        socket.emit("ice-candidate", { roomId, candidate });
      });

      socket.on("offer", async ({ offer }) => {
        const answer = await Call.createAnswer(offer);
        socket.emit("answer", { roomId, answer });
      });

      socket.on("answer", async ({ answer }) => {
        await Call.setRemoteAnswer(answer);
      });

      socket.on("ice-candidate", async ({ candidate }) => {
        await Call.addIceCandidate(candidate);
      });

      socket.on("ready-for-call", async () => {
        const offer = await Call.createOffer();
        socket.emit("offer", { roomId, offer });
      });

      socket.emit("ready-for-call", { roomId });
    };

    start();

    return () => {
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("ready-for-call");

      Call.close();
      localStreamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, [socket, roomId]);

  return (
    <div className="flex h-screen bg-black gap-4 p-4">
      <h1 className="text-white">My stream</h1>
      <video ref={localVideoRef} autoPlay muted className="w-1/3 rounded" />
      <video ref={remoteVideoRef} autoPlay className="w-2/3 rounded" />
    </div>
  );
};

export default VideoCall;
