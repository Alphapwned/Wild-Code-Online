import { faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IIssueData, handleDate } from "../IssuesCard";
import { useState } from "react";

type submit = {
	onSubmit: () => void;
	issueInfo: IIssueData;
	register: any;
};

const UpdateIssue = ({ issueInfo, onSubmit, register }: submit) => {
	const [status, setStatus] = useState<string>("");
	return (
		<div className="container-edit-form">
			<form action="" onSubmit={onSubmit}>
				<div className="comment-header">
					<div>
						<p>
							{issueInfo.username.charAt(0).toUpperCase()}
							{issueInfo.username.substring(1).toLowerCase()}
						</p>
						<p>{handleDate(issueInfo.updatedAt)}</p>
					</div>
					<select
						className={status ? status : issueInfo.status}
						{...register("status")}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value={issueInfo.status}>{issueInfo.status}</option>
						{issueInfo.status === "Open" ? (
							<>
								<option value="Pending">Pending</option>
								<option value="Close">Close</option>
							</>
						) : issueInfo.status === "Pending" ? (
							<>
								<option value="Open">Open</option>
								<option value="Close">Close</option>
							</>
						) : (
							<>
								<option value="Pending">Pending</option>
								<option value="Open">Open</option>
							</>
						)}
					</select>
				</div>
				<div className="edit-container">
					<textarea
						placeholder="Ecrivez votre commentaire ..."
						rows={3}
						readOnly={
							issueInfo.fileUser === issueInfo.currentUser.username
								? true
								: false
						}
						defaultValue={issueInfo.issue ? issueInfo.issue : ""}
						{...register("issue")}
					></textarea>
					<div className="action-button-container">
						<button className="action-button">
							<FontAwesomeIcon icon={faSquareCheck} size="xl" />
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdateIssue;
