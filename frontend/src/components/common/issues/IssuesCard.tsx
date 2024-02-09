import { useState } from "react";
import "styles/components/cardComment.scss";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm, SubmitHandler } from "react-hook-form";
import { UPDATE_ISSUE_MUTATION } from "graphql/mutations/UPDATE_ISSUE_MUTATION";
import { useMutation } from "@apollo/client";
import { INewIssueProps } from "utils/interface/INewIssue";
import FormUpdateIssue from "./form/FormUpdateIssue";

interface Fileinterface {
	id: number;
	filename: string;
	content: string;
	createdAt: string;
	image: string;
	isPublic: boolean;
}

interface userinterface {
	username: string;
	files: Fileinterface[];
}
export interface IIssueData {
	index: number;
	id: number;
	issue: string;
	updatedAt: string;
	username: string;
	status: string;
	refecthIssues: () => void;
	currentUser: userinterface;
	fileUser: string;
}

export const handleDate = (day: any): any => {
	day = new Date(day);
	return day.toLocaleDateString("fr-FR", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
};

const IssuesCard = (issueInfo: IIssueData) => {
	const [id, setId] = useState<number>();
	const [isShow, setIsShow] = useState<boolean>(false);
	const [updateIssue] = useMutation(UPDATE_ISSUE_MUTATION);

	const handleToggleForm = (id?: number, comment?: string) => {
		setId(id);
		setIsShow(true);
	};
	const { register, handleSubmit } = useForm<INewIssueProps>({
		mode: "onBlur",
	});
	const onSubmit: SubmitHandler<INewIssueProps> = async (data) => {
		try {
			await updateIssue({
				variables: {
					update: {
						issue: data.issue,
						status: data.status,
					},
					updateIssuesId: id,
				},
			});
			setIsShow(false);
			issueInfo.refecthIssues();
		} catch (error: any) {
			console.log(error);
		}
	};
	return (
		<div className="card-comment">
			<div className="comment-info">
				{!isShow ? (
					<>
						<div className="comment-header">
							<div>
								<p>
									{issueInfo.username.charAt(0).toUpperCase()}
									{issueInfo.username.substring(1).toLowerCase()}
								</p>
								<p>{handleDate(issueInfo.updatedAt)}</p>
							</div>
							<p className={issueInfo.status}>{issueInfo.status}</p>
						</div>
						<div className="edit-container">
							<p>{issueInfo.issue}</p>
							{issueInfo.currentUser.username === issueInfo.username ||
							issueInfo.fileUser === issueInfo.currentUser.username ? (
								<div className="edit-button-container">
									<button
										className="edit-button"
										onClick={() =>
											handleToggleForm(issueInfo.id, issueInfo.issue)
										}
									>
										<FontAwesomeIcon icon={faPenToSquare} size="lg" />
									</button>
								</div>
							) : null}
						</div>
					</>
				) : (
					<FormUpdateIssue
						onSubmit={handleSubmit(onSubmit)}
						register={register}
						issueInfo={issueInfo}
					/>
				)}
			</div>
		</div>
	);
};

export default IssuesCard;
