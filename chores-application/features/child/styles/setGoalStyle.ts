import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C8E6C9', // pastel grønn
        paddingTop: 60,
        paddingHorizontal: 16,
    },
    saveButton: {
        backgroundColor: '#FDD835', // gul
        paddingVertical: 14,
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    saveText: {
        color: '#333',
        fontWeight: '700',
        fontSize: 16,
    },

    clearButton: {
        backgroundColor: '#EF5350', // myk rød
        paddingVertical: 14,
        borderRadius: 100,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
    },
    clearText: {
        color: '#fff',
        fontWeight: '700',
        fontSize: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        marginBottom: 20,
        textAlign: 'center',
        color: '#444',
    },
    currentGoalBox: {
        backgroundColor: '#FFF9C4', // pastel gul
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        alignItems: 'center',
        elevation: 2,
    },
    goalTitle: {
        fontSize: 16,
        color: '#666',
    },
    goalName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 6,
        color: '#444',
    },
    grid: {
        paddingBottom: 100,
    },
    row: {
        justifyContent: 'space-around',
        marginBottom: 24,
    },
    rewardCircle: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: '#FFF8E1', // lys gul
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        elevation: 3,
    },
    rewardText: {
        fontWeight: '600',
        textAlign: 'center',
        fontSize: 13,
    },
    price: {
        fontSize: 11,
        color: '#888',
        marginTop: 4,
    },
    actions: {
        marginTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 30,
        gap: 12,
    },

});