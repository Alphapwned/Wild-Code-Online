import { createContext, useState } from "react"
import { GET_LANGUAGES_QUERY } from "graphql/queries/GET_LANGUAGES_QUERY"
import { useQuery } from "@apollo/client"
import { IFileContextProps } from "utils/interface/IFileContext"
import { GET_FILE_QUERY } from "graphql/queries/GET_FILE_QUERY";

import { Fileinterface } from "utils/interface/IFile";

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
				id: 0
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
	isCreate: true
});

interface FileProviderProps {
  children?: React.ReactNode
}
export const FileProvider = ({ children }: FileProviderProps) => {
  const [isShow, setIsShow] = useState<boolean>(false)
  const [fileId, setFileId] = useState<number | null>(null)
  const [isCreate, setIsCreate] = useState<boolean>(true)
  
  const { data, refetch } = useQuery(GET_LANGUAGES_QUERY)

  const Languages = data?.getLanguages || []
  const fetchLanguages = async () => {
    await refetch()
  }

  const handleOpenModal = () => {
    setIsShow(true)
    fetchLanguages()
  }

  const handleCloseModal = () => {
    setIsShow(false)
  }

  const { data: fileData, refetch: fileRefetch } = useQuery(GET_FILE_QUERY, {
		variables: { fileId },
	});

  const getExtensionForLanguage = (languageId: { name: string } | undefined) => {
    if (languageId && typeof languageId.name === 'string') {
      switch (languageId.name.toLowerCase()) {
        case "javascript":
          return ".js";
        case "typescript":
          return ".ts";
        case "php":
          return ".php";
        default:
          return ".txt";
      }
    }
    return null;
  };
  
  const downloadFile = (code: string) => {
    if (fileData && fileData.getFile) {
      const languageId = fileData.getFile.language;
      const fileExtension = getExtensionForLanguage(languageId) || ".txt";
      const fileName = fileData.getFile.filename || `default_filename`;
      const blob = new Blob([code], { type: 'application/octet-stream' });
      const a = document.createElement("a");
  
      a.href = URL.createObjectURL(blob);
      a.download = `${fileName}${fileExtension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
    }
  };

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
}

