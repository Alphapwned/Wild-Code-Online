import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { fileContext } from "utils/context/FileContext";
import { NEW_FILE_MUTATION } from "graphql/mutations/NEW_FILE_MUTATION";
import { useMutation } from "@apollo/client";
import { ILanguageProps } from "utils/interface/ILanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { INewFileProps } from "utils/interface/INewFile";

const AddNewFile = () => {
  const [language, setLanguage] = useState<number>(0);
  const { Languages, handleCloseModal } = useContext(fileContext);
  const [addFile, { loading }] = useMutation(NEW_FILE_MUTATION);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewFileProps>({ mode: "onBlur" });
  const onSubmit: SubmitHandler<INewFileProps> = async (data) => {
    try {
      const result = await addFile({
        variables: {
          inputFile: {
            filename: data.filename,
            isPublic: data.isPublic,
          },
          languageId: language,
        },
      });
      handleCloseModal();
      navigate(`/coding/${result.data.addFile.id}`);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div className="container-card-form">
      <div className="container-card-form-title">
        <h2>Créer un nouveau fichier</h2>
        <span onClick={handleCloseModal}>
          <FontAwesomeIcon className="icon" icon={faClose} size="lg" />
        </span>
      </div>

      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <div className="container-input">
          <label htmlFor="filename"> Nom du fichier</label>
          <input
            type="text"
            id="filename"
            placeholder="Nom du fichier"
            {...register("filename", {
              required: "Ce champ est requis !",
              minLength: 1,
            })}
          />
          <ErrorMessage
            errors={errors}
            name="filename"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
        </div>
        <div className="container-input">
          <label htmlFor="languages"> Langage</label>
          <select
            id="languages"
            {...register("languageId", {
              required: "Ce champ est requis !",
            })}
            onChange={(e) => {
              setLanguage(parseInt(e.target.value));
            }}
          >
            <option value="">--Choisir un langage--</option>
            {Languages.map((language: ILanguageProps) => {
              return (
                <option value={language.id} key={language.id}>
                  {language.name}
                </option>
              );
            })}
          </select>
          <ErrorMessage
            errors={errors}
            name="languageId"
            render={({ message }) => <p className="error-input"> {message}</p>}
          />
        </div>
        <div className="container-input-checkbox">
          <input type="checkbox" id="privé" {...register("isPublic")} />
          <label htmlFor="privé">Marquer comme privé</label>
        </div>
        <button className="button-form" disabled={loading}>
          Valider
        </button>
      </form>
    </div>
  );
};

export default AddNewFile;
