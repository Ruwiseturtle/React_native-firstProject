import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config"; // Імпорт конфігурації вашого Firestore

export const updateUserAvatarURL = async (userID, newAvatarURL) => {
  
  try {
    // Створюємо посилання на документ користувача
    const userDocRef = doc(db, "users", userID);

    // Оновлюємо поле avatarURL або створюємо документ якщо його не існує
    await setDoc(userDocRef, { avatarURL: newAvatarURL }, { merge: true });

    console.log("Аватарка користувача успішно оновлена.");
  } catch (error) {
    console.error("Помилка при оновленні аватарки користувача:", error);
  }
};
