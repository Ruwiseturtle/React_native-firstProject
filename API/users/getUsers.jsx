import { ref, get } from "firebase/database";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const getUsersFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));

    const posts = snapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));

    return posts;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
