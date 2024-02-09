import React, { useRef, useState, useEffect, useContext } from "react";
import Editor, { OnChange } from "@monaco-editor/react";
import { RAN_CODE } from "graphql/mutations/RAN_CODE";
import { GET_COMMENTS_QUERY } from "graphql/queries/GET_COMMENTS_QUERY";
import { GET_ISSUES_QUERY } from "graphql/queries/GET_ISSUES_QUERY";
import { useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import { SAVE_CODE } from "graphql/mutations/SAVE_CODE";
import Layout from "components/common/layouts/Layout";
import AuthenticatedPage from "utils/hoc/authenticatedPage";
import Comments from "components/common/comments/CommentsList";
import { useGetProfile } from "utils/hook/getProfile";
import AddNewInteraction from "../components/common/form/FormAddInteraction";
import "styles/Coding.scss";
import { fileContext } from "utils/context/FileContext";

export interface interactionsInterface {
		type: string;
            user: {
                username: string;
            };
	}

const CodingPage = () => {

	
	const [code, setCode] = useState<string>("");
	const [result, setResult] = useState<string>("");
	const [language, setLanguage] = useState<string>("");
	const [runCode, { loading }] = useMutation(RAN_CODE);
	const [saveCode] = useMutation(SAVE_CODE);
	const [comments, setComments] = useState([]);
	const [issues, setIssues] = useState([]);
	const [interactions, setInteractions] = useState<interactionsInterface[]>([]);
	const [fileUser, setfileUser] = useState<string>("");
	const { id } = useParams()
	const { downloadFile, fileRefetch, fileData, setFileId } = useContext(fileContext);
	let fileId: number | null = null
	if (id) {
		fileId = parseInt(id)
		setFileId(parseInt(id));
	}

	const { data: commentsData, refetch: refetchComments } = useQuery(
		GET_COMMENTS_QUERY,
		{ variables: { filter: { file: fileId } } }
	);
	const { data: issuesData, refetch: refetchIssues } = useQuery(
		GET_ISSUES_QUERY,
		{ variables: { filter: { file: fileId } } }
	);

	const profile = useGetProfile();

	const editorRef = useRef<any>(null);
	const resultRef = useRef<HTMLDivElement>(null);
	const [showIframe, setShowIframe] = useState(true);
	const [showConsole, setShowConsole] = useState(true);

	let containerClassName = "";
	if (showIframe && showConsole) {
		containerClassName = "editorIframeConsole";
	} else if (showIframe) {
		containerClassName = "editorIframe";
	} else if (showConsole) {
		containerClassName = "editorConsole";
	} else {
		containerClassName = "onlyEditor";
	}

	useEffect(() => {
		function handleWindowResize() {
			if (editorRef.current) {
				editorRef.current.layout();
			}
		}
		window.addEventListener("resize", handleWindowResize);

		if (fileData && fileData.getFile) {
			setCode(fileData.getFile.content);
			setLanguage(fileData.getFile.language.name);
			setInteractions(fileData.getFile.interactions);
			setfileUser(fileData.getFile.user.username);
			console.log(fileData.getFile)
			
		}

		if (commentsData && commentsData.getComments) {
			setComments(commentsData.getComments);
		}

		if (issuesData && issuesData.getIssues) {
			setIssues(issuesData.getIssues);
		}

		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, [fileData, commentsData, issuesData]);

	async function refetchCommentsData() {
		await refetchComments();
		setComments(commentsData.getComments);
	}

	async function refecthIssuesData() {
		await refetchIssues();
		setIssues(issuesData.getIssues);
	}

	async function refecthInteractionsData() {
		await fileRefetch();
		setInteractions(fileData.getFile.interactions);
	}

	function handleEditorDidMount(editor: any, monaco: any) {
		editorRef.current = editor;
	}

	function handleCodeChange(value: string | undefined) {
		setCode(value || "");
	}

	async function handleRunCode() {
		if (fileId) {
			const runCodeId = fileId;
			try {
				const response = await runCode({
					variables: {
						content: code,
						runCodeId,
					},
				});
				const filteredResult = JSON.parse(
					response.data.runCode
				).run.output.replace(/\/piston\/[^ ]* /g, "");
				setResult(filteredResult);
				setShowConsole(true);
			} catch (error: any) {
				const filteredError = error.toString().replace(/\/piston\/[^ ]* /g, "");
				setResult(filteredError);
				setShowConsole(true);
			}
		}
	}
	async function handleSaveCode() {
		if (fileId) {
			const saveCodeId = fileId;
			const update = {
				content: code,
			};
			try {
				await saveCode({
					variables: {
						update: update,
						updateFileId: saveCodeId,
					},
				});
			} catch (error: any) {
				console.log(error, error);
			}
		}
	}

	const toggleIframe = () => {
		setShowIframe(!showIframe);
	};

	const toggleConsole = () => {
		setShowConsole(!showConsole);
	};

	return (
		<Layout>
			<div className="mainCodingPage">
				<div className="buttons">
					<div className="leftButton">
						<button onClick={toggleIframe}>Preview</button>
						<button onClick={toggleConsole}>Console</button>
						<AddNewInteraction
							id={fileId}
							interactions={interactions}
							refetch={refecthInteractionsData}
							username={profile?.username}
						/>
					</div>
					<div className="rightButton">
						<button onClick={() =>downloadFile(code)} disabled={loading ? true : false}>
							{loading ? "Téléchargement..." : "Télécharger"}
						</button>
						<button onClick={handleSaveCode} disabled={loading ? true : false}>
							{loading ? "Sauvegarde..." : "Sauvegarder"}
						</button>
						<button
							className="execButton"
							onClick={handleRunCode}
							disabled={loading ? true : false}
						>
							{loading ? "Running..." : "Executer"}
						</button>
					</div>
				</div>
				<div className={`general ${containerClassName}`}>
					<div className="editorAndPreview">
						<div className="editor">
							<Editor
								height="100%"
								width="100%"
								defaultLanguage={language ? language : "javascript"}
								defaultValue={code ? code : "// Write a code"}
								onMount={handleEditorDidMount}
								onChange={handleCodeChange as OnChange}
								options={{
									scrollBeyondLastLine: false,
								}}
								theme="vs-dark"
							/>
							<Comments
								fileUser={fileUser}
								comments={comments}
								issues={issues}
								refetchComments={refetchCommentsData}
								refetchIssues={refecthIssuesData}
								user={profile}
							/>
						</div>
						{showIframe && (
							<div className="iframe">
								<div className="previewTitle">
									<p>
										<b>Preview</b>
									</p>
								</div>
								<iframe
									srcDoc={
										code
											? `<html><body><script>${code}</script></body></html>`
											: "<html><body></body></html>"
									}
									title="output"
									frameBorder="0"
									style={{ width: "100%" }}
								/>
							</div>
						)}
					</div>
					{showConsole && (
						<div className="console">
							<div className="consoleTitle">
								<p>
									<b>Console</b>
								</p>
							</div>
							<div
								ref={resultRef}
								className="showConsole"
								hidden={!showConsole}
							>
								{result}
							</div>
						</div>
					)}
				</div>
			</div>
		</Layout>
	);
};

export default AuthenticatedPage(CodingPage);
