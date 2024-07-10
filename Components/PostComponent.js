import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const PostComponent = ({ post, userId, urlAvatar }) => {
  const navigation = useNavigation();
  const [numberComments, setNumberComments] = useState(
    post.comments ? post.comments.length : 0
  );

  //слідкуємо за поновленням пстів
  useEffect(() => {
    const postRef = doc(db, "posts", post.idPost);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        const updatedComments = doc.data().comments || [];
        setNumberComments(updatedComments.length);
      } else {
        console.log("Документ не існує!");
      }
    });

    return () => unsubscribe();
  }, [post.idPost]);

  const toComments = () => {
    navigation.navigate("CommentsScreen", { post, userId, urlAvatar });
  };

  const toMap = () => {
    navigation.navigate("MapScreen");
  };

  return (
    <View style={styles.containerPost}>
      <Image
        source={{ uri: post.imageUrl }}
        style={[styles.imagePost, { width: 343, height: 240 }]}
      />
      <Text style={styles.titlePost}>{post.title}</Text>
      <View style={styles.comentsAndMap}>
        <View style={styles.boxComments}>
          <Pressable post={post} onPress={toComments}>
            <Image
              source={require("../assets/pngMessage.png")}
              style={[styles.imageComents, { width: 24, height: 24 }]}
            />
          </Pressable>
          <Text style={styles.countComents}>{numberComments}</Text>
        </View>
        {/* <Text>а тут буде карта</Text> */}
        <Pressable style={styles.mapContainer} post={post} onPress={toMap}>
          <Image
            source={require("../assets/pngMap.png")}
            style={[styles.imageComents, { width: 24, height: 24 }]}
          />
          <Text style={styles.textAdress}>{post.adress}</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerPost: {
    width: 343,
    height: 299,
    // backgroundColor: "green",
    marginBottom: 32,
  },
  imagePost: {
    marginBottom: 8,
  },
  titlePost: {
    fontFamily: "Roboto",
    fontWeight: "500",
    fontSize: 16,
    lineHeight: 18.75,
    marginBottom: 8,
  },
  comentsAndMap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 24,
    // backgroundColor: "brown",
  },
  imageComents: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
  countComents: {
    marginRight: 49,
  },
  mapContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  textAdress: {
    color: "black",
  },
  boxComments: {
    flexDirection: "row",
  },
});
export default PostComponent;
