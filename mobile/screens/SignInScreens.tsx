import FormSignIn from "../components/common/form/FormSignIn";
import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SignInScreens = () => {
  const navigation = useNavigation();
  return (
    <>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <FormSignIn navigation={navigation} />
      </View>
    </>
  );
};

export default SignInScreens;
