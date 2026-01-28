// src/utils/Images.js

// HOME CARD IMAGES
import Homecard1 from "../assets/images/Homecard1.jpg";
import Home2 from "../assets/images/Homecard2.jpg";
import Home3 from "../assets/images/Homecard3.jpg";
import Home4 from "../assets/images/Homecard4.jpg"; // ✅ Added Home4

// MUSIC THUMB
import MusicThumb from "../assets/images/music.jpg";

// ✅ Added Home4 to individual exports
export { Homecard1, Home2, Home3, Home4, MusicThumb };

// Keep this if other files use it
export const cardImages = {
  Homecard1,
  Home2,
  Home3,
  Home4, // ✅ Added Home4 to the object
  MusicThumb,
};