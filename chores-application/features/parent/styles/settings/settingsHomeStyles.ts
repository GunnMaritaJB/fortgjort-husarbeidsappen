import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e8f5e9', // Lys mint-grønn
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 40,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
        color: 'black', // Mørk grønn
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: '600',
        color: 'black',
    },
});
