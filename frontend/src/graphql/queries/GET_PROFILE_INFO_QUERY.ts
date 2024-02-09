import { gql } from "@apollo/client";

export const GET_PROFILE_INFO_QUERY = gql`
  query GetProfile($filter: GetProfileQuery!) {
    getProfile(filter: $filter) {
      firstname
      lastname
      username
      email
      password
    }
  }
`;
