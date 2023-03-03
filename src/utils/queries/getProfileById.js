import { gql } from "@apollo/client";

export const GET_PROFILE_BY_ID = gql`
  query GetProfileById($getProfileByIdId: String!) {
    getProfileById(id: $getProfileByIdId) {
      id
      first_name
      last_name
      email
      is_verified
      image_url
      description
    }
  }
`;