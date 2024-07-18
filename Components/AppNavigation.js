import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, View } from "react-native";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import TabNavigation from "../Screens/TabNavigation";
import CommentsScreen from "../Screens/CommentsScreen";
import PostsScreen from "../Screens/PostsScreen";
import MapScreen from "../Screens/MapScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { checkFirebaseTokenValidity } from "../API/users/checkFirebaseTokenValidity";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const [validToken, setValidToken] = useState(false);

    useEffect(()  => {
      const getToken = async () => {
        const storegToken = await AsyncStorage.getItem("auth"); // витягуємо токен зі стореджу
        const isValidToken = storegToken && ( await checkFirebaseTokenValidity(storegToken)); // через метод перевіряємо токен на валідність 
        setValidToken(isValidToken);
      };
      getToken();
   }, [] ); 



  return (
    <>
      {validToken ? (
        <>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Home"
                  // component={PostsScreen}
                  component={TabNavigation}
                  options={{
                    headerShown: false,
                    headerTitleAlign: "center",
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegistrationScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="CreatePostsScreen"
                  component={TabNavigation}
                  options={{
                    title: "Створити публікацію",
                    headerTitleAlign: "center",
                  }}
                />
                <Stack.Screen
                  name="ProfileScreen"
                  component={TabNavigation}
                  options={{ title: "Профіль", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                  name="CommentsScreen"
                  component={CommentsScreen}
                  options={{
                    title: "Коментарі",
                    headerTitleAlign: "center",
                    backgroundColor: "#ffffff",
                  }}
                />
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
          </View>
        </>
      ) : (
        <>
          <View style={styles.container}>
            <NavigationContainer>
              <Stack.Navigator>
                <Stack.Screen
                  name="Login"
                  component={LoginScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Register"
                  component={RegistrationScreen}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Home"
                  // component={PostsScreen}
                  component={TabNavigation}
                  options={{
                    headerShown: false,
                    headerTitleAlign: "center",
                  }}
                />
                <Stack.Screen
                  name="CreatePostsScreen"
                  component={TabNavigation}
                  options={{
                    title: "Створити публікацію",
                    headerTitleAlign: "center",
                  }}
                />
                <Stack.Screen
                  name="ProfileScreen"
                  component={TabNavigation}
                  options={{ title: "Профіль", headerTitleAlign: "center" }}
                />
                <Stack.Screen
                  name="CommentsScreen"
                  component={CommentsScreen}
                  options={{
                    title: "Коментарі",
                    headerTitleAlign: "center",
                    backgroundColor: "#ffffff",
                  }}
                />
                {/* <Stack.Screen
            name="PostsScreen" ddd
            component={PostsScreen}
            options={{ title: "Коментарі", headerTitleAlign: "center" }}
          /> */}
                <Stack.Screen
                  name="MapScreen"
                  component={MapScreen}
                  options={{ headerShown: false }}
                />
              </Stack.Navigator>
            </NavigationContainer>
            <StatusBar style="auto" />
          </View>
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
});

export default AppNavigation;
