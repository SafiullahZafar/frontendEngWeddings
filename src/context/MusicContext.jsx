import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";

const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const audioRef = useRef(null);

  const [musicList, setMusicList] = useState([]);
  const [current, setCurrent] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  /* ===============================
      FETCH MUSIC FROM BACKEND
  =============================== */
  useEffect(() => {
    axios
      .get("https://backendengwedding.onrender.com/api/music")
      .then((res) => {
        setMusicList(res.data);
        if (res.data.length > 0) {
          setCurrent(res.data[0]); 
        }
      })
      .catch(() => {});
  }, []);

  /* ===============================
      SINGLE AUDIO INITIALIZATION
  =============================== */
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.preload = "metadata"; // ✅ Encourages browser to find ending time faster
    }

    const audio = audioRef.current;

    const updateProgress = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        const value = (audio.currentTime / audio.duration) * 100;
        setProgress(value);
        setCurrentTime(audio.currentTime);
        setDuration(audio.duration); // ✅ Keeps duration in sync
      }
    };

    // ✅ NEW: Ensures ending time is visible as soon as the file starts loading
    const handleMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration);
      }
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleMetadata);
    audio.addEventListener("durationchange", handleMetadata); // ✅ Backup for slow networks
    audio.addEventListener("play", () => setPlaying(true));
    audio.addEventListener("pause", () => setPlaying(false));

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleMetadata);
      audio.removeEventListener("durationchange", handleMetadata);
      audio.removeEventListener("play", () => setPlaying(true));
      audio.removeEventListener("pause", () => setPlaying(false));
    };
  }, []);

  /* ===============================
      UPDATE SRC ON SONG CHANGE
  =============================== */
  useEffect(() => {
    if (!audioRef.current || !current) return;

    if (audioRef.current.src !== current.url) {
      audioRef.current.src = current.url;
      audioRef.current.load();
      
      // ✅ Reset progress when switching songs
      setProgress(0);
      setCurrentTime(0);
      setDuration(0); // Reset duration so the new song's time can load fresh
      
      if (playing) {
        audioRef.current.play().catch(() => {});
      }
    }
  }, [current]);

  /* ===============================
      SYNC PLAY/PAUSE STATE
  =============================== */
  useEffect(() => {
    if (!audioRef.current || !audioRef.current.src) return;
    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  /* ===============================
      CONTROLS (YOUR LOGIC KEPT INTACT)
  =============================== */
  const play = (song) => {
    if (current?.url === song.url) {
      setPlaying(true);
    } else {
      setCurrent(song);
      setPlaying(true);
    }
  };

  const pause = () => setPlaying(false);
  const toggle = () => setPlaying((p) => !p);

  const next = () => {
    if (!musicList.length || !current) return;
    const idx = musicList.findIndex((m) => m.url === current.url);
    const nextSong = musicList[(idx + 1) % musicList.length];
    setCurrent(nextSong);
    setPlaying(true);
  };

  const prev = () => {
    if (!musicList.length || !current) return;
    const idx = musicList.findIndex((m) => m.url === current.url);
    const prevSong = musicList[(idx - 1 + musicList.length) % musicList.length];
    setCurrent(prevSong);
    setPlaying(true);
  };

  const seek = (value) => {
    if (!audioRef.current || !audioRef.current.duration) return;
    const seekTime = (value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = seekTime;
    setProgress(value);
  };

  return (
    <MusicContext.Provider
      value={{
        current,
        playing,
        progress,
        currentTime,
        duration,
        musicList, // Added this to the provider so your UI can map over it
        play,
        pause,
        toggle,
        next,
        prev,
        seek,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => useContext(MusicContext);