import { gql } from "@apollo/client";

export const SOFT_REMOVE_FILE_MUTATION = gql`
	mutation Mutation($fileId: Float!) {
		deleteFile(fileId: $fileId)
	}
`;
