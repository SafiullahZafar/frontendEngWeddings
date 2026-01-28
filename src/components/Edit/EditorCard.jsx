import { useEffect, useState } from "react";
import { useEdit } from "../../context/EditContext";
import { removeBackground } from "@imgly/background-removal";
import uploadEditedImage from "../../utils/uploadEditedImage";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const EditorCard = () => {
  const { selectedImage, setSelectedImage } = useEdit();
  const navigate = useNavigate();

  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1);
  const [blur, setBlur] = useState(0);

  const [imageUrl, setImageUrl] = useState(null);
  const [loadingBg, setLoadingBg] = useState(false);

  /* LOAD IMAGE FROM CONTEXT */
  useEffect(() => {
    if (selectedImage?.url) {
      setImageUrl(selectedImage.url);
    }
  }, [selectedImage]);

  /* REMOVE BACKGROUND */
  const handleRemoveBg = async () => {
    if (!imageUrl) return;

    try {
      setLoadingBg(true);
      toast.loading("Removing background...", { id: "bg" });

      // 🔥 IMPORTANT: force CORS-safe fetch
      const response = await fetch(imageUrl, {
        mode: "cors",
        cache: "no-cache",
      });

      if (!response.ok) {
        throw new Error("Image fetch failed");
      }

      const blob = await response.blob();

      const resultBlob = await removeBackground(blob, {
        output: {
          format: "image/png",
        },
      });

      const newUrl = URL.createObjectURL(resultBlob);
      setImageUrl(newUrl);

      toast.success("Background removed!", { id: "bg" });
    } catch (err) {
      console.error(err);
      toast.error(
        "Background removal failed. Check CORS or internet.",
        { id: "bg" }
      );
    } finally {
      setLoadingBg(false);
    }
  };

  /* SAVE IMAGE */
  const saveImage = async () => {
    try {
      toast.loading("Saving image...", { id: "save" });

      await uploadEditedImage(imageUrl, selectedImage.group);

      toast.success("Saved successfully!", { id: "save" });
      setSelectedImage(null);
      navigate("/gallery");
    } catch (err) {
      console.error(err);
      toast.error("Save failed!", { id: "save" });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-white rounded-3xl">
      <h2 className="text-2xl font-bold mb-4">Editor</h2>

      {imageUrl && (
        <img
          src={imageUrl}
          className="w-full h-auto rounded-2xl"
          alt="editing"
          style={{
            filter: `brightness(${brightness}) contrast(${contrast}) blur(${blur}px)`,
          }}
        />
      )}

      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <p className="font-bold">Brightness</p>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={brightness}
            onChange={(e) => setBrightness(+e.target.value)}
          />
        </div>

        <div>
          <p className="font-bold">Contrast</p>
          <input
            type="range"
            min="0"
            max="2"
            step="0.01"
            value={contrast}
            onChange={(e) => setContrast(+e.target.value)}
          />
        </div>

        <div>
          <p className="font-bold">Blur</p>
          <input
            type="range"
            min="0"
            max="10"
            step="0.1"
            value={blur}
            onChange={(e) => setBlur(+e.target.value)}
          />
        </div>
      </div>

      <div className="mt-6 flex gap-4">
        <button
          onClick={handleRemoveBg}
          disabled={loadingBg}
          className="bg-purple-600 text-white px-6 py-2 rounded-xl disabled:opacity-50"
        >
          {loadingBg ? "Processing..." : "Remove BG"}
        </button>

        <button
          onClick={saveImage}
          className="bg-blue-600 text-white px-6 py-2 rounded-xl"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditorCard;
