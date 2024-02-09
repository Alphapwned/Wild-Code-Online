import { gql } from "@apollo/client";

export const SIGN_UP_MUTATION = gql`
  mutation Mutation($input: SignUpInput!) {
    signUp(input: $input)
  }
`;
