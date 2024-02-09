import { createContext, useState } from "react";
import { GET_LANGUAGES_QUERY } from "../../graphql/queries/GET_LANGUAGES_QUERY";
import { useQuery } from "@apollo/client";
import { IFileContextProps } from "../interface/IFileContext";
import { GET_FILE_QUERY } from "../../graphql/queries/GET_FILE_QUERY";
import * as FileSystem from "expo-file-system";
import { Fileinterface } from "../interface/IFile";
import { Platform } from "react-native";

// on défini un nouveau context
export const fileContext = createContext<IFileContextProps>({
	Languages: [],
	isShow: false,
	handleOpenModal: () => {},
	handleCloseModal: () => {},
	downloadFile: () => "",
	fileData: {
		getFile: {
			id: 0,
			filename: "",
			content: "",
			createdAt: "",
			isPublic: false,
			language: {
				name: "",
				id: 0,
			},
			interactions: [
				{
					type: "",
					user: {
						username: "",
					},
				},
			],
			user: {
				username: "",
			},
		},
	},
	fileRefetch: () => {},
	fileId: null,
	setFileId: () => {},
	setIsCreate: () => {},
	isCreate: true,
});

interface FileProviderProps {
	children?: React.ReactNode;
}
export const FileProvider = ({ children }: FileProviderProps) => {
	const [isShow, setIsShow] = useState<boolean>(false);
	const [fileId, setFileId] = useState<number | null>(null);
	const [isCreate, setIsCreate] = useState<boolean>(true);

	const { data, refetch } = useQuery(GET_LANGUAGES_QUERY);

	const Languages = data?.getLanguages || [];
	const fetchLanguages = async () => {
		await refetch();
	};

	const handleOpenModal = () => {
		setIsShow(true);
		fetchLanguages();
	};

	const handleCloseModal = () => {
		setIsShow(false);
	};

	const { data: fileData, refetch: fileRefetch } = useQuery(GET_FILE_QUERY, {
		variables: { fileId },
	});

	const downloadFile = async (code: string) => {
		if (fileData && fileData.getFile) {
			const fileName = fileData.getFile.filename || `default_filename`;
			const dir =
				FileSystem.StorageAccessFramework.getUriForDirectoryInRoot("Documents");

			try {
				saveFile(dir, `${fileName}.txt`, "Content-Type", code);
			} catch (error) {
				console.log(error);
			}
		}
	};
	async function saveFile(dir, filename, mimetype, code) {
		if (Platform.OS === "android") {
			const permissions =
				await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync(
					dir
				);

			if (permissions.granted) {
				 await FileSystem.StorageAccessFramework.createFileAsync(
						permissions.directoryUri,
						filename,
						mimetype
					)
						.then(async (uri) => {
							await FileSystem.writeAsStringAsync(uri, code);
						})
						.catch((e) => console.log(e));
			}
		}
	}

	return (
		<fileContext.Provider
			value={{
				Languages,
				handleOpenModal,
				handleCloseModal,
				downloadFile,
				fileData,
				fileRefetch,
				isShow,
				fileId,
				setFileId,
				isCreate,
				setIsCreate,
			}}
		>
			{children}
		</fileContext.Provider>
	);
};
