import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dbeee8', // lys bakgrunn
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 20,
    },
    avatarCircle: {
        backgroundColor: '#d0d0d0',
        width: 120,
        height: 120,
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    avatar: {
        fontSize: 60,
    },
    emojiGrid: {
        backgroundColor: 'rgba(0,0,0,0.1)',
        borderRadius: 20,
        padding: 20,
        marginVertical: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 15,
    },
    emojiButton: {
        backgroundColor: '#cce7e2',
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    emoji: {
        fontSize: 30,
    },
    input: {
        backgroundColor: '#e0f2f1',
        padding: 15,
        borderRadius: 15,
        width: '100%',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: 20,
        justifyContent: 'space-between',
    },
    saveButton: {
        backgroundColor: '#a5d6a7',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    cancelButton: {
        backgroundColor: '#ef9a9a',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 15,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});
