import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CONTACT_MUTATION } from "../../../graphql/mutations/CONTACT_MUTATION";
import { ErrorMessage } from "@hookform/error-message";
// import { extractValidationsErrors } from "../../../../frontend/src/utils/extractValidationsErrors";

interface IContactForm {
  name: string;
  email: string;
  title: string;
  content: string;
}

const FormContact = () => {
  const [IContact, { loading }] = useMutation(CONTACT_MUTATION);
  const [toast, setToast] = useState(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IContactForm>({ mode: "onBlur" });

  const onSubmit: SubmitHandler<IContactForm> = async (data) => {
    try {
      await IContact({
        variables: {
          input: {
            title: data.title,
            name: data.name,
            email: data.email,
            content: data.content,
          },
        },
        // onError: (error) => {
        //   const validationErrors: Record<string, string[]> =
        //     extractValidationsErrors(error.graphQLErrors);
        //   for (const fieldKey of Object.keys(validationErrors)) {
        //     for (const message of validationErrors[fieldKey]) {
        //       setError(fieldKey as keyof IContactForm, {
        //         type: "manual",
        //         message: message,
        //       });
        //     }
        //   }
        // },
      });
      setTimeout(() => {
        setToast(true);
        setTimeout(() => {
          setToast(false);
        }, 2000);
      }, 4000);
    } catch (error: any) {
      // Handle error
      console.error(error);
    }
  };

  return (
    <View id="contact">
      <View style={[styles.containerCard, { backgroundColor: "#5340a9" }]}>
        <View style={[{ width: "100%" }, { paddingHorizontal: 20 }]}>
          <Text
            style={[styles.title, styles.textAlignCenter, { color: "#fff" }]}
          >
            Contactez-nous
          </Text>
          {toast && (
            <View>
              <Text style={[styles.success, styles.textAlignCenter]}>
                Formulaire envoyé. Nous vous répondrons sous les plus brefs
                délais
              </Text>
            </View>
          )}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Nom*"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="name"
            rules={{ required: "Un nom est requis !" }}
            defaultValue=""
          />

          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => (
              <Text style={styles.error}> {message}</Text>
            )}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email*"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="email"
            rules={{
              required: "L'adresse mail doit être valide",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "L'adresse mail doit être valide",
              },
            }}
            defaultValue=""
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
                placeholder="Titre"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
              />
            )}
            name="title"
            rules={{ required: "Un nom est requis !" }}
            defaultValue=""
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => (
              <Text style={styles.error}> {message}</Text>
            )}
          />

          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[styles.input, { textAlignVertical: "top" }]}
                // numberOfLines={8}
                placeholder="Message*"
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                multiline={true}
              />
            )}
            name="content"
            rules={{
              required: "Un message est obligatoire !",
              minLength: {
                value: 10,
                message:
                  "Le contenu du message doit contenir au moins 10 caractères",
              },
            }}
            defaultValue=""
          />
          <ErrorMessage
            errors={errors}
            name="content"
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
              Envoyer mon message
            </Text>
          </TouchableOpacity>
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

export default FormContact;
