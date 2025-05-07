// features/parent/styles/parentProfileStyles.ts
import { StyleSheet } from 'react-native';

export const parentProfileStyles = StyleSheet.create({
    addChildButton: {
        backgroundColor: '#c8e6c9',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 20,
        marginTop: 24,
    },
    addChildText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#2e7d32',
    },
    childBox: {
        padding: 12,
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        marginBottom: 8,
        width: 200,
        alignItems: 'center',
    },
    childText: {
        fontSize: 16,
    },
});
