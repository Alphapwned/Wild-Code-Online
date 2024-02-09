import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useContext } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { fileContext } from "utils/context/FileContext";
import { UPDATE_FILE_MUTATION } from "graphql/mutations/UPDATE_FILE_MUTATION";
import { useMutation } from "@apollo/client";
import { ILanguageProps } from "utils/interface/ILanguage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { INewFileProps } from "utils/interface/INewFile";
import { useGetPrivateFiles, useGetPublicFiles } from "utils/hook/getProfile";

const UpdateFile = () => {
	const { Languages, handleCloseModal, fileId, fileData } =
		useContext(fileContext);
	const [updateFile, { loading }] = useMutation(UPDATE_FILE_MUTATION);
	const { refetchPrivate } = useGetPrivateFiles();
	const { refetchPublic } = useGetPublicFiles();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<INewFileProps>({ mode: "onBlur" });
	const onSubmit: SubmitHandler<INewFileProps> = async (data) => {
    try {
			await updateFile({
				variables: {
					update: {
						filename: data.filename,
						isPublic: data.isPublic,
						languageId: data.languageId,
					},
					updateFileId: fileId,
				},
			});
			handleCloseModal();
			refetchPrivate();
			refetchPublic();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<div className="container-card-form">
			<div className="container-card-form-title">
				<h2>Modifier votre fichier</h2>
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
							value: fileData?.getFile.filename,
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
							value: fileData?.getFile.language.id,
							valueAsNumber: true,
						})}
					>
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
					<input
						type="checkbox"
						id="privé"
						{...register("isPublic", { value: fileData?.getFile.isPublic })}
					/>
					<label htmlFor="privé">Marquer comme privé</label>
				</div>
				<button className="button-form" disabled={loading}>
					Modifier
				</button>
			</form>
		</div>
	);
};

export default UpdateFile;
