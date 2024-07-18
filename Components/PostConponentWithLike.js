import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Імпорт необхідних функцій
import { db } from "../firebase/config"; // Імпорт конфігурації Firebase

const PostConponentWithLike = ({ post, userId, urlAvatar }) => {
  const navigation = useNavigation();

  const toComments = () => {
   // navigation.navigate("CommentsScreen", { post: { post }, userId: userId });
    navigation.navigate("CommentsScreen", { post, userId, urlAvatar });
  };

  const addLike = async () => {
    console.log("добавляємо лайк");
    try {
      // Отримуємо посилання на документ поста
      const postRef = doc(db, "posts", post.idPost);
    
      // Отримуємо поточні дані поста
      const postSnapshot = await getDoc(postRef);
      if (postSnapshot.exists()) {
        console.log('документ має бути');
        // Отримуємо поточне значення поля liked
        const currentLikes = postSnapshot.data().liked;
        // Збільшуємо значення на 1
        const newLikes = currentLikes + 1;
        // Оновлюємо документ поста з новим значенням liked
        await updateDoc(postRef, { liked: newLikes });
        console.log("Лайк додано");
      } else {
        console.log("Документ не знайдено");
      }
    } catch (error) {
      console.log("помидка додавання лайка");
    }
  };

  const toMap = () => {
    navigation.navigate("MapScreen"); // !!! доделать. Возможно, сюда нужно передать локацию
  };

  return (
    <View style={styles.containerPost}>
      {/* картинка поста */}
      <Image
        source={{ uri: post.imageUrl }}
        style={[styles.imagePost, { width: 343, height: 240 }]}
      />
      {/* назва поста */}
      <Text style={styles.titlePost}>{post.title}</Text>
      <View style={styles.comentsAndMap}>
        <View style={styles.boxComments}>
          <Pressable post={post} onPress={toComments}>
            <Image
              source={require("../assets/pngMessage.png")}
              style={[styles.imageComents, { width: 24, height: 24 }]}
            />
          </Pressable>
          <Text>{post.comments.length}</Text>
        </View>
        {/* тут буде для лайків */}
        <View style={styles.boxLikes}>
          <Pressable post={post} onPress={addLike}>
            <Image
              source={require("../assets/pngLike.png")}
              style={[styles.imageComents, { width: 24, height: 24 }]}
            />
          </Pressable>
          <Text>{post.liked}</Text>
        </View>
        {/* <Text>а тут буде карта</Text> */}
        <Pressable style={styles.mapContainer} post={post} onPress={toMap}>
          <Image
            source={require("../assets/pngMap.png")}
            style={[styles.imageComents, { width: 24, height: 24 }]}
          />
          <Text style={styles.textAdress}>
            {post.adress.split(",")[1].trim()}
          </Text>
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
    width: "100%",
    // backgroundColor: "brown",
  },
  boxComments: {
    flexDirection: "row",
    // backgroundColor: "yellow",
    width: "auto",
    marginRight: 24,
  },
  boxLikes: {
    flexDirection: "row",
    // backgroundColor: "#37B547",
    width: "auto",
  },
  imageComents: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },
    mapContainer: {
    flexDirection: "row",
    alignItems: "center",
    // backgroundColor: "#C4BABE57",
    marginLeft:'auto',

  },
  textAdress: {
    color: "black",
  },
});
export default PostConponentWithLike;
