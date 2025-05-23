import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,

    },
    taskCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        margin: 8,
        paddingVertical: 20,
        paddingHorizontal: 14,
        borderRadius: 18,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.12,
        shadowOffset: { width: 0, height: 1 },
        shadowRadius: 4,
        minHeight: 130,
        borderWidth: 2,
        borderColor: '#AED581', // frisk grønn
    },
    completed: {
        backgroundColor: '#E6F4EA',
        borderColor: '#43A047',
    },
    taskTitle: {
        fontWeight: '800',
        fontSize: 18,
        color: '#1B5E20',
        marginBottom: 6,
        textAlign: 'center',
    },
    taskPoints: {
        fontSize: 15,
        color: '#616161',
        marginBottom: 6,
    },
    taskStatus: {
        fontSize: 14,
        color: '#2E7D32',
        fontWeight: '600',
    },

    row: {
        justifyContent: 'space-between',
        marginBottom: 16,
    },

});
