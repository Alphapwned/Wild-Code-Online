import { gql } from "@apollo/client";
export const GET_LIKE_QUERY = gql`
	query Query($fileId: Float!) {
		getLike(fileId: $fileId)
	}
`;
