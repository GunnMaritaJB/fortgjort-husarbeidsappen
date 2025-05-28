import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#e9f6f5',
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    list: {
        gap: 12,
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        padding: 16,
        backgroundColor: '#c7f1d6',
        borderRadius: 12,
        elevation: 2,
    },
    emoji: {
        fontSize: 24,
    },
    text: {
        flex: 1,
        fontSize: 16,
    },
    status: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
    },

    rewardInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        gap: 12,
    },
    deleteButton: {
        backgroundColor: '#ffcdd2',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#e57373',
    },

    deleteButtonText: {
        color: '#b71c1c',
        fontWeight: '600',
        fontSize: 14,
    },


});
