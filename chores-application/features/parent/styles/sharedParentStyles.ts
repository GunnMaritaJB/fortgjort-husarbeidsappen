import { StyleSheet } from 'react-native';

export const sharedFormStyles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 4,
        color: '#333',

    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
        fontSize: 16,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginBottom: 8,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 32,
    },
    grayButton: {
        flex: 1,
        backgroundColor: '#ccc',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: '600',
        color: '#fff',
        fontSize: 20,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e9f6f5',
        padding: 10,
    },
    avatarCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#d6d6d6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        fontSize: 50,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 60,
    },

});
