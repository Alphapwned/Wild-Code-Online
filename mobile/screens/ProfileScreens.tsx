import FormProfile from "../components/common/form/FormProfile";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../utils/context/AuthContext";
import React, { useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { isAuthenticated, setIsAuth } = useContext(authContext);
  const disconnect = async () => {
    await AsyncStorage.removeItem("token");
    setIsAuth(false);
    //@ts-ignore
    navigation.navigate("Connexion");
  };

  return (
    <>
      <ScrollView>
        <FormProfile />
      </ScrollView>
      <Button title="Déconnexion" onPress={disconnect} />
    </>
  );
};

export default ProfileScreen;
