import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CardPricingPage from "../components/common/CardPricingPage";

const PricingScreen = () => {
  const navigation = useNavigation();
  return (
    <ScrollView style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
      <CardPricingPage navigation={navigation} />
    </ScrollView>
  );
};
export default PricingScreen;
