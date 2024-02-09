import { ListingFile } from "./ListingFile";
import { handleDate } from "utils/DateFormat";
import AddNewInteraction from "./form/FormAddInteraction";
import { useGetProfile } from "utils/hook/getProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import FileActionMenu from "./dropdown/FileActionMenu";
import { useContext, useState } from "react";
import { fileContext } from "utils/context/FileContext";
export type GridFileProps = {
	files: Array<{
		id: number;
		filename: string;
		content?: string;
		createdAt: string;
		isPublic: boolean;
		interactions: Array<{
			type: string;
			user: { username: string };
		}>;
		language: {
			name: string;
		};
	}>;
	value: string;
	valueFilter: string;
	refetch: () => void;
};
const GridFileSearch = ({
	files,
	value,
	valueFilter,
	refetch,
}: GridFileProps) => {
	const { setFileId } =
		useContext(fileContext);
	const profile = useGetProfile();

	const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

	const HandleToggleAction = (id: number) => {
		if (isActionOpen === id) {
			setIsActionOpen(null);
			return;
		}
		setIsActionOpen(id);
		setFileId(id)
	};

	const handleString = (s: string) => {
		var r = s.toLowerCase();
		r = r.replace(new RegExp(/\s/g), "");
		r = r.replace(new RegExp(/[àáâãäå]/g), "a");
		r = r.replace(new RegExp(/æ/g), "ae");
		r = r.replace(new RegExp(/ç/g), "c");
		r = r.replace(new RegExp(/[èéêë]/g), "e");
		r = r.replace(new RegExp(/[ìíîï]/g), "i");
		r = r.replace(new RegExp(/ñ/g), "n");
		r = r.replace(new RegExp(/[òóôõö]/g), "o");
		r = r.replace(new RegExp(/œ/g), "oe");
		r = r.replace(new RegExp(/[ùúûü]/g), "u");
		r = r.replace(new RegExp(/[ýÿ]/g), "y");
		r = r.replace(new RegExp(/\W/g), "");
		r = r.replace(new RegExp(/\s/g), "");
		return r;
	};

	return (
		<>
			{files
				.filter((element: any) =>
					valueFilter
						? (handleString(element.filename).includes(handleString(value)) ||
								handleString(handleDate(element.createdAt)).includes(
									handleString(value)
								) ||
								handleString(element.language.name).includes(
									handleString(value)
								)) &&
						  handleString(element.language.name).includes(
								handleString(valueFilter)
						  )
						: handleString(element.filename).includes(handleString(value)) ||
						  handleString(handleDate(element.createdAt)).includes(
								handleString(value)
						  ) ||
						  handleString(element.language.name).includes(handleString(value))
				)
				.map((file) => (
					<div className="main-card" key={file.id}>
						<div className="action-container">
							<button
								onClick={() => HandleToggleAction(file.id)}
								className="action-button"
							>
								<FontAwesomeIcon icon={faEllipsis} size="xl" />
							</button>
							{isActionOpen === file.id ? <FileActionMenu /> : null}
						</div>
						<div className="card-container">
							<ListingFile
								id={file.id}
								filename={file.filename}
								content={file.content}
								createdAt={handleDate(file.createdAt)}
								isPublic={file.isPublic}
								language={file.language.name}
							/>
						</div>
						<div className="main-interaction-container">
							<AddNewInteraction
								id={file.id}
								interactions={file.interactions}
								refetch={refetch}
								username={profile?.username}
							/>
						</div>
					</div>
				))}
		</>
	);
};

export default GridFileSearch;
