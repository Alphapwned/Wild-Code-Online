import { gql } from "@apollo/client"

export const NEW_INTERACTION_MUTATION = gql`
	mutation Mutation($input: InteractionsInput!) {
		interaction(input: $input) {
			type
		}
	}
`;