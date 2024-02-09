import { gql } from "@apollo/client"

export const RAN_CODE = gql`
mutation RunCode($content: String!, $runCodeId: Float!) {
  runCode(content: $content, id: $runCodeId)
}
`
