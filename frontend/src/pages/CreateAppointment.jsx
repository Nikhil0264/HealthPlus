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

      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Book Appointment</h2>

        {error && (
          <p className="bg-red-100 text-red-700 p-2 rounded mb-3">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="name"
            placeholder="Patient Name"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="address"
            placeholder="Address"
            className="input"
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            className="input"
            onChange={handleChange}
            required
          />

          <select
            name="doctor"
            className="input"
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
            className="input"
            onChange={handleChange}
            required
          />

          <button
            disabled={loading}
            className="w-full bg-teal-600 text-white py-2 rounded"
          >
            {loading ? "Booking..." : "Book Appointment"}
            
          </button>
        </form>
      </div>

  )
}

export default CreateAppointment
