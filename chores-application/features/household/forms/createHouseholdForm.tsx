import {View, TextInput, Button, StyleSheet,TouchableOpacity, Text} from "react-native";
import {sharedHouseholdStyles} from "@/features/household/styles/sharedHouseholdStyles";
import {registerStyles as styles} from "@/features/auth/styles/registerStyles";

type Props = {
    householdName: string;
    setHouseholdName: (value: string) => void;
    onSubmit: () => void;
    onCancel: () => void;
}

export default function CreateHouseholdForm({
  householdName,
  setHouseholdName,
  onSubmit,
  onCancel,
}: Props) {
    return (
        <>
        <TextInput
            placeholder="Husstandsnavn"
            style={styles.input}
            onChangeText={setHouseholdName}
            value={householdName}
            testID={'household'}
        />
            <View style={styles.buttonRow}>
                <TouchableOpacity
                    style={styles.grayButton}
                    onPress={onSubmit}
                    testID="registerBtn">
                    <Text style={styles.buttonText}>Fullfør</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.grayButton} onPress={onCancel}>
                    <Text style={styles.buttonText}>Avbryt</Text>
                </TouchableOpacity>
            </View>

        </>
    );
}