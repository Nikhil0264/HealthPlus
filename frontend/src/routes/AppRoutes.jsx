import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "../components/ProtectRoute"
import AdminDashboard from "../pages/AdminDashboard"
import DoctorDashboard from "../pages/DoctorDashboard"
import PatientDashboard from "../pages/PatientDashboard"
// import Unauthorized from "../pages/unauthorized";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateAppointment from "../pages/CreateAppointment";
import VideoCall from "../pages/VideoCall";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/patient"
        element={
          // <ProtectedRoute allowedRoles={["patient"]}>
            <PatientDashboard />
          /* </ProtectedRoute> */
        }
      />
      <Route
        path="/create-appointment"
        element={
          // <ProtectedRoute allowedRoles={["patient"]}>
            <CreateAppointment />
          /* </ProtectedRoute> */
        }
      />
      <Route
        path="/video-call/:roomId"
        element={
          < VideoCall/>
        }
      />
      <Route
        path="/doctor"
        element={
          // <ProtectedRoute allowedRoles={["doctor"]}>
            <DoctorDashboard />
          // </ProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          // <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard />
          // </ProtectedRoute>
        }
      />

      {/* <Route path="/unauthorized" element={<Unauthorized />} />

      <Route path="*" element={<Unauthorized />} /> */}
    </Routes>
  );
};

export default AppRoutes;