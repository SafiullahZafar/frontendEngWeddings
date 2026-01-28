import { createContext, useContext, useState } from "react";

const EditContext = createContext();

export const useEdit = () => useContext(EditContext);

export const EditProvider = ({ children }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <EditContext.Provider value={{ selectedImage, setSelectedImage }}>
      {children}
    </EditContext.Provider>
  );
};