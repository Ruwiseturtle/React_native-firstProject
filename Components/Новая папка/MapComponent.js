import React, { useState } from "react";
import { useDispatch } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import CastomTextIIconInput from "../Components/CastomTextIIconInput";
import Geocoder from "react-native-geocoding"; //бібліотека для то переводу координат у назву населеного пункта
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { setSelectedLocationToStore, setLocationNameToStore} from "../redux/createPost/createPostsReducer";
// import { selectLocationName } from "../redux/selectors";
/* prettier-ignore */

const MapComponent = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationName, setLocationName] = useState("");
  const [isMapVisible, setIsMapVisible] = useState(false);
  const dispatch = useDispatch();

  useState(() => {
    console.log("===============isMapVisible=====================");
    console.log(isMapVisible);
    console.log('====================================');
  }, [isMapVisible]);
  // ф-ція, яка при натисненні на інпут, відкривається карта
  const handleInputPress = () => {
    setIsMapVisible(true);
  };

  // Функція для отримання назви місцевості за координатами
  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await Geocoder.from(latitude, longitude);
      let address = response.results[0].formatted_address;

      const country = response.results[0].address_components[3].long_name;
      const region = response.results[0].address_components[4].long_name;

      // address = country + ", " + region;
      address = `${country}, ${region}`;
      return address;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  // ф-ція для отримання координат на карті и приховання карти після цього
  const handleMapPress = async (event) => {
    setIsMapVisible(false); // Приховання карти після вибору локації
    const { coordinate } = event.nativeEvent;
    const locationNameTmp = await getLocationName(
      coordinate.latitude,
      coordinate.longitude
    );

    dispatch(setSelectedLocationToStore(coordinate));
    setSelectedLocation(coordinate);

    console.log("координаты");
    console.log(coordinate);

    setLocationName(locationNameTmp);
    dispatch(setLocationNameToStore(locationNameTmp));
  };

  
  return (
    <>
      {/* вибір локації місцевості */}
      <TouchableOpacity style={styles.containerIconMap}>
        <CastomTextIIconInput
          onFocus={handleInputPress}
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
        <Pressable style={styles.mapContainer}>
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
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  containerIconMap: {
    width: "100%",
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
});

export default MapComponent;
/* prettier-ignore */
