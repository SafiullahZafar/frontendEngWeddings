import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard2 = () => {
  const navigate = useNavigate();

  const instructions = [
    { id: 1, label: "Security", detail: "Do not share account password with others" },
    { id: 2, label: "Privacy", detail: "Set strong passwords for your safety" },
  ];

  return (
    <div className="w-full flex flex-col items-center pb-16 transition-colors duration-300">
      {/* Outer Container */}
      <div className="bg-[#E9B1FF] dark:bg-[#220027] rounded-[3rem] p-6 w-full max-w-[95%] lg:max-w-2xl shadow-2xl transition-colors duration-300">
        
        {/* Main Title Header */}
        <div className="text-center py-6">
          <h2 className="text-3xl font-black text-black dark:text-white tracking-tight transition-colors">
            Instructions !!!!
          </h2>
        </div>

        {/* Inner Content Card */}
        <div className="bg-white dark:bg-[#1A1A1A] rounded-[2.5rem] p-9 shadow-sm transition-colors duration-300">
          <h3 className="text-2xl font-extrabold text-gray-900 dark:text-white mb-6 transition-colors">
            Important info
          </h3>

          {/* Instruction List */}
          <div className="space-y-6 border-t border-gray-100 dark:border-white/10 pt-6 transition-colors">
            {instructions.map((item) => (
              <div
                key={item.id}
                className="flex flex-col md:flex-row md:items-center gap-2 md:gap-8 pb-4 border-b border-gray-50 dark:border-white/10 last:border-0 transition-colors"
              >
                <span className="text-gray-400 dark:text-gray-400 font-bold text-sm w-24 uppercase tracking-wider">
                  {item.label}
                </span>
                <span className="text-gray-700 dark:text-gray-300 font-medium transition-colors">
                  {item.detail}
                </span>
              </div>
            ))}
          </div>

          {/* Routing Button */}
          <div className="mt-10 flex justify-center">
            <button
              onClick={() => navigate("/instructions")}
              className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg active:scale-95 text-lg"
            >
              Go to Instruction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard2;