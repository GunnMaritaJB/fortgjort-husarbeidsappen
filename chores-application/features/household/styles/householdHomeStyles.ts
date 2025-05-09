import { StyleSheet } from 'react-native';

export const householdHomeStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fdfc',
        alignItems: 'center',
        paddingTop: 80,
    },
    householdName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    avatarGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        margin: 16,
    },
    avatarCircle: {
        width: 72,
        height: 72,
        borderRadius: 36,
        backgroundColor: '#e0e0e0',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    avatarEmoji: {
        fontSize: 36,
    },
    avatarLabel: {
        fontSize: 14,
        color: '#222',
    },
    avatarRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginTop: 40,
        paddingHorizontal: 10,
        gap: 10,
    },

});
