import {StyleSheet} from "react-native";

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
    modalContent: {
        backgroundColor: "#ddd",
        padding: 20,
        borderRadius: 5,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
});