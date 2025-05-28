import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0006',
    },
    modal: {
        backgroundColor: '#FFFDE7',
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 10,
        color: '#333',
    },
    rewardName: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FF5722',
        marginBottom: 4,
    },
    rewardPrice: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 20,
        color: '#333',
    },
    buttons: {
        flexDirection: 'row',
        gap: 16,
    },
    buttonYes: {
        backgroundColor: '#FFEB3B',
        padding: 12,
        borderRadius: 12,
    },
    buttonNo: {
        backgroundColor: '#E0E0E0',
        padding: 12,
        borderRadius: 12,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
    },
});
