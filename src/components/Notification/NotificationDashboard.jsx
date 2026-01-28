import React from "react";
import { useNotifications } from "../../context/NotificationContext";

const NotificationDashboard = () => {
  const { notifications, markAsRead, clearAll } = useNotifications();

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      <h1 className="text-4xl font-black text-center mb-10 text-black dark:text-white">
        🔔 Notifications
      </h1>

      <div className="flex justify-between items-center mb-6">
        <button
          onClick={clearAll}
          className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                     bg-white dark:bg-gray-900 text-black dark:text-white font-bold"
        >
          Clear All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No notifications yet.
        </p>
      ) : (
        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`p-4 rounded-lg border ${
                n.type === "success"
                  ? "border-green-500"
                  : "border-red-500"
              } bg-white dark:bg-gray-900`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-black dark:text-white">
                    {n.type.toUpperCase()}
                  </p>
                  <p className="text-gray-700 dark:text-gray-300">
                    {n.message}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    {n.time}
                  </p>
                </div>

                <button
                  onClick={() => markAsRead(n.id)}
                  className="text-sm text-blue-500"
                >
                  {n.read ? "Read" : "Mark read"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default NotificationDashboard;
