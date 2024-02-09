import { useForm, SubmitHandler } from "react-hook-form";
import "styles/components/FormInteration.scss";
import { NEW_INTERACTION_MUTATION } from "graphql/mutations/NEW_INTERACTION_MUTATION";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { INewInteractionProps } from "utils/interface/INewInteraction";
import {interactionsInterface} from '../../../pages/Coding';

interface IFileData {
	id: number | null;
	interactions: interactionsInterface[];
	refetch: () => void;
	username: string;
}
const AddNewInteraction = (file: IFileData) => {
	const [addInteraction] = useMutation(NEW_INTERACTION_MUTATION);

	const { register, handleSubmit } = useForm<INewInteractionProps>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<INewInteractionProps> = async (data) => {
		try {
			await addInteraction({
				variables: {
					input: {
						fileId: file.id,
						type: data.type,
					},
				},
			});
			file.refetch();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<form className="interaction-container">
			<label
				className={
					file.interactions.find(
						(i) => i.type === "Like" && i.user.username === file.username
					)?.user.username === file.username
						? "button-clicked"
						: "button"
				}
				htmlFor={`like${file.id}`}
				onClick={() => setTimeout(handleSubmit(onSubmit), 500)}
			>
				<span className="icon">
					<FontAwesomeIcon icon={faThumbsUp} size="sm" />
				</span>
				<span>{file.interactions.filter((i) => i.type === "Like").length}</span>
			</label>
			<input
				className="like"
				id={`like${file.id}`}
				type="radio"
				value="Like"
				{...register("type")}
			/>

			<label
				className={
					file.interactions.find(
						(i) => i.type === "Dislike" && i.user.username === file.username
					)?.user.username === file.username
						? "button-clicked"
						: "button"
				}
				htmlFor={`dislike${file.id}`}
				onClick={() => setTimeout(handleSubmit(onSubmit), 500)}
			>
				<span className="icon">
					<FontAwesomeIcon icon={faThumbsDown} size="sm" />
				</span>
				<span>
					{file.interactions.filter((i) => i.type === "Dislike").length}
				</span>
			</label>
			<input
				className="dislike"
				id={`dislike${file.id}`}
				{...register("type")}
				type="radio"
				value="Dislike"
			/>
		</form>
	);
};

export default AddNewInteraction;
