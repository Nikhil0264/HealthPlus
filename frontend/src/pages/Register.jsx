import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";
import { login } from "../features/auth/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);
      const res = await api.post("/auth/register", form);
      dispatch(login(res.data));
      navigate(`/${res.data.user.role}`);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-cyan-100 px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-teal-700">HealthPlus</h1>
          <p className="text-gray-500 mt-1">
            Secure healthcare access for everyone
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg border p-6"
        >
          <h2 className="text-xl font-semibold text-gray-800 mb-4 text-center">
            Create your account
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Full Name
            </label>
            <input
              name="name"
              placeholder="John Doe"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

   
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="john@email.com"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          
          <div className="mb-3">
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-1">
              Register as
            </label>
            <select
              name="role"
              className="w-full border rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
              onChange={handleChange}
            >
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="admin">admin</option>
            </select>
          </div>

       
          <button
            disabled={loading}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2.5 rounded-lg font-medium transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Create Account"}
          </button>

       
          <p className="text-sm text-center text-gray-500 mt-4">
            Already registered?{" "}
            <Link
              to="/login"
              className="text-teal-600 font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>

        
        <p className="text-xs text-center text-gray-400 mt-4">
          🔒 Your health data is secure and encrypted
        </p>
      </div>
    </div>
  );
};

export default Register;
