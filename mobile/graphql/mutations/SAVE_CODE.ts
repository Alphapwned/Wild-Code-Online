import { gql } from "@apollo/client"

export const SAVE_CODE = gql`
mutation UpdateFile($update: UpdateFileInput!, $updateFileId: Float!) {
  updateFile(update: $update, id: $updateFileId) {
    content,
  }
}
`
