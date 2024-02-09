import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Console } from "console";
import React, { useContext, useState } from "react";
import "styles/components/SearchBar.scss";
import { fileContext } from "utils/context/FileContext";
import { ILanguageProps } from "utils/interface/ILanguage";

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
  return (
    <div className="content-search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="icon-search">
        <FontAwesomeIcon className="icon" icon={faSearch} size="xl" />
      </div>
      <select
        name="language"
        id="language-select"
        onChange={(e) => setFilterValue(e.target.value)}
      >
        <option value="">Choisir un Language</option>

        {Languages.map((language: ILanguageProps) => {
          return (
            <option value={language.name} key={language.name}>
              {language.name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default SearchBar;
