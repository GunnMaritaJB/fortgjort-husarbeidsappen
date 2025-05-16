import {
  Pressable,
  Text,
  StyleSheet,
  Vibration,
  ViewStyle,
  TextStyle,
} from "react-native";
import {Ionicons} from "@expo/vector-icons";

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = (props: AddButtonProps) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    props.onPress();
  };

  return (
      <Pressable onPress={handlePress}>
        <Ionicons name="add" size={28} color="black" />
      </Pressable>
  );
};

/*const styles = StyleSheet.create<{
  container: ViewStyle;
  symbol: TextStyle;
}>({
  container: {
    padding: 10,
    backgroundColor: "#ddd",
  },
  symbol: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});*/
export default AddButton;
