import { gql } from "@apollo/client";

export const SIGN_IN_QUERY = gql`
  query Query($password: String!, $email: String!) {
    signIn(password: $password, email: $email)
  }
`;
