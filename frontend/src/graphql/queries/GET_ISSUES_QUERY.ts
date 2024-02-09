import { gql } from "@apollo/client";

export const GET_ISSUES_QUERY = gql`
	query GetIssues($filter: GetIssuesQuery!) {
		getIssues(filter: $filter) {
			id
			issue
			status
			updatedAt
			user {
				username
			}
		}
	}
`;
