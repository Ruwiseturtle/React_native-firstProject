import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import { WebView } from "react-native-webview"; // це не видаляти, воно необхідне для нормальної роботи uuidv4
import { v4 as uuidv4 } from "uuid"; // для генерації унікальної строки
import HeaderComponent from "../Components/HeaderComponentPostsScreen";
import PostComponent from "../Components/PostComponent";
import AvatarComponents from "../Components/AvatarComponentPostsScreen";
import { PageScrollView } from "pagescrollview";
import { useSelector, useDispatch } from "react-redux";
import { setPosts } from "../redux/posts/postsReducer";
import { setUsers } from "../redux/users/usersReducer";
import * as selectors from "../redux/selectors";
import * as PostThunk from "../redux/posts/postsThunks";
import * as UserThunk from "../redux/users/usersThunks";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

const PostsScreen = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.selectGetPosts);
  const currentUser = useSelector(selectors.selectCurrentUser);
  const loading = useSelector(selectors.selectIsLoading);

  useEffect(() => {
    dispatch(PostThunk.getPostsThunks2()); // Завантажуємо пости з Firebase при монтажі компонента
    dispatch(UserThunk.getUsersThunks()); // завантажуємо список юзерів для отримання ссилок на їх аватарки

    // Підписуємося на зміни в колекціях 'posts' та 'users'
    const unsubscribePosts = onSnapshot(collection(db, "posts"), (snapshot) => {
      const updatedPosts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Оновлюємо пости у Redux
      dispatch(setPosts(updatedPosts));
    });

    const unsubscribeUsers = onSnapshot(collection(db, "users"), (snapshot) => {
      const updatedUsers = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      // Оновлюємо користувачів у Redux
      dispatch(setUsers(updatedUsers));
    });

    // Відписуємося при демонтажі компонента
    return () => {
      unsubscribePosts();
      unsubscribeUsers();
    };
  }, [dispatch]); // Порожній масив, щоб викликати лише один раз після монтажу

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E1B227" />
      </View>
    );
    //return <ActivityIndicator size="large" color="#0000ff" />; // Покажемо індикатор завантаження поки дані завантажуються
  }

  const postsArray = Array.isArray(posts) ? posts : [];

  if (!postsArray.length) {
    return <Text>No posts found.</Text>;
  }

  return (
    <View style={styles.screen}>
      {/* {шапка} */}
      <HeaderComponent />
      {/* {аватар з постами в скролконтейнері} */}

      <PageScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Pressable style={styles.avatarContainer}>
          <AvatarComponents currentUser={currentUser} />
        </Pressable>
        {/* {пости} */}
        <View style={styles.postContainer}>
          {postsArray.map((post) => {
            return (
              <PostComponent
                key={uuidv4()}
                post={post}
                userId={currentUser.uid}
                urlAvatar={currentUser.photoURL}
              />
            );
          })}
        </View>
      </PageScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
  },
  container: {
    width: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 60,
    // backgroundColor: "red",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
  },
  avatarContainer: {
    flexGrow: 1,
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "flex-start",
    // backgroundColor: "blue",
  },
  postContainer: {
    alignItems: "center",
    // backgroundColor: "yellow",
  },
  areaStyles: {
    width: "100%",
    alignItems: "center",
  },
});

export default PostsScreen;
