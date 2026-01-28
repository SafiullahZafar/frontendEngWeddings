import React from "react";
import { useNavigate } from "react-router-dom";
// ✅ IMPORTING IMAGE FROM YOUR UTILS
import { Home4 } from "../../utils/Images";
import { ShieldCheck, Lock, ChevronRight, Info } from "lucide-react";

const HomeCard2 = () => {
  const navigate = useNavigate();

  const instructions = [
    { id: 1, label: "Security", detail: "Do not share account password with others", icon: <ShieldCheck size={18} /> },
    { id: 2, label: "Privacy", detail: "Set strong passwords for your safety", icon: <Lock size={18} /> },
  ];

  return (
    <div className="w-full flex flex-col items-center pb-12 px-4 transition-colors duration-300">
      {/* Outer Container - Made max-width smaller (3xl instead of 4xl) */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#E9B1FF] to-[#C084FC] dark:from-[#220027] dark:to-[#120015] rounded-[3rem] p-3 w-full max-w-[95%] lg:max-w-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-300 group">
        
        {/* Decorative Background Image (Home4) - More subtle */}
        <div className="absolute inset-0 opacity-10 dark:opacity-30 pointer-events-none group-hover:scale-105 transition-transform duration-1000">
            <img src={Home4} alt="" className="w-full h-full object-cover" />
        </div>

        {/* Header Section - More compact */}
        <div className="text-center py-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 dark:bg-black/20 backdrop-blur-md border border-white/30 dark:border-white/10 mb-3">
             <Info size={14} className="text-[#5865F2] dark:text-white" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black dark:text-white">Guide</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-black dark:text-white tracking-tight transition-colors">
            Instructions !!!!
          </h2>
        </div>

        {/* Inner Content Card - Sleek Glassmorphism */}
        <div className="bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-xl rounded-[2.2rem] p-5 md:p-8 shadow-2xl border border-white/40 dark:border-white/5 relative z-10 transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl md:text-2xl font-black text-gray-900 dark:text-white transition-colors">
              Important info
            </h3>
            <div className="h-1 w-12 bg-gradient-to-r from-[#5865F2] to-[#E9B1FF] rounded-full"></div>
          </div>

          {/* Instruction List - Tighter spacing */}
          <div className="space-y-3 transition-colors">
            {instructions.map((item) => (
              <div
                key={item.id}
                className="group/item flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-[#5865F2]/20 hover:shadow-lg"
              >
                {/* Icon Circle */}
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-[#5865F2]/10 dark:bg-[#E9B1FF]/10 text-[#5865F2] dark:text-[#E9B1FF] shrink-0 group-hover/item:scale-110 transition-transform">
                    {item.icon}
                </div>
                
                <div className="flex flex-col flex-1">
                    <span className="text-gray-400 dark:text-gray-500 font-black text-[9px] uppercase tracking-widest mb-0.5">
                        {item.label}
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 font-bold text-sm md:text-base leading-tight transition-colors">
                      {item.detail}
                    </span>
                </div>
                
                <ChevronRight size={18} className="text-gray-300 dark:text-gray-600 group-hover/item:text-[#5865F2] group-hover/item:translate-x-1 transition-all" />
              </div>
            ))}
          </div>

          {/* Routing Button - Scaled down slightly but more glow */}
          <div className="mt-8 flex justify-center">
            <button
              onClick={() => navigate("/instructions")}
              className="group/btn relative bg-[#5865F2] hover:bg-[#4752C4] text-white font-black py-3.5 px-10 rounded-2xl transition-all shadow-[0_10px_25px_-5px_rgba(88,101,242,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(88,101,242,0.7)] active:scale-95 text-base flex items-center gap-2 overflow-hidden"
            >
              <span className="relative z-10">Go to Instruction</span>
              <ChevronRight size={18} className="relative z-10 group-hover/btn:translate-x-1 transition-transform" />
              
              {/* Animated Shine */}
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover/btn:left-full transition-all duration-1000"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard2;