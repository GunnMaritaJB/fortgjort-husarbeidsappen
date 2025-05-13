import { StyleSheet } from 'react-native';

export const createTaskStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1fefe', padding: 20 },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { marginTop: 16, fontSize: 16 },
    input: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 10,
        marginTop: 8,
    },
    datePickerBtn: {
        backgroundColor: '#eee',
        padding: 12,
        borderRadius: 10,
        marginTop: 8,
        alignItems: 'center',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    toggleBtn: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginHorizontal: 8,
        backgroundColor: '#ddd',
    },
    selectedToggle: {
        backgroundColor: '#b0e0d3',
    },
    weekRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: 8,
    },
    dayBtn: {
        margin: 4,
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        backgroundColor: '#ccc',
    },
    selectedDayBtn: {
        backgroundColor: '#b0e0d3',
    },
    dayText: {
        fontWeight: 'bold',
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 40,
    },
    saveButton: {
        backgroundColor: '#b0e0d3',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingHorizontal: 32,
        paddingVertical: 12,
        borderRadius: 12,
    },
    buttonText: { fontSize: 16 },
});
