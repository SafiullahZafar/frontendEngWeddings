import { HiMenu, HiSun, HiMoon } from "react-icons/hi";
import logoLight from "../../assets/logo1.svg";
import logoDark from "../../assets/logo2.svg";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ toggleSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className="
        sticky top-0 z-40
        flex items-center justify-between
        px-3 py-1
        bg-white dark:bg-gray-800
        shadow-md
        transition-colors
      "
    >
      {/* LEFT SIDE — LOGO */}
      <div className="flex items-center gap-2">
        <img
          src={theme === "light" ? logoLight : logoDark}
          alt="Logo"
          className="h-[59px] select-none"
        />
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-lg
                     hover:bg-gray-200 dark:hover:bg-white/10 transition"
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

        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-white/10 transition"
        >
          <HiMenu className="w-6 h-6 text-black dark:text-white" />
        </button>
      </div>
    </header>
  );
};

export default Navbar;
