import {StyleSheet} from "react-native";
const CIRCLE_SIZE = 90;
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    pointsBadge: {
        position: 'absolute',
        top: 30,
        right: 20,
        backgroundColor: '#FFEB3B',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 30,
        alignItems: 'center',
        zIndex: 10,
    },
    pointsValue: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    grid: {
        paddingTop: 100,
        paddingBottom: 80,
    },
    row: {
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    rewardCircle: {
        width: CIRCLE_SIZE,
        height: CIRCLE_SIZE,
        borderRadius: CIRCLE_SIZE / 2,
        backgroundColor: '#FFF8E1',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },

    rewardTitle: {
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    priceTag: {
        position: 'absolute',
        top: 6,
        right: 3,
        backgroundColor: '#FFD600',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 3,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    priceText: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#333',
    },

    pointsContainer: {
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 40,
    },
    starburst: {
        backgroundColor: '#FFD600',
        padding: 20,
        borderRadius: 60,
        borderWidth: 4,
        borderColor: '#FFCA28',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },

    pointsText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
    },

    pointsLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: '#333',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 50,
        marginTop: 30,
        marginBottom: 20,
    },

    topIcon: {
        padding: 2,
    },

    topEmoji: {
        fontSize: 58,
    },



});
