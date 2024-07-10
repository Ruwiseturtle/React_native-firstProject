import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase/config";

export const addCommentPost = async (idPost, newComment, userId) => {
  try {
    // Отримуємо посилання на документ поста
    const postRef = doc(db, "posts", idPost);

    // Оновлюємо документ поста, додаючи новий коментар
    await updateDoc(postRef, {
      comments: arrayUnion(newComment),
    });

    console.log("Коментар додано успішно!");
  } catch (error) {
    console.error("Помилка при додаванні коментаря: ", error);
  }
};