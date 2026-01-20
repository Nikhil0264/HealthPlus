import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  CalendarCheck,
  CreditCard,
  UserRound,
  Activity,
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
        <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500">
          <UserRound className="mx-auto mb-4 text-teal-500 w-10 h-10" />
          <p>No appointments found.</p>
        </div>
        <Link to='/create-appointment'>
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition">
          Create Appointment
          </button>
      </Link>
      </Layout>
    );
  
  return (
    <Layout>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Patient Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Track your consultations and payments
        </p>
        
      </div>
      <Link to='/create-appointment'>
        <button className="rounded-lg bg-blue-600 px-6 py-3 text-white font-semibold hover:bg-blue-700 transition">
          Create Appointment
          </button>
      </Link>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {summary.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
          >
            <div className="p-3 bg-teal-50 rounded-xl">
              {item.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-gray-800">
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
            className="bg-white rounded-2xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <UserRound className="text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-800">
                  Dr. {a.doctor.name}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <CalendarCheck className="w-4 h-4" />
                  {new Date(a.dateTime).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="p-6">
      {/* Button */}
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

              {a.paymentStatus === "paid" ? (
                <span className="px-4 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                  Paid
                </span>
              ) : (
                <PaymentButton appointmentId={a._id} />
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default PatientDashboard;
