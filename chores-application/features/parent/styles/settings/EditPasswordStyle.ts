import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f3f1', // Samme som resten av appen
        padding: 24,
        justifyContent: 'flex-start',
    },
    title: {
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 28,
        textAlign: 'left',
        color: '#000',
    },
    input: {
        height: 50,
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 16,
        borderRadius: 12,
        marginBottom: 16,
        fontSize: 16,
    },
    button: {
        backgroundColor: '#34C759',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 16,
    },
});
