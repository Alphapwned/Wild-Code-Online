import { gql } from "@apollo/client";

export const UPDATE_FILE_MUTATION = gql`
	mutation UpdateFile($update: UpdateFileInput!, $updateFileId: Float!) {
		updateFile(update: $update, id: $updateFileId) {
			content
		}
	}
`;
