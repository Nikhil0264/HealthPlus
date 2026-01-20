import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ShieldCheck, CalendarCheck, Stethoscope } from "lucide-react";
import banner from "../public/assets/banner1.jpg";

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log(isAuthenticated)
  console.log(user)
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}`} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50">
     
      <header className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-teal-700 tracking-tight">
          Health<span className="text-blue-600">Plus</span>
        </h1>

        <Link
          to="/login"
          className="text-sm font-medium text-teal-700 hover:text-teal-800"
        >
          Login
        </Link>
      </header>

      
      <main className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        
        <div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Smart Healthcare <br />
            <span className="text-teal-600">
              Appointments & Payments
            </span>
          </h2>

          <p className="mt-6 text-gray-600 max-w-xl">
            Healthplus is a secure healthcare platform that allows patients
            to book appointments, track consultations, and complete
            payments with real-time updates and role-based access.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="px-8 py-4 rounded-xl bg-teal-600 text-white font-semibold shadow-lg hover:bg-teal-700 transition"
            >
              Get Started
            </Link>

            <Link
              to="/login"
              className="px-8 py-4 rounded-xl border border-teal-600 text-teal-600 font-semibold hover:bg-teal-50 transition"
            >
              Book Appointment
            </Link>
          </div>

          
          <div className="mt-10 flex gap-6">
            <TrustItem
              icon={<ShieldCheck className="w-5 h-5 text-teal-600" />}
              label="Secure Data"
            />
            <TrustItem
              icon={<CalendarCheck className="w-5 h-5 text-teal-600" />}
              label="Easy Scheduling"
            />
            <TrustItem
              icon={<Stethoscope className="w-5 h-5 text-teal-600" />}
              label="Verified Doctors"
            />
          </div>
        </div>

        
        <div className="relative">
          <div className="absolute inset-0 bg-teal-200 rounded-3xl blur-3xl opacity-30" />
          <div className="relative bg-white rounded-3xl shadow-xl p-8">
            <img
              src={banner}
              alt="Healthcare"
              className="rounded-2xl object-cover w-full h-80"
            />
          </div>
        </div>
      </main>

      
      <footer className="text-center py-6 text-sm text-gray-400">
        © {new Date().getFullYear()} Healthplus. Trusted digital healthcare.
      </footer>
    </div>
  );
};

const TrustItem = ({ icon, label }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600">
    <div className="p-2 bg-teal-100 rounded-full">{icon}</div>
    <span>{label}</span>
  </div>
);

export default Home;
