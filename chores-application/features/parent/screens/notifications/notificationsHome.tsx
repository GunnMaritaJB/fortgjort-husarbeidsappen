import { View, Text, StyleSheet } from 'react-native';

export default function NotificationsHome() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nye hendelser</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffde7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 18,
    },
});
