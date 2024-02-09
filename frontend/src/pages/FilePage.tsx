import React, { useEffect } from "react";
import Layout from "components/common/layouts/Layout";
import GridFile from "components/common/GridFile";
import "styles/FilePage.scss";
import { useContext } from "react";
import { fileContext } from "utils/context/FileContext";
import FormNewFile from "components/common/form/FormAddFile";
import UpdateFile from "components/common/form/FormUpdateFile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "styles/AddFileForm.scss";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_QUERY } from "graphql/queries/GET_PROFILE_QUERY";
import "styles/FilePage.scss";
import "styles/AddFileForm.scss";
import AuthenticatedPage from "utils/hoc/authenticatedPage";
import { useGetPrivateFiles, useGetPublicFiles } from "utils/hook/getProfile";
// src/types/file.ts
// Dedans, on va exporter le type suivant :
type File = {
	id: number;
	filename: string;
	content: string;
	createdAt: string;
	image: string;
	isPublic: boolean;
};

const FilePage = () => {
	const { isShow, handleOpenModal, handleCloseModal, setIsCreate, isCreate } =
		useContext(fileContext);

	const { privateFiles } = useGetPrivateFiles();
	const { publicFiles } = useGetPublicFiles();

	const handleOpen = () => {
		setIsCreate(true);
		handleOpenModal();
	};

	return (
		<Layout>
			<div className="container-file-page">
				<div className="container-creation-head">
					<h2>Mes créations</h2>
					<button onClick={handleOpen}>
						Fichier <FontAwesomeIcon className="icon" icon={faPlus} size="sm" />
					</button>
				</div>
				<GridFile filesCarousel={privateFiles} title="Privés" />
				<GridFile filesCarousel={publicFiles} title="Publics" />
			</div>
			{isShow && isCreate ? (
				<>
					<div
						id="fileModal"
						className="modalShow"
						onClick={handleCloseModal}
					></div>
					<div className="modal">
						<div className="modalBody">
							<FormNewFile />
						</div>
					</div>
				</>
			) : isShow && !isCreate ? (
				<>
					<div
						id="fileModal"
						className="modalShow"
						onClick={handleCloseModal}
					></div>
					<div className="modal">
						<div className="modalBody">
							<UpdateFile />
						</div>
					</div>
				</>
			) : null}
		</Layout>
	);
};

export default AuthenticatedPage(FilePage);
