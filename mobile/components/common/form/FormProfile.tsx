import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useQuery, useMutation } from '@apollo/client';
import { GET_PROFILE_QUERY } from '../../../graphql/queries/GET_PROFILE_QUERY';
import { UPDATE_USER } from '../../../graphql/mutations/UPDATE_PROFILE';
import profileStyles from '../../../styles/ProfileStyles';


interface IuserProfile {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

const FormProfile = () => {
  const { control, handleSubmit, setValue, formState: { errors } } = useForm<IuserProfile>({ mode: "onBlur" });
  const { refetch, data } = useQuery(GET_PROFILE_QUERY, {
    variables: { filter: { isPublic: null } },
  });

  const [update, { loading }] = useMutation(UPDATE_USER);
  const userInfo = data?.getProfile;
  console.log(userInfo);
  const [validation, setValidation] = useState(false);

  useEffect(() => {
    if (data?.getProfile) {
      setValue("firstname", data.getProfile.firstname);
      setValue("lastname", data.getProfile.lastname);
      setValue("username", data.getProfile.username);
      setValue("email", data.getProfile.email);
    }
  }, [data]);

  const handlerValidation = () => {
    setValidation(true);

    setTimeout(() => {
      setValidation(false);
    }, 3000);
  };

  const onSubmit = async (formData) => {
    const input = {
      ...formData,
      email: formData.email !== userInfo?.email ? formData.email : '',
      username:
        formData.username !== userInfo?.username
          ? formData.username
          : undefined,
    };

    try {
      await update({
        variables: { update: input },
      });

      refetch();
      handlerValidation();
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating the user.");
    }
  };

  return (
    <View style={profileStyles.container}>
      <Text style={profileStyles.title}>Compte</Text>
      <Text style={profileStyles.subtitle}>Modifiez vos coordonnées !</Text>

      <View style={profileStyles.inputs}>
        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={profileStyles.textInput}
              placeholder="Prénom"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="firstname"
        />
        {errors.firstname && <Text>{errors.firstname.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={profileStyles.textInput}
              placeholder="Nom"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="lastname"
        />
        {errors.lastname && <Text>{errors.lastname.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={profileStyles.textInput}
              placeholder="Pseudo"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="username"
        />
        {errors.username && <Text>{errors.username.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={profileStyles.textInput}
              placeholder="Email"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="email"
        />
        {errors.email && <Text>{errors.email.message}</Text>}

        <Controller
          control={control}
          render={({ field }) => (
            <TextInput
              style={profileStyles.textInput}
              placeholder="Mot de passe (optionnel)"
              value={field.value}
              onChangeText={(text) => field.onChange(text)}
            />
          )}
          name="password"
        />
        {errors.password && <Text>{errors.password.message}</Text>}

        {validation && (
          <View>
            <Text>Les modifications ont bien été sauvegardées !</Text>
          </View>
        )}

        <TouchableOpacity
          style={profileStyles.button}
          onPress={handleSubmit(onSubmit)}
        >
          <Text style={profileStyles.buttonText}>Sauvegarder</Text>
        </TouchableOpacity>
        {validation && (
          <View>
            <Text style={profileStyles.validationText}>
              Les modifications ont bien été sauvegardées !
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default FormProfile;
