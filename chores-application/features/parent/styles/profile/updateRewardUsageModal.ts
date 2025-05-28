import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        padding: 24,
        borderRadius: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    label: {
        fontSize: 14,
        marginBottom: 12,
        color: '#333',
    },
    closeBtn: {
        marginTop: 20,
        paddingVertical: 8,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    closeText: {
        fontWeight: 'bold',
        color: '#333',
    },
});
