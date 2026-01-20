import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarCheck,
  Clock,
  User,
  CheckCircle,
} from "lucide-react";
import { fetchAppointments } from "../features/appointment/appointmentSlice";
import api from "../services/api";
import Layout from "../components/Layout";
import DoctorChat from "./DocterChat";
import SocketDashboard from "./SocketDashboard";

const DoctorDashboard = () => {
  const dispatch = useDispatch();
    const [showChat, setShowChat] = useState(false);
  const { list } = useSelector((state) => state.appointments);
const loggedInUser = useSelector((state) => state.auth.user);
  useEffect(() => {
    dispatch(fetchAppointments());
  }, [dispatch]);

  const updateStatus = async (id, status) => {
    await api.put(`/appointments/${id}/status`, { status });
    dispatch(fetchAppointments());
  };

  // 🔹 Dummy stats (UI only)
  const stats = [
    {
      label: "Today's Appointments",
      value: list?.length || 0,
      icon: <CalendarCheck className="w-6 h-6 text-teal-600" />,
    },
    {
      label: "Pending Reviews",
      value: list?.filter((a) => a.status === "pending").length || 0,
      icon: <Clock className="w-6 h-6 text-yellow-500" />,
    },
    {
      label: "Completed",
      value: list?.filter((a) => a.status === "completed").length || 0,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
    },
  ];

  return (
    <Layout>
 
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Doctor Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Manage and track patient appointments
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
          >
            <div className="p-3 bg-teal-50 rounded-xl">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {list.length === 0 && (
          <div className="bg-white rounded-xl shadow p-8 text-center text-gray-500">
            No appointments scheduled today.
          </div>
        )}

        {list.map((a) => (
          <div
            key={a._id}
            className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <User className="text-teal-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  {a.patient.name}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarCheck className="w-4 h-4" />
                  {new Date(a.dateTime).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span
                className={`px-4 py-1 rounded-full text-sm font-medium
                ${
                  a.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : a.status === "confirmed"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {a.status}
              </span>

              {a.status === "pending" && (
                <button
                  onClick={() =>
                    updateStatus(a._id, "confirmed")
                  }
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
                >
                  Confirm
                </button>
              )}
              {!showChat && (
        <button
          onClick={() => setShowChat(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Open Chat
        </button>
      )}

      {/* Chat Interface */}
      {showChat && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-full max-w-3xl h-[90vh] rounded-xl shadow-lg">
            
            {/* Close Button */}
            <div className="flex justify-end p-2 border-b">
              <button
                onClick={() => setShowChat(false)}
                className="text-red-500 font-semibold"
              >
                Close ✕
              </button>
            </div>

            <SocketDashboard roomId={a._id} user={loggedInUser} />
          </div>
        </div>
      )}
              {a.status === "confirmed" && (
                <button
                  onClick={() =>
                    updateStatus(a._id, "completed")
                  }
                  className="px-5 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
