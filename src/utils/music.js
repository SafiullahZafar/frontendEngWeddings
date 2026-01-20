import axios from "axios";

export const fetchMusicList = async () => {
  const res = await axios.get("https://backendengwedding.onrender.com/api/music");
  return res.data;
};