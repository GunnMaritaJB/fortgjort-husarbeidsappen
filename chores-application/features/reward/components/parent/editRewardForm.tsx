import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { Reward } from "../../models/Reward";

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
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Text style={styles.buttonText}>Slett</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    fontSize: 16,
    color: '#000',
    marginBottom: 16,
  },
  buttonRow: {
    marginTop: 8,
    flexDirection: 'column',
    gap: 10,
  },
  saveButton: {
    backgroundColor: '#81C784',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#B0BEC5',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#E57373',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
export default EditRewardForm;
