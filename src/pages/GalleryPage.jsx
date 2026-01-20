import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";

import Sidebar from "../components/Common/Sidebar";
import Footer from "../components/Common/Footer";
import axios from "axios";
import GalleryCard from "../components/Gallery/GalleryCard";
import GalleryGroupView from "../components/Gallery/GalleryGroups";
import TopBar from "../components/Common/TopBar";
import { galleryGroups } from "../data/galleryData";

const GalleryPage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groups, setGroups] = useState({});

  useEffect(() => {
    axios
      .get("https://backendengwedding.onrender.com/api/gallery/groups")
      .then((res) => {
        const backendGroups = res.data;

        const merged = {};

        // 1) Convert Cloudflare groups to single array
        for (let g in galleryGroups) {
          const imgs = galleryGroups[g].images || [];
          const vids = galleryGroups[g].videos || [];
          merged[g] = [...imgs, ...vids];
        }

        // 2) Add backend groups
        for (let g in backendGroups) {
          const arr = backendGroups[g] || [];

          // If backend returns object {images, videos}
          if (arr.images || arr.videos) {
            const backendArr = [
              ...(arr.images || []),
              ...(arr.videos || []),
            ];

            merged[g] = merged[g]
              ? [...merged[g], ...backendArr]
              : backendArr;
          } else {
            // If backend returns already array
            merged[g] = merged[g]
              ? [...merged[g], ...arr]
              : arr;
          }
        }
        setGroups(merged);
      });
  }, []);


  // theme load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // theme apply
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex min-h-screen bg-[#FFEFFF] dark:bg-[#011227] transition-colors duration-300">
      <Sidebar sidebarOpen={sidebarOpen} />

      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <div className="flex-1 flex flex-col">
        <TopBar
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          toggleTheme={() =>
            setTheme((t) => (t === "light" ? "dark" : "light"))
          }
          theme={theme}
        />

        <main className="flex-1 p-6">
          {!selectedGroup && (
            <GalleryCard groups={groups} setSelectedGroup={setSelectedGroup} />
          )}

          {selectedGroup && (
            <GalleryGroupView
              groupName={selectedGroup}
              images={groups[selectedGroup]}
              close={() => setSelectedGroup(null)}
            />
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default GalleryPage;