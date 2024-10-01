// require("dotenv").config();
import { config } from "dotenv";
config(); // Завантажує .env файл

module.exports = {
  ANDROID_HOME: process.env.ANDROID_HOME,
  serviceAccountKey_private_key: process.env.serviceAccountKey_private_key,
};