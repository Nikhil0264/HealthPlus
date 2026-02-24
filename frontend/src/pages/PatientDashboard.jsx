import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarCheck,
  CreditCard,
  UserRound,
  Activity,
  HeartPulse,
  Pill,
} from "lucide-react";
import { fetchAppointments } from "../features/appointment/appointmentSlice";
import Layout from "../components/Layout";
import PaymentButton from "./PaymentButton";
import { Link } from "react-router-dom";
import SocketDashboard from "./SocketDashboard";

const PatientDashboard = () => {
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const { list, loading } = useSelector(
    (state) => state.appointments
  );
   const loggedInUser = useSelector((state) => state.auth.user);
  // const user = user.name;
  // const roomId = "abc";
  useEffect(() => {
    dispatch(fetchAppointments());
    
  }, [dispatch]);


  const summary = [
    {
      label: "Upcoming Appointments",
      value: list.filter((a) => a.status !== "completed").length,
      icon: <CalendarCheck className="w-6 h-6 text-teal-600" />,
    },
    {
      label: "Completed Visits",
      value: list.filter((a) => a.status === "completed").length,
      icon: <Activity className="w-6 h-6 text-green-600" />,
    },
    {
      
      label: "Pending Payments",
      value: list.filter((a) => a.paymentStatus !== "paid").length,
      icon: <CreditCard className="w-6 h-6 text-blue-600" />,
    },
  ];

  const healthTips = [
    "Drink 2–3L of water daily unless advised otherwise.",
    "Aim for 7–8 hours of quality sleep.",
    "Take medicines exactly as prescribed by your doctor.",
  ];

  if (loading)
    return (
      <Layout>
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </Layout>
    );

  if (list.length === 0)
    return (
      <Layout>
        <div className="grid gap-6 md:grid-cols-2 items-center">
          <div className="bg-white rounded-2xl shadow p-8 text-center text-gray-500">
            <UserRound className="mx-auto mb-4 text-teal-500 w-10 h-10" />
            <p className="font-semibold text-gray-700 mb-2">
              No appointments yet
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Book your first consultation with a verified doctor in minutes.
            </p>
            <Link to="/create-appointment">
              <button className="rounded-lg bg-teal-600 px-6 py-3 text-white font-semibold hover:bg-teal-700 transition">
                Book an appointment
              </button>
            </Link>
          </div>
          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl border p-6 space-y-3 text-sm text-gray-600">
            <p className="font-semibold text-gray-800 flex items-center gap-2">
              <HeartPulse className="w-5 h-5 text-teal-600" />
              Why book regularly?
            </p>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>Track chronic conditions with consistent follow-ups.</li>
              <li>Keep digital records for second opinions and travel.</li>
              <li>Get reminders for medicines and lab tests.</li>
            </ul>
          </div>
        </div>
      </Layout>
    );

  return (
    <Layout>
      {/* Header + quick CTA */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            Patient dashboard
          </h2>
          <p className="text-sm text-gray-500">
            Track appointments, payments and your care journey.
          </p>
        </div>
        <Link to="/create-appointment">
          <button className="rounded-xl bg-teal-600 px-6 py-2.5 text-white text-sm font-semibold hover:bg-teal-700 transition">
            + Book new appointment
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main content */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {summary.map((item, idx) => (
              <div
                key={idx}
                className="bg-teal-50 rounded-2xl border border-teal-100 p-4 flex items-center gap-4"
              >
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500">{item.label}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {list.map((a) => (
              <div
                key={a._id}
                className="bg-white rounded-2xl shadow-sm border p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                    <UserRound className="text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Dr. {a.doctor.name}
                    </p>

                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <CalendarCheck className="w-4 h-4" />
                      {new Date(a.dateTime).toLocaleString()}
                    </p>
                    <p className="mt-1 text-[11px] text-gray-400">
                      Speciality: {a.doctor.specialization || "General medicine"}
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

                  {a.paymentStatus === "paid" ? (
                    <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                      Paid
                    </span>
                  ) : (
                    <PaymentButton appointmentId={a._id} />
                  )}

                  <button
                    onClick={() => setShowChat(true)}
                    className="px-4 py-2 rounded-xl bg-teal-50 text-teal-700 text-xs font-semibold hover:bg-teal-100 transition"
                  >
                    Open chat
                  </button>
                </div>

                {/* Chat overlay once for current appointment */}
                {showChat && (
                  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-40">
                    <div className="bg-white w-full max-w-3xl h-[90vh] rounded-2xl shadow-2xl overflow-hidden">
                      <div className="flex justify-between items-center px-4 py-2 border-b bg-gradient-to-r from-teal-50 to-blue-50">
                        <div className="text-sm">
                          <p className="font-semibold text-gray-800">
                            Chat with Dr. {a.doctor.name}
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

        {/* Right sidebar */}
        <aside className="space-y-4">
          <div className="bg-white rounded-2xl border shadow-sm p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-full bg-teal-50 flex items-center justify-center">
                <HeartPulse className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  Quick health snapshot
                </p>
                <p className="text-[11px] text-gray-400">
                  Dummy vitals for UI only
                </p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="rounded-xl bg-teal-50 p-3">
                <p className="text-[11px] text-gray-500">Heart rate</p>
                <p className="text-sm font-semibold text-teal-700">78 bpm</p>
              </div>
              <div className="rounded-xl bg-blue-50 p-3">
                <p className="text-[11px] text-gray-500">Blood pressure</p>
                <p className="text-sm font-semibold text-blue-700">
                  118 / 76
                </p>
              </div>
              <div className="rounded-xl bg-emerald-50 p-3">
                <p className="text-[11px] text-gray-500">Next dose</p>
                <p className="text-sm font-semibold text-emerald-700">
                  Tonight 9 PM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border shadow-sm p-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800">
              <Pill className="w-4 h-4 text-teal-600" />
              Daily care tips
            </div>
            <ul className="space-y-2 text-xs text-gray-600">
              {healthTips.map((tip) => (
                <li key={tip} className="flex gap-2">
                  <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-teal-500" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </Layout>
  );
};

export default PatientDashboard;
