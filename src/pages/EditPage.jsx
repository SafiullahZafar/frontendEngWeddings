import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

import Navbar from "../components/Common/Navbar";
import Sidebar from "../components/Common/Sidebar";
import EditDashboard from "../components/Edit/EditDashboard"; // under construction

const EditPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  /* LOAD THEME */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  /* APPLY THEME */
  useEffect(() => {
    const root = document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () =>
    setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="flex min-h-screen bg-[#FFEFFF] dark:bg-[#011227] transition-colors duration-300">

      {/* SIDEBAR */}
      <Sidebar sidebarOpen={sidebarOpen} />

      {/* OVERLAY */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Navbar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleTheme={toggleTheme}
          theme={theme}
        />

        <main className="flex-1 p-6">
          <EditDashboard />
        </main>
      </div>
    </div>
  );
};

export default EditPage;