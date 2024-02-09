import { gql } from "@apollo/client"

export const UPDATE_ISSUE_MUTATION = gql`
  mutation Mutation($update: UpdateIssuesInput!, $updateIssuesId: Float!) {
    updateIssues(update: $update, id: $updateIssuesId) {
      issue
      status
    }
  }
`
