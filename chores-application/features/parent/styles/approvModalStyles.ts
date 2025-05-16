import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 12,
        width: '80%',
        elevation: 5,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 12,
    },
    text: {
        fontSize: 16,
        marginBottom: 24,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 16,
    },
    cancelBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    confirmBtn: {
        backgroundColor: '#D4F1D7',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 6,
    },
    cancelText: {
        color: 'red',
        fontWeight: 'bold',
    },
    confirmText: {
        color: '#2e7d32',
        fontWeight: 'bold',
    },
});
