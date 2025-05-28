import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: '#fff8e1',
        padding: 24,
        borderRadius: 16,
        alignItems: 'center',
        width: 280,
    },
    emoji: {
        fontSize: 40,
        marginBottom: 8,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 6,
    },
    missing: {
        fontSize: 16,
        color: '#666',
        marginBottom: 16,
    },
    closeButton: {
        backgroundColor: '#FFD54F',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
    },
    closeText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
});
