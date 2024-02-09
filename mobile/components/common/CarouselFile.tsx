import React from "react";
import { ScrollView, Text, View, Image } from "react-native";
import filesStyles from "../../styles/SearchFiles";

interface IFileData {
  id?: number;
  filename: string;
  content?: string;
  createdAt: string;
  image?: string;
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

const CarouselFile = (fileInfo: IFileData) => {
  const imgSource = getImageSource(fileInfo.language);

  return (
    <View style={filesStyles.card}>
      <View>
        <Image
          style={filesStyles.cardImg}
          source={imgSource}
          accessibilityLabel="Preview du fichier"
        />
      </View>
      <View style={filesStyles.fileInfo}>
        <Text style={filesStyles.filename}>{fileInfo.filename}</Text>
        <Text style={filesStyles.date}>{fileInfo.createdAt}</Text>
        <Text style={filesStyles.language}>{fileInfo.language}</Text>
      </View>
    </View>
  );
};
export default CarouselFile;
