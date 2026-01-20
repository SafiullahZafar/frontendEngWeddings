import { useEffect, useState, useRef } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Play,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const GalleryGroupView = ({ groupName, images = [], close }) => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [introIndex, setIntroIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // ✅ KEEPING: Separate ref for modal video only
  const modalVideoRef = useRef(null);

  // ✅ KEEPING: Track video state
  const [isVideoPaused, setIsVideoPaused] = useState(true);

  // ✅ KEEPING: Loading state
  const [isLoading, setIsLoading] = useState(true);

  // ✅ NEW: local copy of images to update after delete
  const [localImages, setLocalImages] = useState(images);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  /* ===============================
      LOCK BODY SCROLL
  =============================== */
  useEffect(() => {
    document.body.style.overflow =
      currentIndex !== null || showIntro ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [currentIndex, showIntro]);

  /* ===============================
      KEYBOARD (DESKTOP)
  =============================== */
  useEffect(() => {
    const handleKey = (e) => {
      if (currentIndex === null) return;
      if (e.key === "Escape") setCurrentIndex(null);
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [currentIndex]);

  /* ===============================
      NAVIGATION (FIXED FOR ALL ASSETS)
  =============================== */
  const prev = () => {
    if (currentIndex === null) return;
    setIsLoading(true); // Reset loading for next item
    setCurrentIndex((prevIdx) =>
      prevIdx === 0 ? localImages.length - 1 : prevIdx - 1
    );
  };

  const next = () => {
    if (currentIndex === null) return;
    setIsLoading(true); // Reset loading for next item
    setCurrentIndex((prevIdx) =>
      prevIdx === localImages.length - 1 ? 0 : prevIdx + 1
    );
  };

  // ✅ KEEPING: Pause video before navigating
  const handlePrev = () => {
    if (modalVideoRef.current && !modalVideoRef.current.paused) {
      modalVideoRef.current.pause();
      setIsVideoPaused(true);
    }
    prev();
  };

  // ✅ KEEPING: Pause video before navigating
  const handleNext = () => {
    if (modalVideoRef.current && !modalVideoRef.current.paused) {
      modalVideoRef.current.pause();
      setIsVideoPaused(true);
    }
    next();
  };

  /* ===============================
      MOBILE SWIPE
  =============================== */
  const onTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) diff > 0 ? handleNext() : handlePrev();
  };

  /* ===============================
      INTRO ANIMATION
  =============================== */
  const introMax = Math.min(12, localImages.length);
  const introList = localImages.slice(0, introMax);

  useEffect(() => {
    if (!showIntro || introList.length === 0) return;

    const timer = setTimeout(() => {
      setIntroIndex((prev) =>
        prev + 1 >= introList.length ? prev : prev + 1
      );
    }, 1700);

    if (introIndex >= Math.min(2, introList.length - 1)) {
      setTimeout(() => setShowIntro(false), 1700);
    }

    return () => clearTimeout(timer);
  }, [introIndex, showIntro, introList]);

  const getAnimation = (idx) => {
    const order = idx % 3;
    if (order === 0) return "animate-from-top";
    if (order === 1) return "animate-from-bottom";
    return "animate-from-corner";
  };

  /* ===============================
      INTRO FULLSCREEN VIEW
  =============================== */
  if (showIntro && introList.length > 0) {
    const item = introList[introIndex];

    return (
      <div className="fixed inset-0 z-[999] bg-black flex items-center justify-center">
        {item?.split("?")[0].toLowerCase().endsWith(".mp4") ? (
          <video autoPlay className="w-full h-full object-contain">
            <source src={item} type="video/mp4" />
          </video>
        ) : (
          <img
            src={item}
            className="w-full h-full object-contain"
            alt=""
          />
        )}
      </div>
    );
  }

  /* ===============================
      SPLIT IMAGES AND VIDEOS FOR GRID
  =============================== */
  const imageItems = localImages.filter(
    (i) => !i.split("?")[0].toLowerCase().endsWith(".mp4")
  );
  const videoItems = localImages.filter((i) =>
    i.split("?")[0].toLowerCase().endsWith(".mp4")
  );

  // ✅ NEW: DELETE FUNCTION (Works for images + videos)
  const handleDelete = async () => {
    try {
      const urlToDelete = localImages[currentIndex];

      // API call to backend delete endpoint
      await axios.delete(
        `https://backendengwedding.onrender.com/api/gallery/delete`,
        {
          data: { url: urlToDelete, group: groupName },
        }
      );

      // Update local state (remove deleted item)
      const updated = [...localImages];
      updated.splice(currentIndex, 1);
      setLocalImages(updated);

      setCurrentIndex(null);
      toast.success("Deleted successfully");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 min-h-screen">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-8 bg-white/70 dark:bg-black/40 backdrop-blur-xl p-4 md:p-6 rounded-2xl border border-black/10 dark:border-white/10">
        <button
          onClick={close}
          className="flex z-50 items-center gap-2 font-bold md:hidden text-black dark:text-white"
        >
          <ArrowLeft size={22} />
          Back
        </button>

        <div className="hidden md:block text-center">
          <h2 className="text-4xl font-black uppercase italic text-black dark:text-white">
            {groupName}
          </h2>
          <p className="text-blue-600 dark:text-blue-400 font-bold text-sm tracking-widest mt-1">
            EXPLORING {localImages.length} ASSETS
          </p>
        </div>

        <button
          onClick={close}
          className="hidden z-50 md:flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 hover:bg-red-600 text-white font-bold transition"
        >
          <X size={20} />
          BACK
        </button>
      </div>

      {/* ================= IMAGES GRID ================= */}
      {imageItems.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-white">Images</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-10">
            {imageItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(localImages.indexOf(item));
                }}
                className={`relative aspect-square rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg
                            bg-white dark:bg-[#1A2235]
                            border border-black/10 dark:border-white/10
                            ${getAnimation(idx)}`}
              >
                <img
                  src={item}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  alt=""
                />
              </div>
            ))}
          </div>
        </>
      )}

      {/* ================= VIDEOS GRID ================= */}
      {videoItems.length > 0 && (
        <>
          <h2 className="text-xl font-bold mb-4 text-white">Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {videoItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setIsLoading(true);
                  setCurrentIndex(localImages.indexOf(item));
                }}
                className={`relative aspect-square rounded-[1.5rem] overflow-hidden cursor-pointer shadow-lg
                            bg-white dark:bg-[#1A2235]
                            border border-black/10 dark:border-white/10
                            ${getAnimation(idx)}`}
              >
                <div className="relative w-full h-full">
                  <video className="w-full h-full object-cover">
                    <source src={item} type="video/mp4" />
                  </video>
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Play className="text-white" size={40} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* MODAL */}
      {currentIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            className="md:hidden z-50 absolute top-6 left-4 text-white font-bold bg-black/40 px-4 py-2 rounded-full"
            onClick={() => setCurrentIndex(null)}
          >
            Back
          </button>

          <button
            className="hidden z-50 md:block absolute top-6 right-6 text-white/70 hover:text-white"
            onClick={() => setCurrentIndex(null)}
          >
            <X size={40} />
          </button>

          <button
            className="hidden z-50 md:flex absolute left-4 p-4 rounded-full bg-black/10 text-white"
            onClick={handlePrev}
          >
            <ChevronLeft size={48} />
          </button>

          <button
            className="hidden z-50 md:flex absolute right-4 p-4 rounded-full bg-black/10 text-white"
            onClick={handleNext}
          >
            <ChevronRight size={48} />
          </button>

          {/* ✅ DELETE BUTTON */}
          <button
            className="absolute top-6 right-20 z-50 px-4 py-2 rounded-full bg-red-600 text-white font-bold"
            onClick={handleDelete}
          >
            Delete
          </button>

          <div className="w-full h-full flex items-center justify-center px-4">
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 z-10">
                <div className="text-white font-bold animate-pulse">
                  Loading...
                </div>
              </div>
            )}

            {localImages[currentIndex]
              ?.split("?")[0]
              .toLowerCase()
              .endsWith(".mp4") ? (
              <video
                key={localImages[currentIndex]} // Key forces re-render on index change
                ref={modalVideoRef}
                autoPlay
                controls
                className="w-full h-full object-contain"
                onPlay={() => {
                  setIsVideoPaused(false);
                  setIsLoading(false);
                }}
                onPause={() => setIsVideoPaused(true)}
                onLoadedData={() => setIsLoading(false)}
              >
                <source src={localImages[currentIndex]} type="video/mp4" />
              </video>
            ) : (
              <img
                key={localImages[currentIndex]}
                src={localImages[currentIndex]}
                className="w-full h-full object-contain"
                alt=""
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            )}
          </div>

          <div className="absolute bottom-6 text-white/40 text-sm font-mono">
            {currentIndex + 1} / {localImages.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryGroupView;