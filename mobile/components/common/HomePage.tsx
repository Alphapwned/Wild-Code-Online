import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Linking,
  TouchableOpacity,
} from "react-native";

const HomePage = ({ navigation }) => {
  const handleLinkPress = () => {
    // Action à effectuer lorsque le lien est pressé
    navigation.navigate("File"); // Remplacez par l'action souhaitée
  };
  const handleButtonClick = () => {
    // Action à effectuer lorsque le bouton est pressé
    navigation.navigate("File"); // Remplacez par l'action souhaitée
  };
  return (
    <View style={[styles.margin, styles.marginSection]}>
      <Text style={[styles.title, styles.textAlignCenter, styles.marginBottom]}>
        CreativeCode
      </Text>
      <View id="Accueil">
        <View style={[styles.imageContainer, styles.marginBottom]}>
          <Image
            style={{ width: "100%", height: "100%" }}
            source={require("../../assets/img/illustration-home.png")}
            alt="Illustration page d'accueil"
          />
        </View>
        <View>
          <View style={[styles.center]}>
            <Text
              style={[
                styles.subTitle,
                styles.textAlignCenter,
                styles.marginBottom,
              ]}
            >
              Le code a du style avec CreativeCode !
            </Text>
            <Text
              style={[styles.textAlignCenter, styles.text, styles.marginBottom]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum rhoncus.commodo velit. Vivamus iaculis varius accumsan.
              Nunc
            </Text>
            <View style={styles.flex}>
              {/* <TouchableOpacity
                style={styles.customButton}
                onPress={handleButtonClick}
              >
                <Text style={styles.buttonText}>Commencer</Text>
              </TouchableOpacity> */}
              <TouchableOpacity onPress={handleLinkPress}>
                <Text style={(styles.linkText, styles.center)}>
                  En savoir plus
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginSection: {
    marginBottom: 80,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  flex: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  linkText: {
    color: "#000",
    textDecorationLine: "underline",
    marginTop: 10,
  },
  margin: {
    marginTop: 30,
    marginBottom: 30,
  },
  marginBottom: {
    marginBottom: 10,
  },
  imageContainer: {
    height: 300,
    display: "flex",
    justifyContent: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    color: "#5340a9",
    fontWeight: "900",
    fontSize: 45,
  },
  subTitle: {
    color: "#5340a9",
    fontWeight: "500",
    fontSize: 25,
  },
  text: {
    width: 350,
    color: "#000",
    fontWeight: "400",
    fontSize: 12,
  },
  customButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#5340a9",
    backgroundColor: "#5340a9",
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});

export default HomePage;
