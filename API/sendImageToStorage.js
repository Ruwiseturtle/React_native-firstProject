import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/config";
import { getFileName } from "../functions/getFileName";

// ф-ція приймає шлях картинки з іменем картинки і вертає назву картинки
export const sendImageToStorage = async (uri) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    const fileName = getFileName(uri);
    const storageRef = ref(storage, `postImages/${fileName}`);
    await uploadBytes(storageRef, blob);

    // Отримуємо URL зображення після завантаження
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};
