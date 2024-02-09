import { useContext } from "react";
import { fileContext } from "../../../utils/context/FileContext";
import { SOFT_REMOVE_FILE_MUTATION } from "../../../graphql/mutations/SOFT_REMOVE_FILE_MUTATION";
import { useMutation } from "@apollo/client";
import {
  useGetPrivateFiles,
  useGetPublicFiles,
} from "../../../utils/hook/getProfile";
import { Text, View, TouchableOpacity } from "react-native";
import searchFiles from "../../../styles/SearchFiles";

const FileActionMenu = ({ isFocused }) => {
  const { downloadFile, fileData, fileId, handleOpenModal, setIsCreate } =
    useContext(fileContext);
  const [deleteFile] = useMutation(SOFT_REMOVE_FILE_MUTATION, {
    variables: { fileId },
  });
  const { refetchPrivate } = useGetPrivateFiles();
  const { refetchPublic } = useGetPublicFiles();

  const handleArchiveFile = async () => {
    await deleteFile();
    refetchPublic();
    refetchPrivate();
  };

  const handleOpen = () => {
    setIsCreate(false);
    handleOpenModal();
  };
  return (
    <View style={searchFiles.actionMenu}>
      {!isFocused ? (
        <View style={searchFiles.actionMenuContent}>
          <TouchableOpacity
            onPress={() => downloadFile(fileData?.getFile.content)}
          >
            <Text style={searchFiles.actionMenuContentText}>Telecharger</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleArchiveFile}>
            <Text style={searchFiles.actionMenuContentText}>Archiver</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={searchFiles.actionMenuContent}>
          <TouchableOpacity
            onPress={() => downloadFile(fileData?.getFile.content)}
          >
            <Text style={searchFiles.actionMenuContentText}>Telecharger</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FileActionMenu;
