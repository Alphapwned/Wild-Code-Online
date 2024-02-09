import React from "react";
import "styles/components/ListingFile.scss";
import { useNavigate } from "react-router-dom";

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

export const ListingFile = (fileInfo: IFileData) => {
  const imgSource = getImageSource(fileInfo.language);
  const navigate = useNavigate();
  const handleClick = (id?: number) => {
    navigate(`/coding/${id}`);
  };
  return (
    <div
      className="content-listing"
      onClick={() => {
        handleClick(fileInfo?.id);
      }}
    >
      <div className="content-img-listing">
        <img src={imgSource} alt="Preview du fichier" />
      </div>
      <div className="content-info-listing">
        <h4>{fileInfo.filename}</h4>
        <p>{fileInfo.createdAt}</p>
        <p className="language">{fileInfo.language}</p>
      </div>
    </div>
  );
};
