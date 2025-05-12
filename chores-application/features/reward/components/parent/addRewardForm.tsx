import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";

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
    <View>
      <TextInput
        placeholder="Belønningsnavn"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        value={pointPrice}
        onChangeText={setPointPrice}
        keyboardType="numeric"
        placeholder="Belønningspoeng"
      />

      <View>
        <Button title="Lagre" onPress={handleSave} />
        <Button title="Avbryt" onPress={onCancel} color="red" />
      </View>
    </View>
  );
};

export default AddRewardForm;
