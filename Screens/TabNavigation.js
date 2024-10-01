import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PostsScreen from "./PostsScreen";
import CreatePostsScreen from "./CreatePostsScreen";
import ProfileScreen from "./ProfileScreen";
import { Image, View, Text, StyleSheet } from "react-native";
import CustomHeaderBackButton from "../Components/CustomHeaderBackButton";
import React from "react";

const Tab = createBottomTabNavigator();

function TabNavigation() {
  
   
  
  return (
    <Tab.Navigator
      sceneContainerStyle={{ backgroundColor: "#E5E5E5" }}
      screenOptions={{
        tabBarStyle: {
          // стили для контейнера нижнего меню
          height: 83,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          backgroundColor: "#FFFFFF",
          borderColor: "#212121",
          // paddingHorizontal: 16,
        },
        tabStyle: {
          flex: 1,
          // paddingVertical: 16,
        },
      }}
    >
      <Tab.Screen
        name="PostsScreen"
        component={PostsScreen}
        options={{
          headerShown: false,

          // headerTitle: "Публікації",
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 0, color: "red" }}>Публікації</Text>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={[
                styles.containerIcon,
                { backgroundColor: focused ? "#FF6C00" : "#ffffff" },
              ]}
            >
              <Image
                source={require("../assets/pngPosts.png")}
                tintColor={focused ? "white" : "rgba(33, 33, 33, 0.8)"}
                style={{ width: 24, height: 24 }}
              ></Image>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreatePostsScreen"
        component={CreatePostsScreen}
        options={{
          headerShown: true,
          headerTitle: "Створити публікацію",
          headerLeft: () => <CustomHeaderBackButton />,
          headerStyle: {
            borderBottomWidth: 1, // Установка толщины границы
            borderBottomColor: "#ccc", // Установка цвета границы
          },
          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 0, color: "red" }}>
              створити публікацію
            </Text>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={[
                styles.containerIcon,
                { backgroundColor: focused ? "#FF6C00" : "#FFFFFF" },
              ]}
            >
              <Image
                source={require("../assets/pngPlus.png")}
                tintColor={focused ? "white" : "#212121"}
                style={{ width: 13, height: 13 }}
              ></Image>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          headerShown: false,
          headerTitle: "Профіль",

          tabBarLabel: ({ focused }) => (
            <Text style={{ fontSize: 0, color: "red" }}>Профіль</Text>
          ),
          headerTitleAlign: "center",
          tabBarIcon: ({ color, focused, size }) => (
            <View
              style={[
                styles.containerIcon,
                { backgroundColor: focused ? "#FF6C00" : "#FFFFFF" },
              ]}
            >
              <Image
                source={require("../assets/pngUser.png")}
                tintColor={focused ? "white" : "#000000"}
                style={{ width: 24, height: 24 }}
              ></Image>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  containerIcon: {
    width: 70,
    height: 40,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    borderBottomRightRadius: 22,
    borderBottomLeftRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default TabNavigation;
