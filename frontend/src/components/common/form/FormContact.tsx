import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import "../../../styles/components/FormContact.scss";
import { CONTACT_MUTATION } from "graphql/mutations/CONTACT_MUTATION";
import { useMutation } from "@apollo/client";
import { extractValidationsErrors } from "utils/extractValidationsErrors";

interface IContactForm {
  name: string;
  email: string;
  title: string;
  content: string;
}

const ContactForm = () => {
  const [IContact, { loading }] = useMutation(CONTACT_MUTATION);
  const [Toast, setToast] = useState(false);

  const {
    register,
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

        onError: (error) => {
          const validationErrors: Record<string, string[]> =
            extractValidationsErrors(error.graphQLErrors);
          for (const fieldKey of Object.keys(validationErrors)) {
            for (const message of validationErrors[fieldKey]) {
              const testError = setError(fieldKey as keyof IContactForm, {
                type: "manual",
                message: message,
              });
              console.log(testError);
            }
          }
        },
      });
      setTimeout(() => {
        setToast(true);
      }, 2000);
    } catch (error: any) {}
  };

  return (
    <div id="contact" className="page-contact">
      <div className="contact-container">
        {Toast && (
          <div className="toast-message">
            <p>
              Formulaire envoyé. Nous vous répondrons sous les plus brefs délais
            </p>
          </div>
        )}
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <label>Contactez-nous</label>
          <input
            type="text"
            id="name"
            placeholder="Nom*"
            {...register("name", {
              required: "Un nom est requis !",
              minLength: 1,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <input
            type="email"
            id="email"
            placeholder="Email*"
            {...register("email", {
              required: "L'adresse mail doit être valide",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "L'adresse mail doit être valide",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />

          <input
            type="text"
            id="titre"
            placeholder="titre"
            {...register("title", {
              required: "Un nom est requis !",
            })}
          />
          <ErrorMessage
            errors={errors}
            name="title"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <textarea
            className="contact-content"
            rows={10}
            id="content"
            placeholder="Message*"
            {...register("content", {
              required: "Un message est obligatoire !",
              minLength: {
                value: 10,
                message:
                  "Le contenu du message doit contenir au moins 10 caractères",
              },
            })}
          />
          <ErrorMessage
            errors={errors}
            name="content"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
          <button
            type="submit"
            className="button-form-contact"
            disabled={loading}
          >
            Envoyer mon message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
