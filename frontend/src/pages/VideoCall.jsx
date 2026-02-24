import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../features/socket/socketSlice";
import { useParams, useNavigate } from "react-router-dom";
import { PhoneOff, Mic, MicOff, Video, VideoOff } from "lucide-react";
import Call from "../services/videoCall";

const VideoCall = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const socket = useSelector(getSocket);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const [muted, setMuted] = useState(false);
  const [cameraOff, setCameraOff] = useState(false);
  const [remoteConnected, setRemoteConnected] = useState(false);

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
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = remoteStream;
          setRemoteConnected(true);
        }
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

  const toggleMute = () => {
    if (!localStreamRef.current) return;
    const audioTracks = localStreamRef.current.getAudioTracks();
    audioTracks.forEach((t) => {
      t.enabled = !t.enabled;
    });
    setMuted((prev) => !prev);
  };

  const toggleCamera = () => {
    if (!localStreamRef.current) return;
    const videoTracks = localStreamRef.current.getVideoTracks();
    videoTracks.forEach((t) => {
      t.enabled = !t.enabled;
    });
    setCameraOff((prev) => !prev);
  };

  const endCall = () => {
    localStreamRef.current?.getTracks().forEach((t) => t.stop());
    Call.close();
    navigate(-1);
  };

  return (
    <div className="flex h-screen flex-col bg-gray-950 text-white">
      <header className="flex items-center justify-between px-6 py-3 bg-black/40 border-b border-white/10">
        <div>
          <p className="text-xs text-gray-300">Secure video consultation</p>
          <p className="text-sm font-semibold">Room ID: {roomId}</p>
        </div>
        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
      </header>

      <main className="flex-1 flex flex-col md:flex-row gap-3 p-4">
        <div className="flex-1 relative rounded-2xl bg-black overflow-hidden flex items-center justify-center">
          <video
            ref={remoteVideoRef}
            autoPlay
            className="h-full w-full object-cover"
          />
          {!remoteConnected && (
            <p className="text-xs text-gray-400 absolute">
              Waiting for other participant to join…
            </p>
          )}
        </div>

        <div className="w-full md:w-64 flex flex-col gap-3">
          <div className="relative rounded-2xl bg-black overflow-hidden h-40">
            <video
              ref={localVideoRef}
              autoPlay
              muted
              className="h-full w-full object-cover"
            />
          </div>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-3 text-xs space-y-1">
            <p className="font-semibold">Call status</p>
            <p className="text-gray-300">Connected via HealthPlus secure RTC</p>
            <p className="text-[11px] text-gray-500">
              Do not share passwords, OTPs or card details during a call.
            </p>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center gap-4 py-4 border-t border-white/10 bg-black/60">
        <button
          onClick={toggleMute}
          className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          {muted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
        </button>

        <button
          onClick={toggleCamera}
          className="h-11 w-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
        >
          {cameraOff ? (
            <VideoOff className="w-5 h-5" />
          ) : (
            <Video className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={endCall}
          className="h-11 w-11 rounded-full bg-red-600 flex items-center justify-center hover:bg-red-700 transition"
        >
          <PhoneOff className="w-5 h-5" />
        </button>
      </footer>
    </div>
  );
};

export default VideoCall;
