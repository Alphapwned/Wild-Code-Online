import { gql } from "@apollo/client";

export const CONTACT_MUTATION = gql`
  mutation IContact($input: ContactInput!) {
    IContact(input: $input) {
      name
    }
  }
`;
