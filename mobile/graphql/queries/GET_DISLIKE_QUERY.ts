import { gql } from "@apollo/client";
export const GET_DISLIKE_QUERY = gql`
	query Query($fileId: Float!) {
		getDislike(fileId: $fileId)
	}
`;
