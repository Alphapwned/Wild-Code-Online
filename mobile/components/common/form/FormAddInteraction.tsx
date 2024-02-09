import { useForm, SubmitHandler } from "react-hook-form";
import { NEW_INTERACTION_MUTATION } from "../../../graphql/mutations/NEW_INTERACTION_MUTATION";
import { useMutation } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faThumbsUp, faThumbsDown } from "@fortawesome/free-solid-svg-icons";
import { INewInteractionProps } from "../../../utils/interface/INewInteraction";
import { Text, View, TouchableOpacity } from "react-native";
import searchFiles from "../../../styles/SearchFiles";
import { LinearGradient } from "expo-linear-gradient";

export interface interactionsInterface {
	type: string;
	user: {
		username: string;
	};
}
interface IFileData {
	id: number | null;
	interactions: interactionsInterface[];
	refetch: () => void;
	username: string;
}
const AddNewInteraction = (file: IFileData) => {
	const [addInteraction] = useMutation(NEW_INTERACTION_MUTATION);
	let interactionValue = '';

	const handleSetChecked = (value: string) => {
		interactionValue = value;
		setTimeout(handleSubmit(onSubmit), 500);
	};

	const { handleSubmit } = useForm<INewInteractionProps>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<INewInteractionProps> = async () => {
		try {
			await addInteraction({
				variables: {
					input: {
						fileId: file.id,
						type: interactionValue,
					},
				},
			});
			file.refetch();
		} catch (error: any) {
			console.log(error);
		}
	};

	return (
		<View style={searchFiles.interactionsContainer}>
			<TouchableOpacity onPress={() => handleSetChecked("Like")}>
				<LinearGradient
					colors={
						file.interactions.find(
							(i) => i.user.username === file.username
						)?.type === "Like"
							? [
									"rgba(133, 115, 215, 0.85)",
									"#6351b4",
									"#5340a9",
									"#6351b4",
									"rgba(133, 115, 215, 0.85)",
							  ]
							: ["white", "white"]
					}
					style={
						file.interactions.find(
							(i) => i.user.username === file.username
						)?.type === "Like"
							? searchFiles.activeInterationContainer
							: searchFiles.interactionContainer
					}
				>
					<Text
						style={
							file.interactions.find(
								(i) => i.user.username === file.username
							)?.type === "Like" ? searchFiles.active : searchFiles.inactive
						}
					>
						<FontAwesomeIcon
							style={
								file.interactions.find(
									(i) => i.user.username === file.username
								)?.type === "Like"
									? searchFiles.iconActive
									: searchFiles.iconInactive
							}
							icon={faThumbsUp}
							size={20}
						/>
					</Text>
					<Text
						style={
							file.interactions.find(
								(i) => i.user.username === file.username
							)?.type === "Like"
								? searchFiles.iconActive
								: searchFiles.iconInactive
						}
					>
						{file.interactions.filter((i) => i.type === "Like").length}
					</Text>
				</LinearGradient>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => handleSetChecked("Dislike")}>
				<LinearGradient
					colors={
						file.interactions.find(
							(i) => i.user.username === file.username
						)?.type === "Dislike"
							? [
									"rgba(133, 115, 215, 0.85)",
									"#6351b4",
									"#5340a9",
									"#6351b4",
									"rgba(133, 115, 215, 0.85)",
							  ]
							: ["white", "white"]
					}
					style={
						file.interactions.find(
							(i) => i.user.username === file.username
						)?.type === "Dislike"
							? searchFiles.activeInterationContainer
							: searchFiles.interactionContainer
					}
				>
					<Text
						style={
							file.interactions.find(
								(i) => i.user.username === file.username
							)?.type === "Dislike" ? searchFiles.active : searchFiles.inactive
						}
					>
						<FontAwesomeIcon
							style={
								file.interactions.find(
									(i) => i.user.username === file.username
								)?.type === "Dislike"
									? searchFiles.iconActive
									: searchFiles.iconInactive
							}
							icon={faThumbsDown}
							size={20}
						/>
					</Text>
					<Text
						style={
							file.interactions.find(
								(i) => i.user.username === file.username
							)?.type === "Dislike"
								? searchFiles.iconActive
								: searchFiles.iconInactive
						}
					>
						{file.interactions.filter((i) => i.type === "Dislike").length}
					</Text>
				</LinearGradient>
			</TouchableOpacity>
		</View>
	);
};

export default AddNewInteraction;
