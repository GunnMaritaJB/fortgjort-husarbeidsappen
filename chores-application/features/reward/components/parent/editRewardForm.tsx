import { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import { Reward } from "../../models/Reward";
import { rewardFormStyles as styles } from "../../styles/rewardFormStyles";

type EditRewardFormProps = {
  reward: Reward;
  onSave: (updated: { name: string; pointPrice: number }) => void;
  onDelete: () => void;
  onCancel: () => void;
};

const EditRewardForm = ({
  reward,
  onSave,
  onCancel,
  onDelete,
}: EditRewardFormProps) => {
  const [name, setName] = useState<string>(reward.name);
  const [pointPrice, setPointPrice] = useState<string>(
    reward.pointPrice.toString()
  );

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
        value={name}
        onChangeText={setName}
        placeholder="Belønningsnavn"
        placeholderTextColor="#777"
        style={styles.input}
      />

      <TextInput
        testID="Current_points"
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

      <View style={styles.deleteButtonRow}>
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.buttonText}>Slett</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditRewardForm;
