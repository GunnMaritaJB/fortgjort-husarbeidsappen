import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 320,
        height: 450,
        borderRadius: 20,
        padding: 20,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 8,
    },
    header: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 40,
    },
    rewardsList: {
        marginTop: 20,
        width: '100%',
    },
    scrollContent: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        color: '#fff',
        marginTop: 20,
        textAlign: 'center',
    },
    rewardItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginVertical: 6,
        width: '100%',
        elevation: 2,
    },
    emoji: {
        fontSize: 20,
    },
    rewardName: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 12,
    },
    rewardPoints: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#888',
    },
    rewardGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        gap: 12,
    },
    rewardBubble: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 3,
    },
    rewardEmoji: {
        fontSize: 26,
        marginBottom: 4,
    },
    rewardText: {
        fontSize: 14,
        fontWeight: '600',
        textAlign: 'center',
    },

});
