import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Bell } from "lucide-react";
import { markAllAsRead } from "../features/notification/notificationSlice";

const NotificationBell = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const { list, unreadCount } = useSelector(
    (state) => state.notification
  );

  const toggle = () => {
    setOpen((prev) => !prev);
    dispatch(markAllAsRead());
  };

  return (
    <div className="relative">

      <button
        onClick={toggle}
        className="relative p-2 rounded-full hover:bg-gray-100 transition"
      >
        <Bell className="w-5 h-5 text-gray-700" />

        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>


      {open && (
        <div className="absolute right-0 mt-3 w-80 bg-white shadow-xl border rounded-xl z-50 overflow-hidden">

          <div className="px-4 py-3 border-b bg-gray-50">
            <h4 className="text-sm font-semibold text-gray-700">
              Notifications
            </h4>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {list.length === 0 ? (
              <p className="p-4 text-sm text-gray-500 text-center">
                You're all caught up 🎉
              </p>
            ) : (
              list.map((n, i) => (
                <div
                  key={i}
                  className="px-4 py-3 border-b last:border-b-0 hover:bg-gray-50 transition"
                >
                  <p className="text-sm text-gray-800">
                    {n.message}
                  </p>
                  <span className="text-xs text-gray-400">
                    Just now
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
