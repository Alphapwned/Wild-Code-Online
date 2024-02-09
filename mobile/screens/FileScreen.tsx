import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { authContext } from "../utils/context/AuthContext";
import GridFile from "../components/common/GridFile";
import { fileContext } from "../utils/context/FileContext";
import { useQuery } from "@apollo/client";
import { GET_PROFILE_QUERY } from "../graphql/queries/GET_PROFILE_QUERY";
import {
  useGetPrivateFiles,
  useGetPublicFiles,
} from "../utils/hook/getProfile";

const FileScreen = ({navigation}) => {
  const { privateFiles, refetchPrivate } = useGetPrivateFiles();
  const { publicFiles, refetchPublic } = useGetPublicFiles();
  const { isAuthenticated, setIsAuth } = useContext(authContext);
  const [isPublic, setIsPublic] = useState(true);

  return isAuthenticated ? (
    <View>
      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={isPublic ? styles.containerTitleActive : styles.containerTitle}
          onPress={() => setIsPublic(true)}
        >
          <Text style={isPublic ? styles.titleTextActive : styles.titleText}>
            Publique
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            !isPublic ? styles.containerTitleActive : styles.containerTitle
          }
          onPress={() => setIsPublic(false)}
        >
          <Text style={!isPublic ? styles.titleTextActive : styles.titleText}>
            Privé
          </Text>
        </TouchableOpacity>
      </View>
      {isPublic ? (
        <GridFile
          filesCarousel={publicFiles}
          title="Publics"
          refetch={refetchPublic}
          navigation={navigation}
        />
      ) : (
        <GridFile
          filesCarousel={privateFiles}
          title="Privés"
            refetch={refetchPrivate}
            navigation={navigation}
        />
      )}


    </View>
  ) : (
    <>
      <Text>Not authenticated</Text>
    </>
  );
};

const styles = StyleSheet.create({
  containerButtons: {
    flexDirection: "row",
  },
  containerTitle: {
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
    width: "50%",
    borderWidth: 0.5,
    borderColor: "#5340a9",
  },
  titleText: {
    color: "#5340a9",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
  },
  containerTitleActive: {
    backgroundColor: "#5340a9",
    padding: 10,
    alignItems: "center",
    width: "50%",
    borderWidth: 0.5,
    borderColor: "#5340a9",
  },
  titleTextActive: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center",
  },
});

export default FileScreen;
