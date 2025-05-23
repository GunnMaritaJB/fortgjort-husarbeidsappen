// features/parent/styles/childProfileStyles.ts
import { StyleSheet } from 'react-native';

export const childProfileStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e9f6f5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
    },
    avatar: {
        fontSize: 60,
        marginTop: 16,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 12,
    },
    points: {
        fontSize: 18,
        marginTop: 8,
    },
    actionContainer: {
        marginTop: 32,
        gap: 12,
        width: '80%',
    },
    actionButton: {
        backgroundColor: '#d3d3d3',
        paddingVertical: 12,
        borderRadius: 12,
        alignItems: 'center',
    },
    text: {
        fontSize: 16,
    },
});
