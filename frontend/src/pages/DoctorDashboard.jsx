import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarCheck,
  Clock,
  User,
  CheckCircle,
  Stethoscope,
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Doctor dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Review today&apos;s schedule, manage consultations and follow-ups.
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1">
            <Stethoscope className="w-4 h-4 text-teal-600" />
            <span>Clinic mode</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl shadow-sm border p-5 flex items-center gap-4"
              >
                <div className="p-3 bg-teal-50 rounded-xl">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {list.length === 0 && (
              <div className="bg-white rounded-2xl shadow-sm border p-8 text-center text-gray-500">
                No appointments scheduled today.
              </div>
            )}

            {list.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                    <User className="text-teal-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {a.patient.name}
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <CalendarCheck className="w-4 h-4" />
                      {new Date(a.dateTime).toLocaleString()}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      Reason: {a.reason || "Follow-up consultation"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                  <span
                    className={`px-4 py-1 rounded-full text-xs font-medium
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
                      onClick={() => updateStatus(a._id, "confirmed")}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-semibold hover:bg-blue-700 transition"
                    >
                      Confirm
                    </button>
                  )}

                  {a.status === "confirmed" && (
                    <button
                      onClick={() => updateStatus(a._id, "completed")}
                      className="px-4 py-2 bg-green-600 text-white rounded-xl text-xs font-semibold hover:bg-green-700 transition"
                    >
                      Mark completed
                    </button>
                  )}

                  <button
                    onClick={() => setShowChat(true)}
                    className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition"
                  >
                    Open chat
                  </button>
                </div>

                {showChat && (
                  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
                    <div className="bg-white w-full max-w-3xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden">
                      <div className="flex justify-between items-center px-4 py-2 border-b bg-gradient-to-r from-teal-50 to-blue-50">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-800">
                            Chat with {a.patient.name}
                          </p>
                          <p className="text-[11px] text-gray-500">
                            Appointment ID: {a._id}
                          </p>
                        </div>
                        <button
                          onClick={() => setShowChat(false)}
                          className="text-xs text-red-500 font-semibold"
                        >
                          Close ✕
                        </button>
                      </div>

                      <SocketDashboard roomId={a._id} user={loggedInUser} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-4">
          <div className="bg-white rounded-2xl border shadow-sm p-5 text-xs space-y-2">
            <p className="text-sm font-semibold text-gray-800">
              Today&apos;s quick overview
            </p>
            <p className="text-gray-500">
              Keep an eye on late patients, high-risk cases and follow-ups.
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-1">
              <li>2 follow-ups scheduled in the evening.</li>
              <li>1 new patient flagged as priority (dummy).</li>
              <li>All systems operational for video calls.</li>
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
