import "dotenv/config";

export default {
  expo: {
    name: "YourAppName",
    slug: "your-app-slug",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
      FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
      FIREBASE_DATABASE_URL: process.env.FIREBASE_DATABASE_URL,
      FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
      FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
      FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
      FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
      serviceAccountKey_private_key: process.env.serviceAccountKey_private_key,
      SERVICE_ACCOUNT_PRIVATE_KEY_ID:
        process.env.SERVICE_ACCOUNT_PRIVATE_KEY_ID,
      SERVICE_ACCOUNT_TYPE: process.env.SERVICE_ACCOUNT_TYPE,
      SERVICE_ACCOUNT_CLIENT_EMAIL: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
      SERVICE_ACCOUNT_CLIENT_ID: process.env.SERVICE_ACCOUNT_CLIENT_ID,
      SERVICE_ACCOUNT_AUTH_URI: process.env.SERVICE_ACCOUNT_AUTH_URI,
      SERVICE_ACCOUNT_TOKEN_URI: process.env.SERVICE_ACCOUNT_TOKEN_URI,
      SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL:
        process.env.SERVICE_ACCOUNT_AUTH_PROVIDER_X509_CERT_URL,
      SERVICE_ACCOUNT_CLIENT_X509_CERT_URL:
        process.env.SERVICE_ACCOUNT_CLIENT_X509_CERT_URL,
      SERVICE_ACCOUNT_UNIVERSE_DOMAIN:
        process.env.SERVICE_ACCOUNT_UNIVERSE_DOMAIN,
      
    },
  },
};
