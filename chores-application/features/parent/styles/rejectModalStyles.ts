import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 20,
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
    },
    title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
    message: { fontSize: 16, textAlign: 'center', marginBottom: 20 },
    actions: {
        flexDirection: 'row',
        gap: 12,
    },
    cancelButton: {
        backgroundColor: '#E0E0E0',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    cancelText: {
        color: '#333',
        fontWeight: '600',
    },
    confirmButton: {
        backgroundColor: '#FDECEA',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },
    confirmText: {
        color: '#C62828',
        fontWeight: '600',
    },
});
