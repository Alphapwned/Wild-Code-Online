import { gql } from "@apollo/client";

export const GET_FILES_QUERY = gql`
	query GetFiles($filter: GetFilesQuery!) {
		getFiles(filter: $filter) {
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
`;
