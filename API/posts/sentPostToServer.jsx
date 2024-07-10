
import { Alert } from "react-native";
import { db } from "../../firebase/config";
import { collection, addDoc } from "firebase/firestore";

export const sentPostToServer = async (newPost) => {
  try {
    await addDoc(collection(db, "posts"), newPost);
    Alert.alert(`Пост ${newPost.title} опубліковано!`);
    } catch (error) {
      console.log(error.message);
    }


  // console.log("Sending post to server:", newPost);
  // const postsRef = ref(realtimeDb, "posts");
  // const newPostRef = push(postsRef); // Використовуємо push для створення нового поста з унікальним ключем
  // await set(newPostRef, newPost);
  // Alert.alert(`Пост ${newPost.title} опубліковано!`);

  // // Перевірка даних після збереження
  // console.log("=============== Перевірка даних після збереження ==============");
  // onValue(postsRef, (snapshot) => {
  //   const postsData = snapshot.val();
  //   console.log("Data from server:", postsData);
  // });

  // try {
  //   const postsRef = ref(realtimeDb, "posts"); // Отримуємо референс до колекції "posts"
  //   await push(postsRef, newPost); // Додаємо новий пост
  //   Alert.alert(`Пост ${newPost.title} опубліковано!`);
  // } catch (error) {
  //   console.error("Error adding post: ", error);
  //   Alert.alert("Помилка при додаванні посту. Спробуйте ще раз.");
  // }
};