import { HiBell, HiMusicNote } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const Header = ({ theme }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex items-center justify-end gap-4 px-6 py-3 bg-white dark:bg-gray-900 shadow-sm">
      
      {/* Notification Icon */}
      <button
        onClick={() => navigate("/notification")}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
      >
        <HiBell className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
      </button>

      {/* Music Icon */}
      <button
        onClick={() => navigate("/music")}
        className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
      >
        <HiMusicNote className={`w-6 h-6 ${theme === "dark" ? "text-white" : "text-black"}`} />
      </button>

    </div>
  );
};

export default Header;