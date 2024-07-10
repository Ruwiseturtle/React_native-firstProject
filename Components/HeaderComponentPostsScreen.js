import React from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setCurrentUser, setToken } from "../redux/auth/authReducer";
import { auth } from "../firebase/config";
import { onAuthStateChanged } from "firebase/auth";

const HeaderPostsScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const HandleLogOut = async () => {
    try {
      dispatch(setCurrentUser(null));
      // dispatch(setToken(null));
      await auth.signOut(); // в Firebase SDK автоматично відбувається видалення токену аутентифікації користувача з поточного пристрою (із сторедж)
      navigation.navigate("Login");
    } catch (error) {
      console.log('===============error=====================');
      console.log(error);
      console.log('====================================');
    }
    
  };

  // компон
  return (
    <View style={styles.container}>
      <Text style={styles.textHeader}>Публікації</Text>
      
        <Pressable onPress={HandleLogOut} style={styles.imageContainer}>
          <Image
            source={require("../assets/pngExit.png")}
            tintColor="grey"
            style={styles.image}
          ></Image>
        </Pressable>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 88,
    backgroundColor: "##FFFFFF",
    paddingTop: 44,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "space-around",
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 0.2,
    borderColor: "#212121",
  },
  textHeader: {
    fontSize: 17,
    fontFamily: "Roboto",
    fontWeight: "500",
    lineHeight: 22,
    letterSpacing: -0.41,
    textAlign: "center",
    alignItems: "center",
  },
  imageContainer: {
    position: "absolute",
    top: 55,
    right: 10,
    width: 24,
    height: 24,
  },
  image: {
    flex: 1, // Растягиваем изображение на всю доступную ширину контейнера
  },
});

export default HeaderPostsScreen;
