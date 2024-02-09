import { gql } from "@apollo/client"

export const NEW_REPORT_MUTATION = gql`
mutation Mutation($input: ReportsInput!) {
  addReports(input: $input) {
    comment
    title
    id
  }
}
`