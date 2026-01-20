import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import MusicCard from "../components/Music/MusicCard";

const MusicPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((p) => (p === "light" ? "dark" : "light"));

  return (
    <div className="flex bg-[#FFEFFF] dark:bg-[#011227] transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        {/* 🔥 FIXED: add overflow + mobile momentum scroll */}
        <main className="flex-1 p-6 overflow-y-auto -webkit-overflow-scrolling-touch">
          <MusicCard />
        </main>
      </div>
    </div>
  );
};

export default MusicPage;