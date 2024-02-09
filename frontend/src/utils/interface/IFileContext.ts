import { ILanguageProps } from "utils/interface/ILanguage"
import { Fileinterface } from "./IFile"

export interface IFileContextProps {
	Languages: ILanguageProps[];
	isShow: boolean;
	handleOpenModal: () => void;
	handleCloseModal: () => void;
	downloadFile: (arg: string) => void;
	fileData: Fileinterface;
	fileRefetch: () => void;
	fileId: number | null;
	setFileId: (arg: number | null) => void
	setIsCreate: (arg: boolean) => void
	isCreate: boolean
}