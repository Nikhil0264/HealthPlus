import {
  Users,
  CalendarCheck,
  IndianRupee,
  Activity,
  ShieldCheck,
} from "lucide-react";
import Layout from "../components/Layout";

const AdminDashboard = () => {
// Dummy data
  const stats = [
    {
      label: "Total Users",
      value: "120",
      icon: <Users className="w-6 h-6 text-teal-600" />,
      bg: "bg-teal-50",
    },
    {
      label: "Total Appointments",
      value: "340",
      icon: <CalendarCheck className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Revenue",
      value: "₹45,000",
      icon: <IndianRupee className="w-6 h-6 text-green-600" />,
      bg: "bg-green-50",
    },
    {
      label: "System Activity",
      value: "98%",
      icon: <Activity className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-50",
    },
  ];

  return (
    <Layout>

      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          Admin Dashboard
        </h2>
        <p className="text-sm text-gray-500">
          Healthcare system overview & analytics
        </p>
      </div>


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl shadow p-6 flex items-center gap-4"
          >
            <div className={`p-3 rounded-xl ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            Recent Platform Activity
          </h3>

          <ul className="space-y-3 text-sm text-gray-600">
            <li>🩺 New doctor registered</li>
            <li>📅 Appointment confirmed</li>
            <li>💳 Payment received successfully</li>
            <li>👤 New patient account created</li>
            <li>✅ Appointment marked completed</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="font-semibold text-gray-800 mb-4">
            System Health
          </h3>

          <div className="space-y-4">
            <StatusItem label="API Status" status="Operational" />
            <StatusItem label="Payment Gateway" status="Healthy" />
            <StatusItem label="Data Security" status="Protected" />
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm text-teal-600">
            <ShieldCheck className="w-5 h-5" />
            HIPAA-grade data security
          </div>
        </div>
      </div>
    </Layout>
  );
};

const StatusItem = ({ label, status }) => (
  <div className="flex items-center justify-between text-sm">
    <span className="text-gray-600">{label}</span>
    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium">
      {status}
    </span>
  </div>
);

export default AdminDashboard;
