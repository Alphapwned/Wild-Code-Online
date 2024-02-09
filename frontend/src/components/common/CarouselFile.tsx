import React from "react";
import ImageCode from "assets/img/our_project.png";

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
    <div className="card-carousel">
      <div className="content-img">
        <img src={imgSource} alt="Preview du fichier" />
      </div>
      <div className="content-info">
        <h4>{fileInfo.filename}</h4>
        <p>{fileInfo.createdAt}</p>
        <p className="language">{fileInfo.language}</p>
      </div>
    </div>
  );
};

export default CarouselFile;
