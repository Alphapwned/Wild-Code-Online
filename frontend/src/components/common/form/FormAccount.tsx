import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useForm, SubmitHandler } from "react-hook-form";
import { extractValidationsErrors } from "utils/extractValidationsErrors";
import { useSearchParams } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { GET_PROFILE_INFO_QUERY } from "graphql/queries/GET_PROFILE_INFO_QUERY";
import "../../../styles/components/FormAccount.scss";
import { UPDATE_USER } from "graphql/mutations/UPDATE_PROFILE";
interface IUserSettings {
  getProfile: {
    firstname?: string;
    lastname?: string;
    username: string;
    email: string;
    password: string;
  };
}
interface IUserUpdate {
  firstname?: string;
  lastname?: string;
  username: string;
  email: string;
  password: string;
}
const FormAccount = () => {
  const { refetch, data } = useQuery<IUserSettings>(GET_PROFILE_INFO_QUERY, {
    variables: { filter: { isPublic: null } },
  });

  const [update, { loading }] = useMutation<IUserUpdate>(UPDATE_USER);
  const userInfo = data?.getProfile;
  const [validation, setValidation] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm<IUserUpdate>({ mode: "onBlur" });

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

    const timer = setTimeout(() => {
      setValidation(false);
    }, 3000);
    return () => clearTimeout(timer);
  };

  const onSubmit: SubmitHandler<IUserUpdate> = async (data) => {
    const input = {
      ...data,
      email: data.email !== userInfo?.email ? data.email : undefined,
      username:
        data.username !== userInfo?.username ? data.username : undefined,
    };

    try {
      const result = await update({
        variables: { update: input },

        onError: (error) => {
          const validationErrors: Record<string, string[]> =
            extractValidationsErrors(error.graphQLErrors);
          for (const fieldKey of Object.keys(validationErrors)) {
            for (const message of validationErrors[fieldKey]) {
              const testError = setError(fieldKey as keyof IUserUpdate, {
                type: "manual",
                message: message,
              });
              console.log(testError);
            }
          }
        },
      });

      console.log(result);
      refetch();
    } catch (error: any) {}
  };

  return (
    <div className="container-global-form-account">
      <div className="container-card-form container-card-form-account">
        <h2>Compte</h2>
        <p className="details-text">Modifier vos coordonées !</p>
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="container-input-firstName-lastName">
            <input
              type="text"
              id="firstName"
              placeholder="Prénom"
              {...register("firstname")}
            />
            <input
              type="text"
              id="lastName"
              placeholder="Nom"
              {...register("lastname")}
            />
          </div>
          <input
            type="text"
            id="pseudo"
            placeholder="Pseudo"
            {...register("username", {
              minLength: 1,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="username"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <input
            type="email"
            id="email"
            placeholder="Email"
            {...register("email", {
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Format d'email invalide",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <input
            type="password"
            id="password"
            placeholder="Mot de passe (optionnel)"
            {...register("password", {
              required: false,

              minLength: {
                value: 8,
                message: "Le mot de passe doit contenir au moins 8 caractères",
              },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
                message:
                  "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="password"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          {validation && (
            <div className="validation-save">
              Les modifications ont bien été sauvgardé !
            </div>
          )}

          <button onClick={handlerValidation} className="button-form-signIn">
            Sauvgarder
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAccount;
