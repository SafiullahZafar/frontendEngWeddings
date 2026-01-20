import { useState } from "react"; // ✅ Added useState
import { Image as ImageIcon, ChevronRight, Loader2 } from "lucide-react"; // ✅ Added Loader2

const GalleryCard = ({ groups, setSelectedGroup }) => {
  // SAFELY FILTER GROUPS THAT HAVE ITEMS
  const groupList = Object.keys(groups || {}).filter(
    (g) => Array.isArray(groups[g]) && groups[g].length > 0
  );

  const accentColors = [
    "from-blue-500",
    "from-purple-500",
    "from-emerald-500",
    "from-pink-500",
    "from-orange-500",
    "from-cyan-500",
  ];

  // RANDOM IMAGE HELPER (ONLY IMAGES)
  const getRandomImage = (arr) => {
    if (!arr || arr.length === 0) return null;

    // FILTER OUT VIDEOS
    const imagesOnly = arr.filter((url) => !url.endsWith(".mp4"));

    if (imagesOnly.length === 0) return null;

    const randomIndex = Math.floor(Math.random() * imagesOnly.length);
    return imagesOnly[randomIndex];
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4">
      {/* HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-black dark:text-white uppercase italic tracking-tighter">
          Gallery Groups
        </h1>
        <div className="h-1.5 w-24 bg-blue-600 dark:bg-blue-400 mx-auto mt-4 rounded-full"></div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {groupList.map((g, i) => {
          const firstImage = getRandomImage(groups[g]); // RANDOM IMAGE ONLY
          const itemCount = groups[g]?.length || 0;
          const colorClass = accentColors[i % accentColors.length];
          
          // ✅ NEW: Individual loading state for each card image
          const [isImgLoading, setIsImgLoading] = useState(true);

          return (
            <div
              key={i}
              onClick={() => setSelectedGroup(g)}
              className="group relative h-80 w-full rounded-[2.5rem] overflow-hidden cursor-pointer
                         shadow-xl dark:shadow-black/40
                         transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2
                         border border-black/10 dark:border-white/10"
            >
              {/* IMAGE */}
              <div className="absolute inset-0 z-0">
                {/* ✅ LOADING SPINNER OVERLAY */}
                {isImgLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-200 dark:bg-gray-800 animate-pulse">
                    <Loader2 className="animate-spin text-blue-500" size={32} />
                  </div>
                )}

                <img
                  src={
                    firstImage ||
                    "https://via.placeholder.com/600x400?text=No+Image"
                  }
                  alt={g}
                  // ✅ Triggers when image finishes loading
                  onLoad={() => setIsImgLoading(false)}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 
                    ${isImgLoading ? 'opacity-0' : 'opacity-100'}`}
                />

                <div className={`absolute inset-0 bg-gradient-to-t ${colorClass}/40 to-transparent opacity-60`} />
                <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
              </div>

              {/* COUNT */}
              <div className="absolute top-6 right-6 z-10">
                <div className="bg-black/30 dark:bg-black/50 backdrop-blur-md
                                border border-white/20
                                px-4 py-1.5 rounded-full flex items-center gap-2">
                  <ImageIcon size={14} className="text-white" />
                  <span className="text-white text-xs font-bold">
                    {itemCount} Items
                  </span>
                </div>
              </div>

              {/* TEXT */}
              <div className="absolute inset-x-0 bottom-0 z-10 p-8 pt-20
                              bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <h2 className="text-2xl font-black text-white uppercase tracking-tight mb-2 drop-shadow">
                  {g.replace(/([A-Z])/g, " $1").trim()}
                </h2>

                <div className="flex items-center justify-between">
                  <p className="text-white/70 text-sm font-medium italic">
                    Click to see all
                  </p>

                  <div className={`p-3 rounded-full bg-gradient-to-br ${colorClass} to-transparent
                                  text-white shadow-lg transition-transform duration-300
                                  group-hover:translate-x-2`}>
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryCard;