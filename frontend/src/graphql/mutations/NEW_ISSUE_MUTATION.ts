import { gql } from "@apollo/client";

export const NEW_ISSUE_MUTATION = gql`
	mutation Mutation($input: IssuesInput!) {
		addIssue(input: $input) {
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
