import { StyleSheet, Text, View, Image } from "react-native";
const AboutUs = () => {
  return (
    <View style={[styles.marginSection]} id="aboutUs">
      <Text style={[styles.textAlignCenter, styles.subTitle]}>About us</Text>
      <View>
        <Text style={[styles.subTitleSection]}>Our Project</Text>

        <View style={[styles.marginLeftRight]}>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
            iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non
            ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
          </Text>
          <View style={[styles.imageContainer, styles.marginContainerImage]}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={require("../../assets/img/our_project.png")}
              alt="photos avec les membres de l'équipe"
            />
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.subTitleSection]}>Our Project</Text>
        <View style={[styles.marginLeftRight]}>
          <Text>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui a
            iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non
            ipsam.Lorem ipsum dolor, sit amet consectetur adipisicing elit. Qui
            a iusto sed error et, corrupti nisi eveniet. Quisquam, fugit. Autem
            commodi quia ipsum tempore laboriosam quos architecto odit non ipsam
          </Text>
          <View style={[styles.imageContainer, styles.marginContainerImage]}>
            <Image
              style={{ width: "100%", height: "100%", borderRadius: 10 }}
              source={require("../../assets/img/our_team.png")}
              alt="photos avec les membres de l'équipe"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subTitleSection: {
    color: "#000",
    fontWeight: "500",
    fontSize: 18,
    marginLeft: 15,
    marginVertical: 25,
    marginBottom: 10,
  },
  marginSection: {
    marginBottom: 30,
  },
  marginLeftRight: {
    paddingHorizontal: 15,
  },
  textAlignCenter: {
    textAlign: "center",
  },
  imageContainer: {
    height: 300,
    display: "flex",
    justifyContent: "center",
  },
  marginContainerImage: {
    marginVertical: 15,
  },
  subTitle: {
    color: "#5340a9",
    fontWeight: "500",
    fontSize: 25,
  },
});
export default AboutUs;
