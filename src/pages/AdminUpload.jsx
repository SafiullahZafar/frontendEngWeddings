import { useState } from "react";
import axios from "axios";

const AdminUpload = () => {
    const [file, setFile] = useState(null);
    const [group, setGroup] = useState("group1");
    const [loading, setLoading] = useState(false);

    const submit = async () => {
        if (!file) return alert("Select a file");

        const formData = new FormData();
        formData.append("file", file);
        formData.append("group", group);

        try {
            setLoading(true);
            await axios.post(
                `https://backendengwedding.onrender.com/api/upload/${group}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );


            alert("Uploaded successfully");
            setFile(null);
        } catch (err) {
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Upload Picture / Video</h1>

            <select
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="w-full mb-4 p-2 border rounded"
            >
                <option value="group1">Group 1</option>
                <option value="group2">Group 2</option>
                <option value="group3">Group 3</option>
                <option value="group4">Group 4</option>
                <option value="group5">Group 5</option>
                <option value="group6">Group 6</option>
            </select>

            <input
                type="file"
                accept="image/*,video/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="mb-4"
            />

            <button
                onClick={submit}
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded"
            >
                {loading ? "Uploading..." : "Upload"}
            </button>
        </div>
    );
};

export default AdminUpload;
