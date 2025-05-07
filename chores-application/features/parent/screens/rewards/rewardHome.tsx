import { View, Text, StyleSheet } from 'react-native';

export default function RewardsScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Her kommer belønninger</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 20,
        fontWeight: '600',
    },
});
