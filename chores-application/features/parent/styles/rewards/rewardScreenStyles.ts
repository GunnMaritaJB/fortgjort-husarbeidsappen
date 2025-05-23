import { StyleSheet, TextStyle, ViewStyle } from "react-native";

export const RewardScreenStyles = StyleSheet.create<{
  header: TextStyle;
  screen: ViewStyle;
  separator: ViewStyle;
  topContainer: ViewStyle;
  searchAndAdd: ViewStyle;
  mainContainer: ViewStyle;
}>({
  screen: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#e9f6f5',
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
    color: "#000",
  },
  separator: {
    height: 1,
    width: "90%",
    backgroundColor: "rgba(33, 33, 33, 0.89)",
    marginVertical: 10,
    alignSelf: "center",
  },
  topContainer: {
    flex: 1,
    paddingTop: 30,
  },
  searchAndAdd: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  mainContainer: {
    flex: 5,
  },
});
