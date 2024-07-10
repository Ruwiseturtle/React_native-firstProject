import React, { useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import PostConponentWithLike from "../Components/PostConponentWithLike";
// import postsData from "../data/posts.json";
import { useSelector, useDispatch } from "react-redux";
import * as selectors from "../redux/selectors";
import * as thunk from "../redux/posts/postsThunks";
import { sendAvatarToStorage } from "../API/sendAvatarToStorage";
import { setCurrentUser } from "../redux/auth/authReducer";
import {updateProfile} from "firebase/auth";
import { auth } from "../firebase/config";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { updateUserAvatarURL } from "../API/users/updateUserAvatarURL";

/* prettier-ignore */

const no_photo =
  "https://firebasestorage.googleapis.com/v0/b/next-project-9d83e.appspot.com/o/avatars%2Fno_photo.jpeg?alt=media&token=d216aa31-2a54-4ee9-be5a-c839b6bf1939";



const ProfileScreen = ({ navigation }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const dispatch = useDispatch();
  const currentUser = useSelector(selectors.selectCurrentUser);
  const userId = currentUser?.uid; 
  let posts = useSelector(selectors.selectGetPosts) || [];


  useEffect(() => {
    dispatch(thunk.getPostsThunks2()); // Завантажуємо пости з Firebase при монтажі компонента
    setSelectedImage(currentUser.photoURL);
  }, []); // Порожній масив, щоб викликати лише один раз після монтажу


  const selectAvatar = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Open the resolution for your camera!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
  
    if (pickerResult.canceled === true) {
      return;
    }
    const imageUrl = await sendAvatarToStorage(pickerResult.assets[0].uri);

    setSelectedImage(imageUrl);
    updateUserAvatar(imageUrl);

  };

  const updateUserAvatar = async (imageUrl) => {
    const user = auth.currentUser;
    const oldAvatarUrl = user.photoURL; //зберігаємо шлях до старої аватарки, щоб потім видалити

    await updateProfile(user, { photoURL: imageUrl });
    await updateUserAvatarURL(user.uid, imageUrl); //поновлюємо користувачу новий photoURL в базу даних users

    const updatedUser = {
      ...currentUser,
      photoURL: imageUrl,
    };
    dispatch(setCurrentUser(updatedUser));

    //видаляємо аватарку, якщо це не фото-заглушка
    if (oldAvatarUrl !== no_photo) {
      deleteOldAvatarFromServer(oldAvatarUrl);
    }
  };

  //ф-ція отримує щлях до старої аватарки на firebase і видаляє її на сервері firebase
  const deleteOldAvatarFromServer = async (oldAvatarUrl) => {
    if (oldAvatarUrl) {
      const storage = getStorage();
      const oldAvatarRef = ref(storage, oldAvatarUrl);

      deleteObject(oldAvatarRef).catch((error) => {
        console.error("Error deleting old avatar:", error);
      });
    }
  };

  return (
    <ImageBackground
      style={styles.backgroundStyle}
      source={require("../assets/Photo-BG.jpeg")}
    >
      {/* сюда */}
      <ScrollView
        style={styles.scrolContainer}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <Pressable style={styles.pressableContainer}>
          <View style={styles.container}>
            <View style={styles.avatar}>
              {selectedImage && (
                <Image
                  style={styles.imageAvatar}
                  source={{ uri: selectedImage }}
                />
              )}
              <Pressable style={styles.buttonAddAvatar} onPress={selectAvatar}>
                <Image source={require("../assets/add.png")} />
              </Pressable>
            </View>
            <View>
              <Text style={styles.text}>{currentUser.login}</Text>
            </View>

            {/* пости цього користувача*/}
            <View
              style={styles.postsContainer}
              contentContainerStyle={{ flexGrow: 1 }}
            >
              <View style={styles.onePostContainer}>
                {Array.isArray(posts) && posts.length > 0 ? (
                  posts.map(
                    (post) =>
                      post.idOwner === userId && (
                        <PostConponentWithLike
                          key={post.idPost}
                          post={post}
                          userId={userId}
                        />
                      )
                  )
                ) : (
                  <Text>No posts found.</Text>
                )}
              </View>
            </View>
          </View>
        </Pressable>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  keyboardContainerStyles: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },

  pressableContainer: {
    width: "100%",
    // backgroundColor:'blue',
  },
  container: {
    position: "relative",
    width: "100%",
    minHeight: "100%",
    alignItems: "center",
    backgroundColor: "white",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    marginTop: 147,
  },
  backgroundStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  text: {
    color: "black",
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 92,
  },
  imageAvatar: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  avatar: {
    // overflow:"hidden",
    position: "absolute",
    top: -60,
    width: 132,
    height: 120,
    alignItems: "center",
    borderTopLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: "#F6F6F6",
    borderColor: "#DEDCDC",
    borderWidth: 1,
  },
  buttonAddAvatar: {
    position: "absolute",
    top: 81,
    right: -12.5,
    width: 25,
    height: 25,
  },
  registerButton: {
    width: "90%",
    height: 51,
    backgroundColor: "#FF6C00",
    borderTopLeftRadius: 32,
    borderBottomRightRadius: 32,
    borderBottomLeftRadius: 32,
    borderTopRightRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  linkToAccount: {
    color: "#1B4371",
    marginBottom: 45,
  },
  scrolContainer: {
    height: "100%",
    width: "100%",
  },
  //для постов
  postsContainer: {
    width: "100%",
    paddingTop: 32,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 60,
    // backgroundColor: "red",
  },
  onePostContainer: {
    alignItems: "center",
    // backgroundColor: "yellow",
  },
});

export default ProfileScreen;
/* prettier-ignore */
