import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
  Pressable,
} from "react-native";
import { gStyle } from "../styles/style";
//import { PageScrollView } from "pagescrollview";
import { millisecondsToDate } from "../functions/millisecondsToDate";
import { v4 as uuidv4 } from "uuid"; // для генерації унікальної строки
import { addCommentPost } from "../API/posts/addCommentPost";
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import { useSelector } from "react-redux";
import * as selectors from "../redux/selectors";

const CommentsScreen = ({ navigation, route }) => {
  const { post, userId, urlAvatar } = route.params;
  const [textComment, setTextComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);
  const scrollViewRef = useRef();
  const users = useSelector(selectors.selectUsers);

  // перетворюємо у обєкт колекцію users для того, що б подалі швидко шукати в цьому масиві потрібне значення
  const usersDict = users.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  // console.log("&&&&&&&&&7 users &&&&&&&&&&&&&&");
  // console.log(users);

  useEffect(() => {
    const postRef = doc(db, "posts", post.idPost);
    const unsubscribe = onSnapshot(postRef, (doc) => {
      if (doc.exists()) {
        setComments(doc.data().comments || []);
      } else {
        console.log("Документ не існує!");
      }
    });

    return () => unsubscribe();
  }, [post.idPost]);

  const sendComment = async () => {
    const newComment = {
      dataComment: Date.now().toString(), //створюємо дату в мілісекундах та перетворюємо в строку
      idComment: uuidv4(), //генеруємо id
      idOwnerComment: userId,
      textComment: textComment,
    };

    if (newComment.textComment) {
      try {
        await addCommentPost(post.key, newComment, userId);
        setTextComment(""); // очищення текстового поля після відправки
        scrollViewRef.current?.scrollToEnd({ animated: true }); // прокрутка до кінця
      } catch (error) {
        console.error("Помилка при додаванні коментаря: ", error);
      }
    }
  };

  const handleCommentChange = (newText) => {
    setTextComment(newText);
  };

  return (
    <View style={styles.screen}>
      <ScrollView ref={scrollViewRef} style={styles.containerPost}>
        {/* фото поста */}
        <Image
          source={{ uri: post.imageUrl }}
          style={[styles.imagePost, { width: 343, height: 240 }]}
        />
        {/* коментарі */}
        <View style={styles.boxAllComents}>
          {comments.length !== 0 && (
            <View style={styles.boxComment}>
              {comments.map((comment, index) => {
                const fullData = millisecondsToDate(comment.dataComment);
                const pathAvatar = usersDict[comment.idOwnerComment].avatarURL; 

                return (
                  <View key={comment.idComment} style={styles.coment}>
                    {comment.idOwnerComment !== userId && (
                      <View style={styles.commentOtherUser}>
                        {/* аватарка власника коментаря */}
                        {/* <View style={styles.boxAvatar} /> */}
                        <Pressable>
                          <Image
                            style={styles.boxAvatar}
                            source={{ uri: pathAvatar }}
                          />
                        </Pressable>
                        {/* контейнер для текста коментаря */}
                        <View style={styles.containerTextDataOtherPeople}>
                          <Text>{comment.textComment} </Text>
                          <Text style={styles.dataText}>{fullData}</Text>
                        </View>
                      </View>
                    )}
                    {comment.idOwnerComment === userId && (
                      <View style={styles.commentOwnerUser}>
                        <View style={styles.containerTextDataOwner}>
                          <Text style={styles.textComent}>
                            {comment.textComment}
                          </Text>
                          <Text style={styles.dataText}>{fullData}</Text>
                        </View>
                        {/* аватарка власника коментаря */}
                        <Pressable>
                          <Image
                            style={styles.boxAvatar}
                            source={{ uri: urlAvatar }}
                          />
                        </Pressable>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          )}
          {comments.length === 0 && (
            <Text style={styles.noComents}>Коментарів до цього посту нема</Text>
          )}
        </View>
      </ScrollView>

      <View style={styles.commentBox}>
        <TextInput
          style={styles.commentInput}
          placeholder={"Коментувати..."}
          onChangeText={handleCommentChange}
          value={textComment}
          placeholderTextColor={"#BDBDBD"}
        />

        {/* кнопка в інпуті для коментарів */}
        <Pressable style={styles.buttonForSendComment} onPress={sendComment}>
          <Image
            source={require("../assets/Vector.png")}
            style={[styles.imageComents, { width: 10, height: 14 }]}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#ffffff",
    //backgroundColor: "#39287D",
    height: "100%",
  },
  containerPost: {
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 32,
    // backgroundColor: "green",
  },
  imagePost: {
    marginBottom: 32,
  },
  boxComment: {
    width: "100%",
    // backgroundColor: "red",
  },
  noComents: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  boxAvatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
    backgroundColor: "blue",
  },
  boxAllComents: {},
  coment: {
    marginBottom: 24,
    //backgroundColor: "yellow",
  },
  commentOtherUser: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  commentOwnerUser: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  containerTextData: {
    width: 267,
    backgroundColor: "#F6F6F6",
    padding: 16,

    backgroundColor: "green",
  },
  containerTextDataOwner: {
    //!!!
    width: 267,
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginRight: 16,
    //backgroundColor: "yellow",
  },
  containerTextDataOtherPeople: {
    width: 267,
    backgroundColor: "#F6F6F6",
    padding: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    marginLeft: 16,
    //backgroundColor: "green",
  },
  textComent: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 13,
    lineHeight: 18,
  },
  dataText: {
    fontFamily: "Roboto",
    fontWeight: "400",
    fontSize: 10,
    lineHeight: 11.72,
    textAlign: "right",
    marginTop: 8,
  },
  commentBox: {},
  commentInput: {
    position: "relative",
    width: "100%",
    height: 50,
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    backgroundColor: "#F6F6F6",
    borderRadius: 50,
  },
  buttonForSendComment: {
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    borderRadius: 50,
    backgroundColor: "#FF6C00",
    marginLeft: "auto",
    justifyContent: "center", // Додаємо вертикальне вирівнювання
    alignItems: "center", // Додаємо горизонтальне вирівнювання
  },
  imageComents: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CommentsScreen;
