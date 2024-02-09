import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
  mutation Mutation($update: updateUserInput!) {
    updateUser(update: $update) {
      firstname
      lastname
      username
      email
    }
  }
`;
