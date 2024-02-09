import React from "react";
import { Text, View, Image } from "react-native";
import searchFiles from "../../styles/SearchFiles";

interface IFileData {
  id?: number;
  filename: string;
  content?: string;
  createdAt: string;
  isPublic: boolean;
  language: string;
}

const getImageSource = (language: string) => {
  switch (language.toLowerCase()) {
    case "javascript":
      return require("../../assets/img/javascriptlogo.png");
    case "php":
      return require("../../assets/img/phplogo.png");
    case "typescript":
      return require("../../assets/img/typescript.png");
    default:
      return require("../../assets/img/questionmarklogo.png");
  }
};

export const ListingFile = (fileInfo: IFileData, { navigation }) => {
  const imgSource = getImageSource(fileInfo.language);
  const handleClick = (id?: number) => {
    navigation.navigate(`/coding/${id}`);
  };
  return (
    <View>
      <View>
        <Image
          style={searchFiles.cardImg}
          source={imgSource}
          accessibilityLabel="Preview du fichier"
        />
      </View>
      <View style={searchFiles.fileInfo}>
        <Text style={searchFiles.filename}>{fileInfo.filename}</Text>
        <Text style={searchFiles.date}>{fileInfo.createdAt}</Text>
        <Text style={searchFiles.language}>{fileInfo.language}</Text>
      </View>
    </View>
  );
};
