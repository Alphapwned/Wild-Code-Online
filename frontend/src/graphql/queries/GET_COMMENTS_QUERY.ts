import { gql } from "@apollo/client";

export const GET_COMMENTS_QUERY = gql`
	query GetComments($filter: GetCommentsQuery!) {
		getComments(filter: $filter) {
			comment
			updatedAt
			createdAt
			id
			user {
				username
				id
			}
		}
	}
`;
