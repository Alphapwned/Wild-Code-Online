import { gql } from "@apollo/client"

export const UPDATE_COMMENT_MUTATION = gql`
  mutation Mutation($update: UpdateCommentsInput!, $updateCommentsId: Float!) {
    updateComments(update: $update, id: $updateCommentsId) {
      comment
    }
  }
`
