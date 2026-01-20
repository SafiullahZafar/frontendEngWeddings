import { useState, useRef } from "react";
import axios from "axios";
import { UploadCloud, X } from "lucide-react";
import toast from "react-hot-toast";

const UploadDashboard = () => {
  const [files, setFiles] = useState([]);
  const [group, setGroup] = useState("group1");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles);
    setFiles((prev) => [...prev, ...fileArray]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const onDrop = (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer.files);
  };

  const submit = async () => {
    if (files.length === 0) {
      toast.error("Select files to upload");
      return;
    }

    try {
      setLoading(true);

      for (const file of files) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("group", group);

        await axios.post(
          `https://backendengwedding.onrender.com/api/upload/${group}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      toast.success("All files uploaded successfully");
      setFiles([]);
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-[#0B1A33]
                    rounded-3xl shadow-xl p-6 md:p-10
                    border border-black/10 dark:border-white/10">

      {/* HEADER */}
      <h1 className="text-3xl md:text-4xl font-black mb-6 text-black dark:text-white">
        Upload Gallery Media
      </h1>

      {/* GROUP SELECT */}
      <select
        value={group}
        onChange={(e) => setGroup(e.target.value)}
        className="w-full mb-6 p-3 rounded-xl
                   bg-gray-100 dark:bg-black/40
                   text-black dark:text-white
                   border border-black/10 dark:border-white/10"
      >
        <option value="group1">Group 1</option>
        <option value="group2">Group 2</option>
        <option value="group3">Group 3</option>
        <option value="group4">Group 4</option>
        <option value="group5">Group 5</option>
        <option value="group6">Group 6</option>
      </select>

      {/* DROP ZONE */}
      <div
        onDrop={onDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
        className="border-2 border-dashed border-blue-500
                   rounded-2xl p-10 text-center cursor-pointer
                   hover:bg-blue-50 dark:hover:bg-white/5
                   transition"
      >
        <UploadCloud size={48} className="mx-auto text-blue-500 mb-4" />
        <p className="font-bold text-lg text-black dark:text-white">
          Drag & Drop files here
        </p>
        <p className="text-sm text-black/60 dark:text-white/60">
          or click to browse (images & videos)
        </p>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {/* PREVIEW (HORIZONTAL SCROLL) */}
      {files.length > 0 && (
        <div className="mt-8">
          <h2 className="text-lg font-bold mb-4 text-black dark:text-white">
            Preview
          </h2>

          <div className="preview-scroll">
            {files.map((file, idx) => {
              const url = URL.createObjectURL(file);
              const isVideo = file.type.startsWith("video");

              return (
                <div
                  key={idx}
                  className="relative rounded-xl overflow-hidden
                             border border-black/10 dark:border-white/10
                             flex-shrink-0
                             w-[45%] md:w-[22%] h-32"
                >
                  {isVideo ? (
                    <video src={url} className="h-full w-full object-cover" />
                  ) : (
                    <img src={url} className="h-full w-full object-cover" />
                  )}

                  <button
                    onClick={() => removeFile(idx)}
                    className="absolute top-2 right-2 bg-black/60
                               text-white rounded-full p-1"
                  >
                    <X size={16} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* UPLOAD BUTTON */}
      <button
        onClick={submit}
        disabled={loading}
        className="mt-8 w-full py-4 rounded-full
                   bg-blue-600 hover:bg-blue-700
                   text-white font-bold text-lg
                   transition disabled:opacity-50"
      >
        {loading ? "Uploading..." : "Upload Files"}
      </button>
    </div>
  );
};

export default UploadDashboard;