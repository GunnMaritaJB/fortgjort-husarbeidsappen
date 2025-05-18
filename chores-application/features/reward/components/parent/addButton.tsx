import { Pressable, Vibration } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type AddButtonProps = {
  onPress: () => void;
  testID?: string;
};

const AddButton = (props: AddButtonProps) => {
  const handlePress = () => {
    Vibration.vibrate(50);
    props.onPress();
  };

  return (
    <Pressable onPress={handlePress} testID="addRewardButton">
      <Ionicons testID="addRewardButton" name="add" size={28} color="black" />
    </Pressable>
  );
};

export default AddButton;
