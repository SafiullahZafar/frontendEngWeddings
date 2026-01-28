import { HiMenu, HiSun, HiMoon, HiMusicNote, HiBell } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

import logoLight from "../../assets/logo1.svg";
import logoDark from "../../assets/logo2.svg";
import { useTheme } from "../../context/ThemeContext";
import { useNotifications } from "../../context/NotificationContext";

const TopBar = ({ toggleSidebar, sidebarOpen }) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { notifications } = useNotifications();

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="w-full sticky top-0 z-30">
      {/* NAVBAR */}
      <header className="top-0 sticky z-30 flex items-center justify-between px-3 py-1 bg-white dark:bg-gray-800 shadow-md transition-colors">
        {/* LEFT LOGO */}
        <div className="flex items-center gap-2">
          <img
            src={theme === "light" ? logoLight : logoDark}
            alt="Logo"
            className="h-[59px] select-none"
          />
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-4">
          {/* BIG SCREEN: show icons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/notification")}
              className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              <HiBell className="w-6 h-6 text-black dark:text-white" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/music")}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              <HiMusicNote className="w-6 h-6 text-black dark:text-white" />
            </button>
          </div>

          {/* THEME BUTTON */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            {theme === "light" ? (
              <>
                <HiMoon className="w-5 h-5 text-black" />
                <span className="text-sm font-semibold text-black">
                  Light Mode
                </span>
              </>
            ) : (
              <>
                <HiSun className="w-5 h-5 text-white" />
                <span className="text-sm font-semibold text-white">
                  Dark Mode
                </span>
              </>
            )}
          </button>

          {/* MENU BUTTON */}
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
          >
            <HiMenu className="w-6 h-6 text-black dark:text-white" />
          </button>
        </div>
      </header>

      {/* HEADER ONLY ON SMALL SCREENS */}
      <div className="md:hidden bg-white dark:bg-gray-800 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/notification")}
              className="relative p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              <HiBell className="w-6 h-6 text-black dark:text-white" />

              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            <button
              onClick={() => navigate("/music")}
              className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
            >
              <HiMusicNote className="w-6 h-6 text-black dark:text-white" />
            </button>
          </div>

          <div className="text-sm font-bold text-black dark:text-white">
            Header
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
