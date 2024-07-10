import { TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

function CustomHeaderBackButton() {
  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
      <TouchableOpacity style={ styles.styleArrowBack} onPress={handleGoBack}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    styleArrowBack: {      
        marginLeft: 16,
        // backgroundColor:'red',
  }
});

export default CustomHeaderBackButton;