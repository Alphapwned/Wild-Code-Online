import { useContext } from "react";
import { useMatch } from "react-router-dom";
import "styles/components/fileActionMenu.scss";
import { fileContext } from "utils/context/FileContext";
import { SOFT_REMOVE_FILE_MUTATION } from "graphql/mutations/SOFT_REMOVE_FILE_MUTATION";
import { useMutation } from "@apollo/client";
import { useGetPrivateFiles, useGetPublicFiles } from "utils/hook/getProfile";

const FileActionMenu = () => {
	const { downloadFile, fileData, fileId, handleOpenModal, setIsCreate } =
		useContext(fileContext);
	const [deleteFile, { loading }] = useMutation(SOFT_REMOVE_FILE_MUTATION, {
		variables: { fileId },
	});
	const path = useMatch("/file");
	const { refetchPrivate } = useGetPrivateFiles();
	const { refetchPublic } = useGetPublicFiles();

	const handleArchiveFile = async () => {
		await deleteFile();
		refetchPublic();
		refetchPrivate();
	};

	const handleOpen = () => {
		setIsCreate(false);
		handleOpenModal();
	};
	return (
		<>
			<div className="action-main">
				<ul>
					{path !== null ? (
						<>
							<li onClick={handleOpen}>
								<span>Modifier</span>
							</li>
							<li onClick={() => downloadFile(fileData?.getFile.content)}>
								<span>Telecharger</span>
							</li>
							<div className="divider"></div>
							<li onClick={handleArchiveFile} className="archive">
								<span>Archiver</span>
							</li>
						</>
					) : (
						<li
							className="download"
							onClick={() => downloadFile(fileData?.getFile.content)}
						>
							<span>Telecharger</span>
						</li>
					)}
				</ul>
			</div>
		</>
	);
};

export default FileActionMenu;
