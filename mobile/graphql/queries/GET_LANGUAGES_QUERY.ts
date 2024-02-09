import { gql } from "@apollo/client"

export const GET_LANGUAGES_QUERY = gql`
  query GetLanguages {
    getLanguages {
      name
      id
    }
  }
`
