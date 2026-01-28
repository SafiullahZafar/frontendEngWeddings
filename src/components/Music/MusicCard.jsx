import { useEffect, useState } from "react";
import { fetchMusicList } from "../../utils/music";
import { useMusic } from "../../context/MusicContext";
import { MusicThumb } from "../../utils/Images";
import {
  Play,
  SkipBack,
  SkipForward,
  Rocket,
  Square,
} from "lucide-react";

const MusicCard = () => {
  const {
    current,
    playing,
    play,
    pause,
    next,
    prev,
    progress,
    seek,
    currentTime,
    duration,
  } = useMusic();

  const [musicList, setMusicList] = useState([]);

  useEffect(() => {
    fetchMusicList()
      .then((data) => setMusicList(data))
      .catch(() => {});
  }, []);

  const formatTime = (time) => {
    if (time === undefined || time === null || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 min-h-screen flex flex-col bg-slate-50 dark:bg-[#020617]">
      <h1 className="text-4xl md:text-6xl font-black mb-8 text-center uppercase italic tracking-tighter text-slate-900 dark:text-white">
        Sonic <span className="text-blue-600">Gallery</span>
      </h1>

      <div className="flex-1 overflow-y-auto -mx-4 px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center auto-rows-fr">
          {musicList.map((m, i) => {
            const isCurrent = current?.url === m.url;
            const isPlaying = isCurrent && playing;
            const currentProgress = isCurrent ? (progress || 0) : 0;
            
            // ✅ THE FIX: Prioritize m.duration from the list so all cards show time.
            // If it is the current playing song and context has a duration, use that for accuracy.
            const displayDuration = (isCurrent && duration > 0) ? duration : (m.duration || 0);

            return (
              <div
                key={i}
                className={`
                  relative w-full max-w-[340px] flex flex-col rounded-[2.5rem] overflow-hidden
                  transition-all duration-700 border-none group h-fit
                  ${
                    isPlaying
                      ? "shadow-[0_30px_60px_-15px_rgba(59,130,246,0.3)] scale-[1.02]"
                      : "shadow-xl shadow-black/5 hover:shadow-blue-500/10"
                  }
                  bg-white dark:bg-[#0F172A]
                `}
              >
                {/* Image Container - HEIGHT REDUCED from h-64 to h-48 */}
                <div className="relative h-48 w-full overflow-hidden shrink-0">
                  <img
                    src={MusicThumb}
                    alt="Cover"
                    className={`w-full h-full object-cover transition-transform duration-[2000ms] ${
                      isPlaying ? "scale-110 rotate-1" : "group-hover:scale-105"
                    }`}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white dark:to-[#0F172A] pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 backdrop-blur-xl bg-white/10 border border-white/20 p-2 rounded-xl text-white shadow-2xl">
                    <Rocket size={16} className={isPlaying ? "animate-pulse text-blue-400" : "text-white/70"} />
                  </div>
                </div>

                {/* Content Section - PADDING REDUCED */}
                <div className="px-6 pb-6 pt-1 flex flex-col items-center text-center -mt-6 relative z-10">
                  <div className="mb-3 w-full">
                    <h2 className="text-xl font-black text-slate-900 dark:text-white truncate leading-tight">
                      {m.title}
                    </h2>
                    <p className="text-blue-500 text-[10px] font-bold tracking-[0.2em] uppercase mt-1 opacity-80">
                      {m.artist}
                    </p>
                  </div>

                  {/* Visualizer - HEIGHT REDUCED */}
                  <div className="flex justify-center items-center gap-1 h-6 mb-6">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((b) => (
                      <span
                        key={b}
                        className={`
                          w-1 rounded-full bg-gradient-to-t from-blue-600 to-blue-400 transition-all duration-500
                          ${isPlaying ? "animate-music-bar" : "h-1 opacity-30"}
                        `}
                        style={{ animationDelay: `${b * 0.1}s` }}
                      />
                    ))}
                  </div>

                  {/* Progress Section - MARGINS TIGHTENED */}
                  <div className="w-full mb-6 px-2">
                    <div className="relative h-1.5 flex items-center group/progress">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={currentProgress}
                        onChange={(e) => isCurrent && seek(Number(e.target.value))}
                        className="progress-input w-full h-1 rounded-full appearance-none cursor-pointer z-20 bg-transparent"
                        style={{
                          background: `linear-gradient(to right, #2563eb ${currentProgress}%, #cbd5e1 ${currentProgress}%)`,
                        }}
                      />
                    </div>
                    <div className="flex justify-between text-[9px] mt-2 font-black font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      <span>{isCurrent ? formatTime(currentTime) : "0:00"}</span>
                      {/* ✅ This now shows the ending time for all songs */}
                      <span>{formatTime(displayDuration)}</span>
                    </div>
                  </div>

                  {/* Main Controls - BUTTON SIZE SLIGHTLY REDUCED */}
                  <div className="flex justify-center items-center gap-6 w-full">
                    <button
                      onClick={prev}
                      className="text-slate-400 hover:text-blue-500 transition-all transform hover:scale-110"
                    >
                      <SkipBack size={22} fill="currentColor" />
                    </button>

                    <button
                      onClick={() => (isCurrent && playing ? pause() : play(m))}
                      className={`
                        group/btn relative p-4 rounded-2xl text-white transition-all duration-300
                        ${
                          isPlaying
                            ? "bg-slate-900 dark:bg-blue-600 shadow-lg"
                            : "bg-blue-600 shadow-md"
                        }
                        active:scale-95 hover:-translate-y-1
                      `}
                    >
                      {isPlaying ? (
                        <Square size={20} fill="currentColor" />
                      ) : (
                        <Play size={20} fill="currentColor" className="ml-1" />
                      )}
                    </button>

                    <button
                      onClick={next}
                      className="text-slate-400 hover:text-blue-500 transition-all transform hover:scale-110"
                    >
                      <SkipForward size={22} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes musicBar {
          0%, 100% { height: 8px; }
          50% { height: 20px; }
        }
        .animate-music-bar {
          animation: musicBar 1s cubic-bezier(0.17, 0.67, 0.83, 0.67) infinite;
        }
        
        .progress-input::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 14px;
          width: 14px;
          border-radius: 50%;
          background: #ffffff;
          cursor: pointer;
          border: 3px solid #2563eb;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default MusicCard;