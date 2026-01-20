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
        setCurrent(res.data[0]); // same behavior as before
      })
      .catch(() => {});
  }, []);

  /* ===============================
     INIT AUDIO
  =============================== */
  useEffect(() => {
    if (!audioRef.current && current) {
      audioRef.current = new Audio(current.url);
      audioRef.current.loop = true;
    }
  }, [current]);

  /* ===============================
     UPDATE SRC ON SONG CHANGE
  =============================== */
  useEffect(() => {
    if (!audioRef.current || !current) return;

    audioRef.current.src = current.url;
    audioRef.current.loop = true;

    if (playing) {
      audioRef.current.play().catch(() => {});
    }
  }, [current, playing]);   // 🔥 IMPORTANT

  /* ===============================
     PLAY / PAUSE
  =============================== */
  useEffect(() => {
    if (!audioRef.current) return;

    if (playing) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  /* ===============================
     PROGRESS TRACKING
  =============================== */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const update = () => {
      const value = (audio.currentTime / audio.duration) * 100 || 0;
      setProgress(value);
      setCurrentTime(audio.currentTime || 0);
      setDuration(audio.duration || 0);
    };

    audio.addEventListener("timeupdate", update);
    audio.addEventListener("loadedmetadata", update);

    return () => {
      audio.removeEventListener("timeupdate", update);
      audio.removeEventListener("loadedmetadata", update);
    };
  }, [current]);  // 🔥 IMPORTANT

  /* ===============================
     CONTROLS (UNCHANGED LOGIC)
  =============================== */
  const play = (song) => {
    setCurrent(song);
    setPlaying(true);
  };

  const pause = () => setPlaying(false);

  const toggle = () => setPlaying((p) => !p);

  const next = () => {
    if (!musicList.length || !current) return;

    const idx = musicList.findIndex((m) => m.title === current.title);
    const nextSong = musicList[(idx + 1) % musicList.length];
    setCurrent(nextSong);
    setPlaying(true);
  };

  const prev = () => {
    if (!musicList.length || !current) return;

    const idx = musicList.findIndex((m) => m.title === current.title);
    const prevSong =
      musicList[(idx - 1 + musicList.length) % musicList.length];
    setCurrent(prevSong);
    setPlaying(true);
  };

  const seek = (value) => {
    if (!audioRef.current) return;

    // 🔒 GUARD AGAINST NaN
    const dur = audioRef.current.duration || 0;
    if (!dur || isNaN(dur)) return;

    const seekTime = (value / 100) * dur;
    audioRef.current.currentTime = seekTime;
  };

  return (
    <MusicContext.Provider
      value={{
        current,
        playing,
        progress,
        currentTime,
        duration,
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
