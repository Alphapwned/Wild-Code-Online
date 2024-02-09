import { StyleSheet } from "react-native";

const profileStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#5340a9",
    textAlign: "center",
    marginTop: 30,
  },

  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#5340a9",
    textAlign: "center",
    marginBottom: 40,
  },

  inputs: {
    justifyContent: "center",
  },

  textInput: {
    height: 40,
    borderColor: "gray",
    backgroundColor: "white",
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 10,
    marginHorizontal: 20,
    borderRadius: 5,
  },

  button: {
    backgroundColor: "#5340a9",
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 100,
    borderRadius: 5,
    marginTop: 50,
    marginBottom: 20,
  },

  buttonText: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
  },

  validationText: {
    color: "green",
    marginTop: 10,
  },
});

export default profileStyles;
