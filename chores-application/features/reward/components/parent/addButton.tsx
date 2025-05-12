import {
  Pressable,
  Text,
  StyleSheet,
  Vibration,
  ViewStyle,
  TextStyle,
} from "react-native";

type AddButtonProps = {
  onPress: () => void;
};

const AddButton = (props: AddButtonProps) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    props.onPress();
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Text style={styles.symbol}>+</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create<{
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
});
export default AddButton;
