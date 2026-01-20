import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext"; // ✅ ADDED
import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";
import HomesCard from "../components/Admin/HomesCard";
import HomeCard2 from "../components/Admin/HomeCard2";
import TopBar from "../components/Common/TopBar";

const AdminPanel = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ✅ THEME FROM CONTEXT
  const { theme, toggleTheme, setTheme } = useTheme(); // ✅ ADD setTheme

  // ✅ READ theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    // ✅ SAVE theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🚫 Prevent body scroll when sidebar open (mobile)
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const handleToggleTheme = () =>
    setTheme((p) => (p === "light" ? "dark" : "light"));

  return (
    <div className="flex min-h-screen bg-[#FFEFFF] dark:bg-[#011227] transition-colors duration-300">
      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* OVERLAY (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* RIGHT CONTENT */}
      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleTheme={handleToggleTheme}
          theme={theme}
        />
        <main className="flex-1 overflow-auto p-6 flex flex-col items-center">
          <div className="text-center mt-12 mb-10">
            <h1 className="text-5xl md:text-7xl font-black text-black dark:text-white tracking-tighter uppercase italic">
              Welcome Admin
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
              Dashboard Management
            </p>
          </div>

          <HomesCard />
          <HomeCard2 />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default AdminPanel;