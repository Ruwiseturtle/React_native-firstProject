import { ref, get } from "firebase/database";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";

export const getUsersFromFirestore = async () => {
  try {
    const snapshot = await getDocs(collection(db, "users"));

    const users = snapshot.docs.map((doc) => ({
      key: doc.id,
      ...doc.data(),
    }));


    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
