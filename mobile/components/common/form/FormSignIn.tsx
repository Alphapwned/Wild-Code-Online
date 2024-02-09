import React, { useState, useContext } from "react";
import { SIGN_IN_QUERY } from "../../../graphql/queries/SIGN_IN_QUERY";
import { useLazyQuery } from "@apollo/client";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authContext } from "../../../utils/context/AuthContext";

interface IuserSignIn {
  email: string;
  password: string;
}

const FormSignIn = ({ navigation }) => {
  const [signIn, { loading }] = useLazyQuery(SIGN_IN_QUERY);
  const { setIsAuth } = useContext(authContext);
  const [toast, setToast] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IuserSignIn>({ mode: "onBlur" });

  const handleLinkPress = (value) => {
    // Action à effectuer lorsque le lien est pressé
    navigation.navigate("S'inscrire", { type: value }); // Remplacez par l'action souhaitée
  };

  const onSubmit: SubmitHandler<IuserSignIn> = async (data) => {
    try {
      const result = await signIn({
        variables: data,
      });
      const token = result.data.signIn;
      await AsyncStorage.setItem("token", token);
      setIsAuth(true);
      setTimeout(() => {
        setToast(true);
        setTimeout(() => {
          setToast(false);
          navigation.navigate("Home");
        }, 500);
      }, 500);
    } catch (error) {
      setIsAuth(false);
      console.log(error);
    }
  };

  return (
    <View style={[styles.displayFlexCenter]}>
      <View style={[styles.containerCard, { backgroundColor: "#5340a9" }]}>
        <View style={[{ width: "100%" }, { paddingHorizontal: 20 }]}>
          <Text
            style={[styles.title, styles.textAlignCenter, { color: "#fff" }]}
          >
            Connectez-vous
          </Text>
          <Text
            style={[styles.text, styles.textAlignCenter, { color: "#fff" }]}
          >
            Bonjour ! Renseignez vos coordonnées pour vous connecter
          </Text>
          {toast && (
            <View>
              <Text style={[styles.success, styles.textAlignCenter]}>
                Connexion réussie! Vous allez être redirigé vers la page
                d'accueil.
              </Text>
            </View>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                id="email"
                placeholder="Email*"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: true,
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Format d'email invalide",
              },
            }}
          />

          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => (
              <Text style={styles.error}> {message}</Text>
            )}
          />
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                id="password"
                placeholder="Mot de passe*"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                secureTextEntry={true}
              />
            )}
            name="password"
            rules={{
              required: true,
              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
              },
            }}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => (
              <Text style={styles.error}> {message}</Text>
            )}
          />

          <TouchableOpacity
            style={[styles.customButton, { backgroundColor: "#fff" }]}
            onPress={handleSubmit(onSubmit)}
            disabled={loading}
          >
            <Text style={(styles.buttonText, { color: "#5340a9" })}>
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.text, styles.textAlignCenter, { color: "#fff" }]}>
          Pas encore de compte ?{" "}
          <Text
            style={[styles.text, styles.textAlignCenter, { color: "#849BCE" }]}
            onPress={() => handleLinkPress("free")}
          >
            Inscrivez-vous !
          </Text>
        </Text>
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
  title: {
    fontWeight: "600",
    fontSize: 25,
    marginBottom: 20,
    textTransform: "uppercase",
  },
  text: {
    fontWeight: "600",
    marginBottom: 20,
  },
  displayFlexCenter: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  containerCard: {
    position: "relative",
    marginVertical: 30,
    marginHorizontal: 15,
    paddingHorizontal: 0,
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

  input: {
    marginVertical: 10, // margin: 20px auto 10px; en React Native, utilisez marginVertical pour le margin-top et le margin-bottom // En React Native, il n'y a pas de valeur 'auto' pour la marge horizontale
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#5340a9",
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    color: "#222",
  },
  error: {
    marginVertical: 0, // margin: 20px auto 10px; en React Native, utilisez marginVertical pour le margin-top et le margin-bottom // En React Native, il n'y a pas de valeur 'auto' pour la marge horizontale
    backgroundColor: "pink",
    borderWidth: 1,
    borderColor: "#5340a9",
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    color: "red",
  },
  success: {
    marginVertical: 0, // margin: 20px auto 10px; en React Native, utilisez marginVertical pour le margin-top et le margin-bottom // En React Native, il n'y a pas de valeur 'auto' pour la marge horizontale
    backgroundColor: "green",
    borderWidth: 1,
    borderColor: "#5340a9",
    fontWeight: "bold",
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 5,
    color: "white",
  },
});
export default FormSignIn;
