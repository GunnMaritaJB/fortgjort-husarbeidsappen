import { StyleSheet } from 'react-native';

export const sharedHouseholdStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f2fefc',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 20,
    },
    input: {
        backgroundColor: '#ddd',
        padding: 12,
        borderRadius: 16,
        width: '80%',
        alignSelf: 'center',
        marginBottom: 16,
    },
    grayButton: {
        backgroundColor: '#dadada',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 16,
        alignItems: 'center',
    },
    grayButtonText: {
        fontSize: 16,
        color: '#000',
        textAlign: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: 'black',
        textAlign: 'center',
    },
});
