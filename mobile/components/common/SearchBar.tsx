import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { useContext, useState } from "react";
import { fileContext } from "../../utils/context/FileContext";
import { ILanguageProps } from "../../utils/interface/ILanguage";
import { View, TextInput } from "react-native";
import searchFiles from "../../styles/SearchFiles";
import DropDownPicker from "react-native-dropdown-picker";

export type GridFileProps = {
	files: Array<{
		id: number;
		filename: string;
		content?: string;
		createdAt: string;
		isPublic: boolean;
		language: {
			name: string;
		};
	}>;
};
const SearchBar = ({
	value,
	setValue,
	setFilterValue,
	valueFilter,
}: {
	setFilterValue: React.Dispatch<React.SetStateAction<string>>;
	value: string;
	valueFilter: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
	const { Languages } = useContext(fileContext);
	const [open, setOpen] = useState(false);
	const [items, setItems] = useState(
		Languages.map((language: ILanguageProps) => {
			return {
				label: language.name,
				value: language.name,
			};
		})
	);
	return (
		<View>
			<View style={searchFiles.searchBar}>
				<TextInput
					style={searchFiles.searchInput}
					value={value}
					onChangeText={(value) => setValue(value)}
					placeholder="Rechercher par nom, langage, date"
				/>
				<FontAwesomeIcon
					style={searchFiles.searchIcon}
					icon={faSearch}
					size={20}
				/>
			</View>
			<View style={searchFiles.dropdownContainer}>
				<DropDownPicker
					open={open}
					value={valueFilter}
					items={items}
					setOpen={setOpen}
					setValue={setFilterValue}
					setItems={setItems}
					placeholder="Choisir un langage"
				/>
			</View>
		</View>
	);
};

export default SearchBar;
