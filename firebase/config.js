import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import firebase from "firebase/app";
import "firebase/firestore";

// для витягування секретних змінних з файлу app.config.json (в який витягнули ці змінні з .env)
import Constants from "expo-constants";
const { extra } = Constants.expoConfig;

export const firebaseConfig = {
  //для firestore database
  apiKey: extra.FIREBASE_API_KEY,
  authDomain: extra.FIREBASE_AUTH_DOMAIN,
  databaseURL: extra.FIREBASE_DATABASE_URL,
  projectId: extra.FIREBASE_PROJECT_ID,
  storageBucket: extra.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: extra.FIREBASE_MESSAGING_SENDER_ID,
  appId: extra.FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});


export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);