import React from 'react'
import { View, Pressable, Image, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const BoxMainAvatarComponents = ({ currentUser }) => {
  const navigation = useNavigation();

  const goPersonalCabinet = () => {
    navigation.navigate("ProfileScreen");
  };


  return (
    <View style={styles.boxUserInfo}>
      <View style={styles.boxMainAvatar}>
        <Pressable style={styles.imageMainAvatar} onPress={goPersonalCabinet}>
          <Image
            source={{ uri: currentUser.photoURL }}
            style={[styles.mainAvatar, { width: 60, height: 60 }]}
          />
        </Pressable>
        <View style={styles.boxInfoUser}>
          <Text
            style={styles.textNameAvatar}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentUser.login}
          </Text>
          <Text
            style={styles.textEmailAvatar}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {currentUser.email}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  postsContainer: {
    width: 171,
    height: 60,
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
  },
  //контейнер з фото та імям юзера

  boxUserInfo: {
    width: 171,
    height: 60,
    marginBottom: 32,
    // backgroundColor: "#B84747",
  },
  boxMainAvatar: {
    flexDirection: "row",
    width: 60,
    height: 60,
    backgroundColor: "green",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageMainAvatar: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    marginRight: 8,
  },
  mainAvatar: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  boxInfoUser: {
    width: 103,
    justifyContent: "center",
  },
  textNameAvatar: {
    fontFamily: "Roboto",
    fontWeight: "700",
    fontSize: 13,
    lineHeight: 15,
    letterSpacing: 0,
  },
  textEmailAvatar: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 11,
    lineHeight: 13,
    letterSpacing: 0,
  },
});

export default BoxMainAvatarComponents
