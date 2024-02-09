import { gql } from "@apollo/client";

export const GET_PROFILE_QUERY = gql`
	query GetProfile($filter: GetProfileQuery!) {
		getProfile(filter: $filter) {
			firstname
			lastname
			username
			email
			password
			files {
				id
				filename
				isPublic
				createdAt
				language {
					name
				}
				interactions {
					type
					user {
						username
					}
				}
			}
		}
	}
`;
