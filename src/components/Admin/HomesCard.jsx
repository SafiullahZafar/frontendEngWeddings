import { useNavigate } from "react-router-dom";
// ✅ IMPORTING IMAGES FROM YOUR UTILS
import { Homecard1, Home2, Home3 } from "../../utils/Images";

const HomesCard = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Hello in Gallery",
      desc: "To see more images, click the button below",
      btnText: "Go !!!!!",
      icon: "🚀",
      img: Homecard1,
    },
    {
      id: 2,
      title: "Edit images Here",
      desc: "Make images more beautiful and stunning",
      btnText: "Want to Edit",
      icon: "📚",
      img: Home2,
    },
    {
      id: 3,
      title: "Upload your Images",
      desc: "You can upload your own images to the gallery",
      btnText: "Upload Now ",
      icon: "🧪",
      img: Home3,
    },
  ];

  const handleNavigate = (id) => {
    if (id === 1) navigate("/gallery");
    if (id === 2) navigate("/edit");
    if (id === 3) navigate("/upload");
  };

  return (
    <div className="w-full flex flex-col items-center pb-24 px-4 space-y-20">
      {cards.map((card, index) => {
        // --- LAYOUT 1: CINEMATIC OVERLAY (First Card) ---
        if (index === 0) {
          return (
            <div key={card.id} className="w-full max-w-[1000px] group cursor-pointer" onClick={() => handleNavigate(card.id)}>
              <div className="relative h-[500px] w-full rounded-[3rem] overflow-hidden shadow-2xl border border-black/5 dark:border-white/10">
                <img 
                  src={card.img} 
                  alt="" 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
                
                <div className="relative h-full flex flex-col justify-center p-8 md:p-16 max-w-xl">
                    <div className="w-16 h-16 mb-6 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-3xl shadow-xl animate-bounce-slow">
                      {card.icon}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                      {card.title}
                    </h2>
                    <p className="text-white/80 text-lg md:text-xl mb-8 font-medium">
                      {card.desc}
                    </p>
                    <button className="bg-white text-black font-black py-4 px-12 rounded-full w-fit hover:bg-blue-500 hover:text-white transition-all transform hover:-translate-y-1 active:scale-95">
                      {card.btnText}
                    </button>
                </div>
              </div>
            </div>
          );
        }

        // --- LAYOUT 2: MODERN SPLIT REVERSED (Second Card) ---
        if (index === 1) {
          return (
            <div key={card.id} className="w-full max-w-[1000px] flex flex-col lg:flex-row-reverse items-center gap-12 group">
              <div className="flex-1 w-full h-[400px] rounded-[3rem] overflow-hidden shadow-2xl relative border-4 border-purple-500/30 group-hover:border-purple-500 transition-all duration-500">
                <img 
                  src={card.img} 
                  alt="" 
                  className="w-full h-full object-cover group-hover:rotate-1 group-hover:scale-110 transition-all duration-700" 
                />
                <div className="absolute inset-0 bg-purple-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              
              <div className="flex-1 text-center lg:text-right space-y-6">
                <span className="inline-block p-4 bg-purple-100 dark:bg-purple-900/30 rounded-2xl text-3xl shadow-inner uppercase tracking-tighter">
                  {card.icon}
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-black dark:text-white leading-tight transition-colors">
                  {card.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl lg:ml-auto max-w-md">
                  {card.desc}
                </p>
                <button 
                  onClick={() => handleNavigate(card.id)}
                  className="bg-purple-600 text-white font-black py-4 px-14 rounded-2xl shadow-xl shadow-purple-500/40 hover:bg-purple-700 hover:scale-105 transition-all"
                >
                  {card.btnText}
                </button>
              </div>
            </div>
          );
        }

        // --- LAYOUT 3: STACKED FLOATING BADGE (Third Card) ---
        return (
          <div key={card.id} className="w-full max-w-[850px] relative group pt-24">
            {/* Floating Image Circle */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 z-20 rounded-full border-[10px] border-white dark:border-[#0B1020] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-4 transition-all duration-500">
              <img src={card.img} alt="" className="w-full h-full object-cover" />
            </div>

            {/* Content Box */}
            <div className="bg-gradient-to-b from-blue-600 to-blue-900 rounded-[4rem] p-12 pt-32 text-center text-white shadow-2xl relative overflow-hidden border border-white/10">
                {/* Decorative Pattern Overlay */}
                <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
                
                <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">
                  {card.title}
                </h2>
                <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-lg mx-auto opacity-90 font-light leading-relaxed">
                  {card.desc}
                </p>
                
                <div className="flex flex-col items-center gap-4">
                  <button 
                    onClick={() => handleNavigate(card.id)}
                    className="bg-white text-blue-700 font-black py-5 px-16 rounded-full shadow-2xl hover:bg-blue-50 hover:px-20 transition-all uppercase tracking-widest text-sm"
                  >
                    {card.btnText}
                  </button>
                  <span className="text-4xl mt-2 block animate-pulse">{card.icon}</span>
                </div>
            </div>
            
            {/* Large Soft Glow behind the card */}
            <div className="absolute inset-0 -z-10 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-colors"></div>
          </div>
        );
      })}
    </div>
  );
};

export default HomesCard;