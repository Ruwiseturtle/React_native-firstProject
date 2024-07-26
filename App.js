import AppNavigation from "./Components/AppNavigation";
import "react-native-gesture-handler";
// import  { useState, useEffect } from "react";
import { Text } from "react-native";
import { useFonts } from "expo-font";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store from "./redux/store";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Inter-Black": require("./assets/fonts/inter-black.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store.store}>
      <PersistGate
        loading={<Text>Loading...</Text>}
        persistor={store.persistor}
      >
    <AppNavigation />
       </PersistGate>
      </Provider>
  );
}
