import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, UserCircle } from "lucide-react";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
 
        <Link to='/'>
          <h1 className="text-lg font-bold text-teal-700 tracking-tight">
          Health<span className="text-blue-600">Plus</span>
        </h1>
        </Link>


        <div className="flex items-center gap-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold capitalize
            ${
              user.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : user.role === "doctor"
                ? "bg-blue-100 text-blue-700"
                : "bg-teal-100 text-teal-700"
            }`}
          >
            {user.role}
          </span>

          <NotificationBell />

          <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full">
            <UserCircle className="w-5 h-5 text-gray-600" />
            <span className="text-sm text-gray-700 font-medium">
              {user.name}
            </span>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1 px-4 py-2 rounded-xl
            bg-red-50 text-red-600 font-semibold
            hover:bg-red-100 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
