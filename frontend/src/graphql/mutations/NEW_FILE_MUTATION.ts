import { gql } from "@apollo/client"

export const NEW_FILE_MUTATION = gql`
  mutation Mutation(
    $inputFile: FileInput!
    $languageId: Float!
  ) {
    addFile(inputFile: $inputFile, languageId: $languageId) {
      filename
      id
      isPublic
    }
  }
`
