import { ListingFile } from "./ListingFile";
import { handleDate } from "../../utils/DateFormat";
import AddNewInteraction from "./form/FormAddInteraction";
import { useGetProfile } from "../../utils/hook/getProfile";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import FileActionMenu from "./dropdown/FileActionMenu";
import { useContext, useState } from "react";
import { fileContext } from "../../utils/context/FileContext";
import searchFiles from "../../styles/SearchFiles";
import { authContext } from "../../utils/context/AuthContext";

import { View, SafeAreaView, TouchableOpacity, FlatList } from "react-native";

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
	isFocused?: boolean;
	navigation: any;
};
const GridFileSearch = ({
	files,
	value,
	valueFilter,
	refetch,
	isFocused,
	navigation,
}: GridFileProps) => {
  const { setFileId } = useContext(fileContext);
  const { isAuthenticated } = useContext(authContext);
  const profile = useGetProfile();

  const [isActionOpen, setIsActionOpen] = useState<number | null>(null);

  const HandleToggleAction = (id: number) => {
    if (isActionOpen === id) {
      setIsActionOpen(null);
      return;
    }
    setIsActionOpen(id);
    setFileId(id);
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

  const handleFilter = () => {
    return files.filter((element: any) =>
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
    );
  };

	const FileItem = ({ file, navigation }) => {
		return (
			<TouchableOpacity onPress={() => navigation.navigate("Editor", {id: file.id })} style={searchFiles.card}>
				<View style={searchFiles.actionContainer}>
					<TouchableOpacity onPress={() => HandleToggleAction(file.id)}>
						<FontAwesomeIcon icon={faEllipsis} size={28} />
					</TouchableOpacity>
					{isActionOpen === file.id ? (
						<FileActionMenu isFocused={isFocused} />
					) : null}
				</View>
				<View>
					<ListingFile
						id={file.id}
						filename={file.filename}
						content={file.content}
						createdAt={handleDate(file.createdAt)}
						isPublic={file.isPublic}
						language={file?.language?.name}
					/>
				</View>
				{isAuthenticated ? (
					<View>
						<AddNewInteraction
							id={file.id}
							interactions={file.interactions}
							refetch={refetch}
							username={profile?.username}
						/>
					</View>
				) : null}
			</TouchableOpacity>
		);
	};

	return (
		<SafeAreaView style={searchFiles.cardList}>
			<FlatList
				data={handleFilter()}
				renderItem={({ item }) => <FileItem file={item} navigation={navigation} />}
				keyExtractor={(item) => item.id.toString()}
			/>
		</SafeAreaView>
	);
};

export default GridFileSearch;
