import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminPanel from "./pages/AdminPanel";
import MusicPage from "./pages/MusicPage";
import { MusicProvider } from "./context/MusicContext";
import GalleryPage from "./pages/GalleryPage";
import UploadPage from "./pages/Uploadpage";
import EditPage from "./pages/EditPage";
import NotificationPage from "./pages/NotificationPage";
import InstructionPage from "./pages/InstructionPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <Router>
      <MusicProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<AdminPanel />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/edit" element={<EditPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/instructions" element={<InstructionPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      </MusicProvider>
    </Router>
  );
}

export default App;
