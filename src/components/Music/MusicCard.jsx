import { useEffect, useState } from "react";
import { fetchMusicList } from "../../utils/music";
import { useMusic } from "../../context/MusicContext";
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

  // ✅ MISSING STATE (RESTORED)
  const [musicList, setMusicList] = useState([]);

  // ✅ MISSING FETCH (RESTORED)
  useEffect(() => {
    fetchMusicList()
      .then((data) => setMusicList(data))
      .catch(() => {});
  }, []);

  // ✅ SHOW ALL MUSIC (9 songs)
  const displayList = musicList;

  const formatTime = (time) => {
    if (!time || isNaN(time)) return "0:00";
    const m = Math.floor(time / 60);
    const s = Math.floor(time % 60);
    return `${m}:${s < 10 ? "0" + s : s}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      <h1
        className="text-3xl md:text-5xl font-black mb-10 text-center uppercase italic
        text-black dark:text-white"
      >
        Music Library
      </h1>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {displayList.map((m, i) => {
          const isCurrent = current?.title === m.title;
          const isPlaying = isCurrent && playing;

          return (
            <div
              key={i}
              className={`
                relative w-full max-w-[320px] min-h-[420px] rounded-[2.2rem] p-6
                transition-all duration-500 backdrop-blur-xl border
                ${
                  isPlaying
                    ? "border-blue-500/60 shadow-[0_0_35px_rgba(59,130,246,0.6)] scale-[1.03]"
                    : "border-black/10 dark:border-white/10"
                }
                bg-white/80 dark:bg-[#0F172A]/80
              `}
            >
              {/* Rocket Icon */}
              <div className="absolute top-5 left-5 bg-blue-500/20 p-2 rounded-lg text-blue-500">
                <Rocket size={18} />
              </div>

              {/* Title */}
              <div className="text-center mt-10 mb-4">
                <h2 className="text-xl font-extrabold text-black dark:text-white truncate">
                  {m.title}
                </h2>
                <p className="text-blue-500 text-[11px] font-bold tracking-widest uppercase mt-1">
                  {m.artist}
                </p>
              </div>

              {/* Equalizer */}
              <div className="flex justify-center items-end gap-2 h-24 mb-6">
                {[1, 2, 3, 4, 5].map((b) => (
                  <span
                    key={b}
                    className={`
                      w-2 rounded-full bg-blue-500
                      ${isPlaying ? "animate-music-bar" : "h-3 opacity-40"}
                    `}
                    style={{ animationDelay: `${b * 0.15}s` }}
                  />
                ))}
              </div>

              {/* Progress */}
              <div className="w-full mb-5">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isCurrent ? progress : 0}
                  onChange={(e) => {
                    // SAFE SEEK (NO NaN)
                    if (!isCurrent) return;
                    const value = Number(e.target.value);
                    if (isNaN(value)) return;
                    seek(value);
                  }}
                  className="w-full h-1 rounded-lg appearance-none cursor-pointer
                    bg-gray-300 dark:bg-gray-600 accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #2563eb 0%, #2563eb ${isCurrent ? progress : 0}%, #d1d5db ${isCurrent ? progress : 0}%, #d1d5db 100%)`,
                  }}
                />
                <div
                  className="flex justify-between text-[11px] mt-2 font-mono
                  text-gray-600 dark:text-gray-400"
                >
                  <span>{isCurrent ? formatTime(currentTime) : "0:00"}</span>
                  <span>{isCurrent ? formatTime(duration) : "0:00"}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center items-center gap-6 mt-auto pb-3">
                <button
                  onClick={prev}
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-500 transition"
                >
                  <SkipBack size={22} fill="currentColor" />
                </button>

                <button
                  onClick={() =>
                    isCurrent && playing ? pause() : play(m)
                  }
                  className={`
                    p-4 rounded-full text-white transition-all
                    ${
                      isPlaying
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-blue-600 hover:bg-blue-700"
                    }
                    shadow-lg active:scale-90
                  `}
                >
                  {isPlaying ? (
                    <Square size={22} fill="currentColor" />
                  ) : (
                    <Play size={22} fill="currentColor" />
                  )}
                </button>

                <button
                  onClick={next}
                  className="text-gray-500 dark:text-gray-300 hover:text-blue-500 transition"
                >
                  <SkipForward size={22} fill="currentColor" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Equalizer animation */}
      <style>{`
        @keyframes musicBar {
          0% { height: 20%; }
          50% { height: 100%; }
          100% { height: 20%; }
        }
        .animate-music-bar {
          height: 20%;
          animation: musicBar 1s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default MusicCard;