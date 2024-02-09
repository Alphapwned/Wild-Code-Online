import { StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FormSignUp from "../components/common/form/FormSignUp";

const SignUpScreens = ({navigation, route}) => {
  
  return (
    <>
      <View style={[{ flex: 1 }, { backgroundColor: "#fff" }]}>
        <FormSignUp navigation={navigation} route={route} />
      </View>
    </>
  );
};

export default SignUpScreens;
