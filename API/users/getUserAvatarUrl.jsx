import admin from "firebase-admin";
import serviceAccount from "../../firebase/serviceAccountKey.json" assert { type: "json" };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export const  getUserAvatarUrl = async(uid) =>{
  try {
    const userRecord = await admin.auth().getUser(uid);
    return userRecord.photoURL;
  } catch (error) {
    console.error("Помилка при отриманні даних користувача:", error);
    return null;
  }
}