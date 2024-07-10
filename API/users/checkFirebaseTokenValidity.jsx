import firebase from "firebase/app";
import "firebase/auth";

export const checkFirebaseTokenValidity = async (token) => {
  try {
    // Виконуємо перевірку токена за допомогою методу signInWithCustomToken
    await firebase.auth().signInWithCustomToken(token);
    // Якщо токен ще дійсний, функція signInWithCustomToken поверне успішний об'єкт користувача
    // Тоді можна припустити, що токен ще дійсний
    return true;
  } catch (error) {
    // Якщо сталася помилка, токен вже не дійсний
    return false;
  }
};