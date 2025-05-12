import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button } from "react-native";
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
    <View>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Belønningsnavn"
      />

      <TextInput
        value={pointPrice}
        onChangeText={setPointPrice}
        keyboardType="numeric"
      />

      <View>
        <Button title="Lagre" onPress={handleSave} />
        <Button title="Avbryt" onPress={onCancel} />
        <Button title="Slett" onPress={onDelete}></Button>
      </View>
    </View>
  );
};

export default EditRewardForm;
