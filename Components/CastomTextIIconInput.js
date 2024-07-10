import React from "react";
import { View, TextInput, Image, Text, StyleSheet } from "react-native";
// import { MaterialIcons } from "@expo/vector-icons";

const CastomTextIIconInput = ({ icon, ...rest }) => {
  return (
    <View
      style={styles.container}
      placeholder="Місцевість..."
      placeholderTextColor={"#BDBDBD"}
      icon="location-on"
    >
      {/* <Text style={styles.icon}>
        <MaterialIcons name={icon} size={24} color="#BDBDBD" />
      </Text> */}
      <Image
        source={require("../assets/pngMap.png")}
        style={[styles.icon, { width: 24, height: 24 }]}
      />
      <TextInput {...rest} style={styles.input} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#BDBDBD",
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: 16,
    // backgroundColor:'#123222'
  },
  input: {
    flex: 1,
  },
  icon: {
    marginRight: 4,
    width: 24,
    height: 24,
    //   backgroundColor: 'red',
  },
});

export default CastomTextIIconInput;
