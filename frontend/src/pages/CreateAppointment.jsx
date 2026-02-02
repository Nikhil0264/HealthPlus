import React, { useEffect, useState } from 'react'
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { fetchAppointments } from '../features/appointment/appointmentSlice';
import { useNavigate } from 'react-router-dom';
import PatientDashboard from './PatientDashboard';

const CreateAppointment = () => {

      const dispatch = useDispatch();
    const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    age: "",
    doctor: "",
    dateTime: "",
    fee: 500,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [complete,setComplete] = useState(false);


  useEffect(()=>{
    const fetchDcotors = async()=>{
        try {
        const res = await api.get("/users/doctors");
        setDoctors(res.data);
      } catch {
        setError("Failed to load doctors");
      }
    };
       fetchDcotors();
  },[])



  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleSubmit = async(e)=>{
    e.preventDefault();
    setError("");

    try{
        setLoading(true);
        await api.post('/appointments',form);
        dispatch(fetchAppointments());
        setComplete(true)
        navigate('/patient')
    }catch(err){
        setError(err.response?.data?.message || "Appointment failed");
    }finally{
        setLoading(false)
    }

  }
  return (
  <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-blue-50 py-12 px-6">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      
      {/* ===== Left Info Panel ===== */}
      <div className="md:col-span-1 bg-white rounded-3xl shadow-lg p-6 flex flex-col">
        <h2 className="text-2xl font-bold text-teal-700">
          Book Appointment
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          Schedule a secure consultation with verified doctors and
          receive expert medical guidance.
        </p>

        {/* Dummy Highlights */}
        <div className="mt-6 space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-teal-50">
            🩺 <span className="font-medium">Verified Doctors</span>
            <p className="text-xs text-gray-500 mt-1">
              All doctors are certified professionals.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-blue-50">
            🔒 <span className="font-medium">Secure Records</span>
            <p className="text-xs text-gray-500 mt-1">
              Your medical data is encrypted.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-green-50">
            ⏱ <span className="font-medium">Quick Booking</span>
            <p className="text-xs text-gray-500 mt-1">
              Book appointments in under 2 minutes.
            </p>
          </div>
        </div>

        <div className="mt-auto text-xs text-gray-400 pt-6">
          HealthPlus • Trusted Digital Healthcare
        </div>
      </div>

      {/* ===== Right Form Panel ===== */}
      <div className="md:col-span-2 bg-white rounded-3xl shadow-xl p-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-6">
          Patient Details
        </h3>

        {error && (
          <p className="bg-red-100 text-red-700 p-3 rounded-xl mb-4">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <input
            name="name"
            placeholder="Patient Name"
            className="input rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            className="input rounded-xl"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            className="input rounded-xl md:col-span-2"
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input rounded-xl"
            onChange={handleChange}
            required
          />

          <select
            name="doctor"
            className="input rounded-xl"
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} ({doc.specialization})
              </option>
            ))}
          </select>

          <input
            name="dateTime"
            type="datetime-local"
            className="input rounded-xl md:col-span-2"
            onChange={handleChange}
            required
          />

          {/* Fee Display (Dummy UX Enhancement) */}
          <div className="md:col-span-2 p-4 rounded-xl bg-gray-50 flex justify-between items-center text-sm">
            <span className="text-gray-600">Consultation Fee</span>
            <span className="font-semibold text-teal-700">₹500</span>
          </div>

          <button
            disabled={loading}
            className="md:col-span-2 mt-2 bg-teal-600 hover:bg-teal-700
              text-white py-3 rounded-xl font-semibold transition shadow-md"
          >
            {loading ? "Booking Appointment..." : "Confirm Appointment"}
          </button>
        </form>
      </div>
    </div>
  </div>
);

}

export default CreateAppointment
