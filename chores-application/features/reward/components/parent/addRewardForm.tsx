import { useState } from "react";
import { View, TextInput, Text, StyleSheet, Button, TouchableOpacity } from "react-native";

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
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    saveButton: {
        flex: 1,
        backgroundColor: '#81C784',
        padding: 12,
        borderRadius: 10,
        marginRight: 8,
        alignItems: 'center',
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#E57373',
        padding: 12,
        borderRadius: 10,
        marginLeft: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});

export default AddRewardForm;
