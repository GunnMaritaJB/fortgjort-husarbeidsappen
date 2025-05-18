import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { rewardFormStyles as styles } from "../../styles/rewardFormStyles";

type AddRewardFormProps = {
  onSave: (rewardData: { name: string; pointPrice: number }) => void;
  onCancel: () => void;
};

const AddRewardForm = ({ onSave, onCancel }: AddRewardFormProps) => {
  const [name, setName] = useState<string>("");
  const [pointPrice, setPointPrice] = useState<string>("");

  const handleSave = () => {
    const pointPriceNumber = parseInt(pointPrice, 10);
    if (!name || pointPriceNumber < 0 || isNaN(pointPriceNumber)) {
      alert("Oppgi en gyldig poengsum");
      return;
    }

    if (!name.trim()) {
      alert("Oppgi et belønningsnavn");
      return;
    }

    onSave({ name, pointPrice: pointPriceNumber });
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        placeholder="Belønningsnavn"
        placeholderTextColor="#777"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      <TextInput
        value={pointPrice}
        onChangeText={setPointPrice}
        keyboardType="numeric"
        placeholder="Belønningspoeng"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text style={styles.buttonText}>Lagre</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
          <Text style={styles.buttonText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddRewardForm;
