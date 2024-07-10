import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { combineReducers } from "redux";
import { combineReducers } from "@reduxjs/toolkit";
import { postsReducer } from "./posts/postsReducer";
import { usersReducer } from "./users/usersReducer";
import { authReducer } from "./auth/authReducer";
import { createPostReducer } from "./createPost/createPostsReducer";

// шаг 1 Створення кореневого редуктора: Об'єднуємо всі наші редуктори в один кореневий редуктор за допомогою функції combineReducers з бібліотеки Redux
const rootReducer = combineReducers({
  postsStore: postsReducer,
  usersStore: usersReducer,
  authStore: authReducer,
  createPostStore: createPostReducer,
  // Додати інші редуктори тут
});

// шаг 2. Створення об'єкта конфігурації для персистента (за бажанням): Якщо плануємо зберігати стан Redux в локальному сховищі(наприклад, AsyncStorage в React Native), нам потрібно створити об'єкт конфігурації для персистента.
const persistConfig = {
  key: "auth", // ключ, який використовується для збереження даних в локальному сховищі
  storage: AsyncStorage, //об'єкт збереження, який вказує, де зберігати дані
  whitelist: ["auth"],
};

const reducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const persistor = persistStore(store);

export default { store, persistor };


// імпортувала AsyncStorage з @react-native-async-storage/async-storage, щоб використовувати його для зберігання стану Redux в локальному сховищі
// імпортувала кореневий редуктор rootReducer з файлу rootReducer.js
// об'єднала всі редуктори в один кореневий редуктор за допомогою функції combineReducers з Redux
// створила об'єкт конфігурації для персистента (локального сховища) з ключем "root" та AsyncStorage як зберіганням
// застосувала persistReducer до мого кореневого редуктора для створення персистентного редуктора
// використала configureStore, щоб створити магазин Redux з використанням попередньо налаштованих параметрів, таких як середовище
// створила персистентний магазин за допомогою persistStore