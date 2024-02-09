import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { SIGN_UP_MUTATION } from "graphql/mutations/SIGN_UP_MUTATION"
import { useMutation } from "@apollo/client"
import { useForm, SubmitHandler } from "react-hook-form"
import { extractValidationsErrors } from "utils/extractValidationsErrors"
import { useSearchParams } from "react-router-dom"
import { ErrorMessage } from "@hookform/error-message"

interface IuserSignUp {
  firstname?: string
  lastname?: string
  username: string
  email: string
  password: string
}
const FormSignUp = () => {
  const [searchParams] = useSearchParams()
  const queryType = searchParams.get("type")

  const navigate = useNavigate()
  const [addUser, { loading }] = useMutation(SIGN_UP_MUTATION)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<IuserSignUp>({ mode: "onBlur" })
  const onSubmit: SubmitHandler<IuserSignUp> = async (data) => {
    const input = {
      ...data,
      type: queryType || "free"
    }

    try {
      const result = await addUser({
        variables: { input },

        onError: (error) => {
          const validationErrors: Record<string, string[]> =
            extractValidationsErrors(error.graphQLErrors)
          for (const fieldKey of Object.keys(validationErrors)) {
            for (const message of validationErrors[fieldKey]) {
              const testError = setError(fieldKey as keyof IuserSignUp, {
                type: "manual",
                message: message
              })
              console.log(testError)
            }
          }
        }
      })
      const token = result.data.signUp
      localStorage.setItem("token", token)
      input.type === "free" ? navigate("/") : navigate("/")
    } catch (error: any) {}
  }
  return (
    <div className="container-card-form container-card-form-signup">
      <h2>Inscrivez-vous</h2>
      <p className="details-text">
        Bonjour ! Renseigner vos coordonnées pour vous inscrire
      </p>
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
          placeholder="Pseudo*"
          {...register("username", {
            required: "Ce champ est requis !",
            minLength: 1
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
          placeholder="Email*"
          {...register("email", {
            required: "Ce champ est requis !",
            pattern: {
              value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
              message: "Format d'email invalide"
            } })}
        />
        <ErrorMessage
          errors={errors}
          name="email"
          render={({ message }) => <p className="error-input"> {message}</p>}
        />
        <input
          type="password"
          id="password"
          placeholder="Mot de passe*"
          {...register("password", {
            required: "Ce champ est requis !",
            minLength: {
              value: 8,
              message: "Le mot de passe doit contenir au moins 8 caractères"
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[!@#$%^&*])/,
              message:
                "Le mot de passe doit contenir une lettres majuscules et minuscules, un chiffres et un caractères spécial"
            }
          })}
        />
        <ErrorMessage
          errors={errors}
          name="password"
          render={({ message }) => <p className="error-input"> {message}</p>}
        />
        <button className="button-form-signIn" disabled={loading}>S'inscrire</button>
      </form>

      <p className="signup-details">
        déjà un compte ? <Link to={"/sign-in"}>Connectez-vous !</Link>
      </p>
    </div>
  )
}

export default FormSignUp
