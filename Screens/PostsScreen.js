import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
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
  const globalLoading = useSelector(selectors.selectIsLoading);
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadPostsAndUsers = async () => {
      await Promise.all([
        dispatch(PostThunk.getPostsThunks2()),
        dispatch(UserThunk.getUsersThunks()),
      ]);
      setLocalLoading(false);
    };

    loadPostsAndUsers();

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
  }, [dispatch]);

  const postsArray = Array.isArray(posts) ? posts : [];

  // Показуємо індикатор завантаження, поки дані завантажуються
  if (localLoading || globalLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#E1B227" />
      </View>
    );
  }

  // Якщо дані завантажились, але постів немає, показуємо повідомлення про відсутність постів
  if (!localLoading && postsArray.length === 0) {
    return (
      <View style={styles.screen}>
        <HeaderComponent />
        <PageScrollView
          style={styles.container}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Pressable style={styles.avatarContainer}>
            <AvatarComponents currentUser={currentUser} />
          </Pressable>
          <View style={styles.noPostsContainer}>
            <Text style={styles.noPostsText}>No posts found.</Text>
          </View>
        </PageScrollView>
      </View>
    );
  }

  // Якщо дані завантажились і пости є, показуємо пости
  return (
    <View style={styles.screen}>
      <HeaderComponent />
      <PageScrollView
        style={styles.container}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Pressable style={styles.avatarContainer}>
          <AvatarComponents currentUser={currentUser} />
        </Pressable>
        <View style={styles.postContainer}>
          {postsArray.map((post) => (
            <PostComponent
              key={uuidv4()}
              post={post}
              userId={currentUser.uid}
              urlAvatar={currentUser.photoURL}
            />
          ))}
        </View>
      </PageScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: "#ffffff",
    height: "100%",
  },
  container: {
    width: "100%",
    height: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 60,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noPostsText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  avatarContainer: {
    flexGrow: 1,
    width: 343,
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "flex-start",
  },
  postContainer: {
    flex: 1,
  },
});

export default PostsScreen;
