import CodeEditor, { CodeEditorSyntaxStyles } from '@rivascva/react-native-code-editor';
import React, { useContext, useRef, useState} from "react";
import { View, Text, Button, ScrollView, TextInput} from "react-native";
import { useMutation, useQuery } from "@apollo/client";
import { RAN_CODE } from "../graphql/mutations/RAN_CODE";
import { GET_FILE_QUERY } from "../graphql/queries/GET_FILE_QUERY";
import { useFocusEffect } from '@react-navigation/native'
import { Languages } from '@rivascva/react-native-code-editor/lib/typescript/languages';
import { authContext } from "../utils/context/AuthContext";

const Editor = ( {navigation, route}): JSX.Element => {
  const [code, setCode] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [runCode, { loading }] = useMutation(RAN_CODE);
  const [fileUser, setfileUser] = useState<string>("");
  const { id } = route.params
  const { isAuthenticated } = useContext(authContext);
  const codeEditorRef = useRef<TextInput>(null);
  let fileId: number | null = null;
  if (id) {
    fileId = parseInt(id);
  }
  const { data: fileData, refetch: fileRefetch } = useQuery(GET_FILE_QUERY, {
    variables: { fileId },
  });

  const [showConsole, setShowConsole] = useState(true);

  useFocusEffect(() => {
    
    if (fileData && fileData.getFile) {
      setCode(fileData.getFile.content);
      setLanguage(fileData.getFile.language.name)
      setfileUser(fileData.getFile.user.username);
      console.log(fileData.getFile);
    }
    return () => {
      if (!navigation.isFocused()) {
        setCode("")
        setResult("")
      }
    }
  });

  const handleRunCode = async () => {
    if (fileId) {
      const runCodeId = fileId;
      try {
        const response = await runCode({
          variables: {
            content: code,
            runCodeId,
          },
        });
        const filteredResult = JSON.parse(response.data.runCode).run.output.replace(/\/piston\/[^ ]* /g, "");
        setResult(filteredResult);
        setShowConsole(true);
      } catch (error: any) {
        const filteredError = error.toString().replace(/\/piston\/[^ ]* /g, "");
        setResult(filteredError);
        setShowConsole(true);
      }
    }
  };

console.log(fileId)
  return (
    <View style={{ flexDirection: "column" }}>
      {code ?
        <ScrollView style={result && isAuthenticated ? {width: '100%', height: '70%', backgroundColor: 'black'} :  isAuthenticated ? {width: '100%', height: '90%', backgroundColor: 'black' } : {width: '100%', height: '100%', backgroundColor: 'black' }}>
          <CodeEditor
        style={{
            fontSize: 20,
            inputLineHeight: 26,
            highlighterLineHeight: 26,
            backgroundColor: 'black',
            
        }}
        language={language ? language as Languages : "javascript"}
        initialValue={code}
        syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
      showLineNumbers
        ref={codeEditorRef}
        readOnly
          />
        </ScrollView>
          
        : 
        <CodeEditor
      style={{
          fontSize: 20,
          inputLineHeight: 26,
          highlighterLineHeight: 26,
          backgroundColor: 'black',
          
      }}
      language={language ? language as Languages : "javascript"}
      initialValue="// Write a code"
      syntaxStyle={CodeEditorSyntaxStyles.atomOneDark}
    showLineNumbers
      ref={codeEditorRef}
      readOnly
        />
      }
      
      {code && isAuthenticated ?
      <View style={{height: "10%", padding: 10, justifyContent: 'center'}}>
       <Button
                title="Exécuter"
                onPress={handleRunCode}
                disabled={loading}
              />
      </View>
      : null}
      {result && isAuthenticated?
        <ScrollView style={{ height: '20%'}}>
      <Text style={{ fontWeight: "bold"}}>Console</Text>
      <Text>{result}</Text>
        </ScrollView>
        : null}
      
      </View>
);
};

export default Editor;
