import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.45)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF8E1',
        padding: 32,
        borderRadius: 28,
        alignItems: 'center',
        width: '85%',
        elevation: 10,
        borderWidth: 3,
        borderColor: '#FFD54F',
    },
    modalText: {
        fontSize: 22,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
        textAlign: 'center',
    },
    taskName: {
        fontSize: 26,
        color: '#FF6F00',
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        letterSpacing: 1,
    },
    emojiRow: {
        flexDirection: 'row',
        gap: 20,
    },
    emojiButton: {
        alignItems: 'center',
        paddingVertical: 16,
        paddingHorizontal: 20,
        backgroundColor: '#FFFDE7',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFEE58',
        elevation: 3,
        width: 90,
    },
    emoji: {
        fontSize: 40,
        marginBottom: 6,
    },
    buttonLabel: {
        fontSize: 16,
        fontWeight: '600',
        color: '#5D4037',
    },
    successBubble: {
        position: 'absolute',
        bottom: 100,
        alignSelf: 'center',
        backgroundColor: '#C8E6C9',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#388E3C',
        elevation: 6,
        zIndex: 10,
    },
    successText: {
        color: '#2E7D32',
        fontSize: 16,
        fontWeight: 'bold',
    },

});
