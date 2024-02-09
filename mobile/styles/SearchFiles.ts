import { StyleSheet } from "react-native";

const searchFiles = StyleSheet.create({
  cardList: {
    marginHorizontal: "auto",
    width: "auto",
    paddingBottom: 120,
  },
  cardListMyfiles: {
    marginHorizontal: "auto",
    width: "auto",
    paddingBottom: 120,
  },
  card: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 10,
    width: "100%",
    marginVertical: 10,
    position: "relative",
  },
  searchBar: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    backgroundColor: "white",
    paddingHorizontal: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
  },
  searchInput: {
    flex: 1,
    height: 45,
    fontSize: 18,
  },
  searchIcon: {
    flex: 2,
  },
  dropdownContainer: {
    marginHorizontal: 5,
  },
  cardImg: {
    resizeMode: "contain",
    width: 150,
    height: 200,
    marginLeft: "25%",
  },
  fileInfo: {
    position: "relative",
    padding: 10,
    paddingBottom: 12,
  },
  filename: {
    fontWeight: "600",
    fontSize: 18,
  },
  language: {
    position: "absolute",
    right: 10,
    top: 10,
    fontSize: 18,
  },
  date: {
    fontSize: 16,
    fontStyle: "italic",
  },
  actionContainer: {
    position: "absolute",
    right: 20,
    top: 5,
    zIndex: 10,
  },
  actionMenu: {
    position: "absolute",
    top: 40,
    right: 0,
    borderRadius: 15,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#5340a9",
    minWidth: 100,
    zIndex: 8,
    margin: 0,
  },
  actionMenuContent: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 15,
    gap: 12,
  },
  actionMenuContentText: {
    color: "#5340a9",
    fontWeight: "bold",
    fontSize: 14,
  },
  interactionsContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    paddingBottom: 10,
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
  },
  interactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderColor: "#5340a9",
    borderRadius: 15,
    borderWidth: 1,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  activeInterationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderRadius: 15,
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  iconActive: {
    color: "white",
  },
  iconInactive: {
    color: "#5340a9",
  },
  active: {
    paddingRight: 7,
    color: "white",
    borderRightWidth: 1,
    borderRightColor: "white",
  },
  inactive: {
    paddingRight: 7,
    color: "#5340a9",
    borderRightWidth: 1,
    borderRightColor: "#5340a9",
  },
});

export default searchFiles;
