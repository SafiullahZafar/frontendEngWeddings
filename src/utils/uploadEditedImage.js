import axios from "axios";

const uploadEditedImage = async (dataURL, group) => {
  const blob = await fetch(dataURL).then((r) => r.blob());

  const formData = new FormData();
  formData.append("file", blob);
  formData.append("group", group);

  await axios.post(
    `https://backendengwedding.onrender.com/api/upload/${group}`,
    formData
  );
};

export default uploadEditedImage;
