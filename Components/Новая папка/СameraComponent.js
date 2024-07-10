import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Geocoder from "react-native-geocoding"; //бібліотека для то переводу координат у назву населеного пункта
import { Camera } from "expo-camera/legacy";
import { useDispatch } from "react-redux";
import { setSelectedImageToStore } from "../redux/createPost/createPostsReducer";

const API_KEY = "AIzaSyAoMfMWan9zQ2px7och1Z24q5g3DkZ8UD8";
Geocoder.init(API_KEY);

/* prettier-ignore */

const CameraComponent = () => {
  const [hasPermission, setHasPermission] = useState(null); //дозвіл для камери
  const [cameraRef, setCameraRef] = useState(null); //доробити
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();

   useEffect(() => {
     (async () => {
       const { status } = await Camera.requestCameraPermissionsAsync();
       setHasPermission(status === "granted");
     })();
   }, []);
  
  const takePicture = async () => {
    setSelectedImage(null);
    console.log("фотографуємо");
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
      dispatch(setSelectedImageToStore(photo.uri));
      setSelectedImage(photo.uri);
    }
  };

    const selectPhoto = async () => {
      setSelectedImage(null);
      let permissionResult =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("Open the resolution for your camera!");
        return;
      }

      let pickerResult = await ImagePicker.launchImageLibraryAsync();

      if (pickerResult.canceled === true) {
        return;
      }
      dispatch(setSelectedImageToStore(pickerResult.assets[0].uri));
      setSelectedImage(pickerResult.assets[0].uri);
    };


  return (
    <>
      <View style={styles.photoBox}>
        {/* тут буде камера */}
        {hasPermission ? (
          <Camera style={styles.camera} ref={(ref) => setCameraRef(ref)}>
            {/* якщо вибрана камера, то загружаємо фото з камери */}
            <View>
              <Pressable
                style={styles.pressTextTakePicture}
                onPress={takePicture}
              >
                <Text style={{ color: "white", zIndex: 110 }}>
                  Зробити знімок
                </Text>
              </Pressable>
              <Image style={styles.photoPost} source={{ uri: selectedImage }} />
            </View>
          </Camera>
        ) : (
          <View style={styles.circleBoxForPhoto}>
            <Image source={require("../assets/pngCamera.png")} />
          </View>
        )}
      </View>

      <View style={styles.containerText}>
        <TouchableOpacity onPress={selectPhoto}>
          {!selectedImage && <Text style={styles.text}>Завантажте фото</Text>}
        </TouchableOpacity>
        <TouchableOpacity onPress={selectPhoto}>
          {selectedImage && <Text style={styles.text}>Редагувати фото</Text>}
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  photoBox: {
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    // backgroundColor: "blue",
  },
  circleBoxForPhoto: {
    width: 60,
    height: 60,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  containerText: {
    alignSelf: "flex-start",
    // width: "100%",
    // backgroundColor: "yellow",
  },
  text: {
    color: "#BDBDBD",
  },
  pressTextTakePicture: {
    position: "absolute",
    width: "100%",
    height: "100%",
    // flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  photoPost: {
    width: "100%",
    height: "100%",
    zIndex: 100,
  },
  camera: {
    width: "100%",
    height: "100%",
  },
});

export default CameraComponent;
/* prettier-ignore */
