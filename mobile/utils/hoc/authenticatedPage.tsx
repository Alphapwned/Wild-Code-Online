import { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

type ReactComponent = () => JSX.Element;

const AuthenticatedPage = (Page: ReactComponent) => {
  const navigation = useNavigation();

    useEffect(() => {
      const checkToken = async () => {
        const token = await AsyncStorage.getItem("token").then((res) => {
          console.log(res);
          if (!res) {
            //navigation.navigate("Sign-in");
          }
        });
      };
  
      checkToken();
    }, []);

    return <Page />;
  }

export default AuthenticatedPage;
