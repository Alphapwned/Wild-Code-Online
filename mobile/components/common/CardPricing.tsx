import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
const CardPricing = ({ navigation }) => {
  const handleLinkPress = () => {
    // Action à effectuer lorsque le lien est pressé
    navigation.navigate("Pricing"); // Remplacez par l'action souhaitée
  };
  return (
    <View style={[styles.marginSection]}>
      <Text style={[styles.textAlignCenter, styles.subTitle]} id="Pricing">
        Pricing
      </Text>
      <View>
        <View style={[styles.containerCard]}>
          <Text style={[styles.title]}>Basique</Text>
          <View style={[styles.containerPrice]}>
            <Text style={[styles.price]}>
              0<Text style={[styles.devise]}>€</Text>
            </Text>
          </View>

          <TouchableOpacity
            style={styles.customButton}
            onPress={handleLinkPress}
          >
            <Text style={styles.buttonText}>En savoir plus</Text>
          </TouchableOpacity>
          <Text style={[styles.textAlignCenter]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            praesentium.
          </Text>
        </View>

        {/* deuxième card */}
        <View style={[styles.containerCard, { backgroundColor: "#5340a9" }]}>
          <Text style={[styles.title, { color: "#fff" }]}>Premium</Text>
          <View style={[styles.containerPrice]}>
            <Text style={[styles.price, { color: "#fff" }]}>
              9,99<Text style={[styles.devise, { color: "#fff" }]}>€</Text>
              <Text
                style={[
                  { color: "#fff" },
                  { fontSize: 10 },
                  { textTransform: "lowercase" },
                ]}
              >
                /mois
              </Text>
            </Text>
          </View>

          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#fff" }]}
            onPress={handleLinkPress}
          >
            <Text style={(styles.buttonText, { color: "#5340a9" })}>
              En savoir plus
            </Text>
          </TouchableOpacity>
          <Text style={[styles.textAlignCenter, { color: "#fff" }]}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque,
            praesentium.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  marginSection: {
    marginBottom: 30,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  title: {
    fontWeight: "600",
    fontSize: 25,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  subTitle: {
    color: "#5340a9",
    fontWeight: "500",
    fontSize: 25,
  },
  containerPrice: {
    position: "relative",
  },
  price: {
    fontWeight: "600",
    fontSize: 50,
    textTransform: "uppercase",
  },

  devise: {
    fontWeight: "500",
    fontSize: 20,
    textTransform: "uppercase",
    position: "relative",
    top: 0,
    right: 0,
  },

  containerCard: {
    marginVertical: 30,
    marginHorizontal: 15,
    paddingHorizontal: 5,
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.75,
    shadowRadius: 17,
    elevation: 5,
    overflow: "hidden",
  },

  customButton: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#5340a9",
    backgroundColor: "#5340a9",
    marginVertical: 15,
  },
  buttonText: {
    color: "white",
    fontWeight: "500",
  },
});
export default CardPricing;
