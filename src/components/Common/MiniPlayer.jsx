import { useMusic } from "../../context/MusicContext";
import { HiPlay, HiPause, HiVolumeUp } from "react-icons/hi";

const MiniPlayer = () => {
  const {
    current,
    isPlaying,
    setIsPlaying,
    progress,
    volume,
    setVolume,
  } = useMusic();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-white dark:bg-gray-900 rounded-xl shadow-xl p-4 flex items-center gap-4 z-50">
      <div className="flex-1">
        <div className="font-bold text-black dark:text-white">
          {current.title}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {current.artist}
        </div>

        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mt-2">
          <div
            className="h-2 bg-blue-500 dark:bg-blue-400 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="px-4 py-2 rounded-lg bg-black text-white dark:bg-white dark:text-black"
      >
        {isPlaying ? <HiPause /> : <HiPlay />}
      </button>

      <div className="flex items-center gap-2">
        <HiVolumeUp className="text-black dark:text-white" />
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

export default MiniPlayer;