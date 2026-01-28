import { useNavigate } from "react-router-dom";
// ✅ IMPORTING IMAGES FROM UTILS
import { Home2, Home3 } from "../../utils/Images";
import { Image, Upload, ArrowRight } from "lucide-react";

const EditDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-7xl mx-auto p-4 min-h-screen">
      <h1 className="text-4xl md:text-5xl font-black text-black dark:text-white mb-10 tracking-tight">
        Edit Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 1) EDIT FROM GALLERY */}
        <div
          className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0B1A33] shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-500 border border-black/5 dark:border-white/10"
          onClick={() => navigate("/gallery")}
        >
          {/* Background Decorative Image */}
          <div className="absolute inset-0 opacity-20 dark:opacity-40 group-hover:opacity-30 dark:group-hover:opacity-60 transition-opacity">
            <img 
              src={Home2} 
              alt="Homecard2" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
            />
          </div>
          
          {/* Card Content */}
          <div className="relative p-8 md:p-10 flex flex-col h-full min-h-[300px] justify-between z-10">
            <div>
              <div className="w-14 h-14 bg-blue-600/10 dark:bg-blue-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Image className="text-blue-600 dark:text-blue-400" size={32} />
              </div>
              <h2 className="font-black text-3xl mb-3 text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Edit from Gallery
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-300 max-w-[280px] leading-relaxed">
                Choose any image/video from your gallery and edit it.
              </p>
            </div>
            
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase tracking-widest text-sm mt-4">
              Explore Gallery <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>

        {/* 2) UPLOAD & EDIT */}
        <div
          className="group relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-[#0B1A33] shadow-2xl cursor-pointer hover:scale-[1.02] transition-all duration-500 border border-black/5 dark:border-white/10"
          onClick={() => navigate("/upload")}
        >
           {/* Background Decorative Image */}
           <div className="absolute inset-0 opacity-20 dark:opacity-40 group-hover:opacity-30 dark:group-hover:opacity-60 transition-opacity">
            <img 
              src={Home3} 
              alt="Homecard3" 
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700" 
            />
          </div>

          <div className="relative p-8 md:p-10 flex flex-col h-full min-h-[300px] justify-between z-10">
            <div>
              <div className="w-14 h-14 bg-purple-600/10 dark:bg-purple-500/20 rounded-2xl flex items-center justify-center mb-6">
                <Upload className="text-purple-600 dark:text-purple-400" size={32} />
              </div>
              <h2 className="font-black text-3xl mb-3 text-black dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                Upload & Edit
              </h2>
              <p className="text-base text-gray-500 dark:text-gray-300 max-w-[280px] leading-relaxed">
                Upload a new file and edit instantly.
              </p>
            </div>

            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-bold uppercase tracking-widest text-sm mt-4">
              Start Upload <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDashboard;