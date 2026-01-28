import React from "react";
import { useTheme } from "../../context/ThemeContext";

const InstructionDashboard = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-8">
      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-black text-center mb-10
                     text-black dark:text-white">
        📘 Application Instructions
      </h1>

      {/* Login */}
      <section id="login" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          🔐 Login Page
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Enter registered email and password</li>
          <li>Select correct role (Admin / User)</li>
          <li>If login fails ❌ → check email or password</li>
          <li>If error continues → try Signup</li>
        </ul>
      </section>

      {/* Signup */}
      <section id="signup" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          📝 Signup Page
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Fill all fields carefully</li>
          <li>Password must be at least 6 characters</li>
          <li>Confirm password must match</li>
          <li>After success 🎉 → redirected to Home</li>
        </ul>
      </section>

      {/* Home */}
      <section id="home" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          🏠 Home Page
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Gallery → View uploaded images & videos</li>
          <li>Edit → Edit images (if allowed)</li>
          <li>Upload → Upload new images/videos</li>
        </ul>
      </section>

      {/* Upload */}
      <section id="upload" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          ⬆️ Upload Page
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Select correct group before uploading</li>
          <li>Drag & drop or click to select files</li>
          <li>Allowed: Images & Videos only</li>
          <li>Do not upload too many files 🚫 (backend space is limited)</li>
          <li>If upload fails ❌ → try fewer files or smaller size</li>
        </ul>
      </section>

      {/* Gallery */}
      <section id="gallery" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          🖼️ Gallery Page
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Click any group to open images/videos</li>
          <li>Swipe (mobile) or arrows (desktop) to navigate</li>
          <li>Play videos ▶️ inside modal</li>
          <li>Delete button ❌ removes selected item permanently</li>
        </ul>
      </section>

      {/* Notifications */}
      <section id="notifications" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          🔔 Notifications
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li>Green → Success 😊</li>
          <li>Red → Error ❌</li>
          <li>Blue → Information ℹ️</li>
          <li>Click error notification → come here for solution</li>
        </ul>
      </section>

      {/* Common Errors */}
      <section id="errors" className="mb-10">
        <h2 className="text-2xl font-bold mb-3 text-black dark:text-white">
          ❗ Common Errors & Fix
        </h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          <li><b>Upload failed:</b> Reduce file size or count</li>
          <li><b>Login error:</b> Check email, password & role</li>
          <li><b>No images showing:</b> Group might be empty</li>
          <li><b>Video not playing:</b> Check internet speed</li>
        </ul>
      </section>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-10">
        😊 If everything works fine, enjoy using the app!
      </div>
    </div>
  );
};

export default InstructionDashboard;