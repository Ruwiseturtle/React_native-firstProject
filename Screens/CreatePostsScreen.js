import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Keyboard,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import "react-native-get-random-values"; // це не видаляти, воно необхідне для нормальної роботи uuidv4
import { WebView } from "react-native-webview"; // це не видаляти, воно необхідне для нормальної роботи uuidv4
import { v4 as uuidv4 } from "uuid"; // для генерації унікальної строки
import * as ImagePicker from "expo-image-picker";
import CastomTextIIconInput from "../Components/CastomTextIIconInput";
import Geocoder from "react-native-geocoding"; //бібліотека для то переводу координат у назву населеного пункта
import { Camera } from "expo-camera/legacy";
import { getFileName } from "../functions/getFileName";
import { sendImageToStorage } from "../API/sendImageToStorage";
import * as selectors from "../redux/selectors";
import { sentPostToServer } from "../API/posts/sentPostToServer";

// import { db } from "../firebase/config";
// import { collection, addDoc } from "firebase/firestore";

const API_KEY = "AIzaSyAoMfMWan9zQ2px7och1Z24q5g3DkZ8UD8";
Geocoder.init(API_KEY);

const CreatePostsScreen = () => {
  //змінні для камери
  const [hasPermission, setHasPermission] = useState(null); //дозвіл для камери
  const [cameraRef, setCameraRef] = useState(null); //доробити
  const [selectedImage, setSelectedImage] = useState(null);
  //змінні для карти
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);
  const [mapUrl, setMapUrl] = useState(null);
  //інші змінні
  const [title, setTitle] = useState(null);
  const currentUser = useSelector(selectors.selectCurrentUser);
  const userId = currentUser.uid;

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Функція для отримання назви місцевості за координатами
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      let address = response.results[0].formatted_address;

      const country = response.results[0].address_components[3].long_name;
      const region = response.results[0].address_components[4].long_name;

      address = country + ", " + region;
      return address;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // ф-ція для отримання координат на карті и приховання карти після цього
  const handleMapPress = async (event) => {
    const { coordinate } = event.nativeEvent;

    const locationName = await getLocationName(
      coordinate.latitude,
      coordinate.longitude
    );
    setSelectedLocation(coordinate);
    console.log("координаты");
    console.log(coordinate);
    setLocationName(locationName);
    setMapUrl(
      `https://www.google.com/maps/search/?api=1&query=${coordinate.latitude},${coordinate.longitude}`
    );
    setIsMapVisible(false); // Приховання карти після вибору локації
  };

  const publishPost = async () => {
    if (selectedImage && selectedLocation && locationName && title) {
      // спочатку відправляємо картинку на firebase/storage/postImages
      const imageUrl = await sendImageToStorage(selectedImage);

      let newPost = {
        adress: locationName,
        idOwner: userId,
        idPost: uuidv4(), 
        imageName: getFileName(selectedImage),
        imageUrl: imageUrl,
        liked: 0,
        mapUrl: mapUrl,
        title: title,
        comments: [],
      };

      await sentPostToServer(newPost);
      clearDataPost();
    } else {
      Alert.alert("Заповніть усі поля, будь-ласка!");
    }
  };


  function clearDataPost() {
    setTitle(null);
    setSelectedImage(null);
    setLocationName(null);
    setSelectedLocation(null);
  }
  
  const deletePost = () => {
    console.log("видаляємо пост");

    setTitle(null);
    setSelectedImage(null);
    setLocationName(null);
    setSelectedLocation(null);
  };

  const takePicture = async () => {
    setSelectedImage(null);
    console.log("фотографуємо");
    if (cameraRef) {
      const photo = await cameraRef.takePictureAsync();
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
    setSelectedImage(pickerResult.assets[0].uri);
  };

  return (
    <Pressable
      style={styles.mainContainer}
      onPress={() => Keyboard.dismiss()}
      pointerEvents="auto"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
        style={styles.boxKeyboard}
      >
        {/* завантаження фото */}
        <ScrollView
          contentContainerStyle={styles.scrollViewContent}
          showsVerticalScrollIndicator={false}
        >
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
                  <Image
                    style={styles.photoPost}
                    source={{ uri: selectedImage }}
                  />
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
              {!selectedImage && (
                <Text style={styles.text}>Завантажте фото</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={selectPhoto}>
              {selectedImage && (
                <Text style={styles.text}>Редагувати фото</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ввід назви */}
          <TextInput
            style={[styles.inputTitle, { marginTop: 32 }]}
            onChangeText={(e) => setTitle(e)}
            value={title}
            placeholder={"Назва..."}
            placeholderTextColor={"#BDBDBD"}
          />

          {/* вибір локації місцевості */}
          <TouchableOpacity style={styles.containerIconMap}>
            <CastomTextIIconInput
              onFocus={() => setIsMapVisible(true)}
              // value={selectedLocation ? `${selectedLocation.latitude}, ${selectedLocation.longitude}`
              //     : ""
              // }
              value={selectedLocation ? locationName : ""}
              placeholder="Місцевість..."
              placeholderTextColor={"#BDBDBD"}
              icon="location-on"
            />
          </TouchableOpacity>

          {/* тут зявляється карта */}
          {isMapVisible && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                onPress={handleMapPress}
                initialRegion={{
                  latitude: selectedLocation ? selectedLocation.latitude : 49,
                  longitude: selectedLocation ? selectedLocation.longitude : 31,
                  latitudeDelta: 1.0922,
                  longitudeDelta: 1.0421,
                }}
              >
                {selectedLocation && <Marker coordinate={selectedLocation} />}
              </MapView>
            </View>
          )}

          {/* кнопка опублікувати */}
          <Pressable
            style={[
              styles.publishButton,
              { marginTop: 48 },
              {
                backgroundColor:
                  selectedImage && title && selectedLocation && locationName
                    ? "#FF6C00"
                    : "#F6F6F6",
              },
            ]}
            onPress={publishPost}
          >
            <Text
              style={{
                color:
                  selectedImage && title && selectedLocation && locationName
                    ? "white"
                    : "#BDBDBD",
              }}
            >
              Опубліковати
            </Text>
          </Pressable>

          {/* кнопка видалити */}
          <Pressable
            style={[styles.deleteBox, { marginTop: 120 }]}
            onPress={deletePost}
          >
            <Image source={require("../assets/pngDelete.png")} />
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 32,
    backgroundColor: "white",
  },
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
  boxKeyboard: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    // backgroundColor: "violet",
  },
  imagePost: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  containerText: {
    alignSelf: "flex-start",
    // width: "100%",
    // backgroundColor: "yellow",
  },
  text: {
    color: "#BDBDBD",
  },
  inputTitle: {
    width: "100%",
    alignSelf: "flex-start",
    fontFamily: "Roboto",
    // paddingTop: 16,
    marginTop: 16,
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#BDBDBD",
    // backgroundColor: "red",
    zIndex: 100,
  },
  containerIconMap: {
    width: "100%",
  },
  publishButton: {
    width: 343,
    height: 51,
    borderRadius: 32,
    borderBottomLeftRadius: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  deleteBox: {
    width: 70,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#F6F6F6",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 32,
  },
  // стилі для карти
  mapContainer: {
    position: "absolute",
    width: "110%",
    height: "110%",
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
    zIndex: 100,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  //стилі для камери
  camera: {
    width: "100%",
    height: "100%",
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
});

export default CreatePostsScreen;
