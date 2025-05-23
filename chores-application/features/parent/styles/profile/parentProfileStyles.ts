// features/parent/styles/parentProfileStyles.ts
import { StyleSheet } from 'react-native';

export const parentProfileStyles = StyleSheet.create({
    titleText: {
        fontSize: 20,
        fontWeight: '700',
        marginVertical: 16,
        color: '#333',
    },
    childBox: {
        padding: 16,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 14,
        marginBottom: 12,
        width: 240,
        alignItems: 'center',
    },
    childText: {
        fontSize: 20,
    },
    addChildButton: {
        backgroundColor: '#c8e6c9',
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 24,
        marginTop: 16,
        alignSelf: 'center',
    },
    addChildText: {
        fontSize: 18,
        fontWeight: '700',
        color: '#2e7d32',
    },
});