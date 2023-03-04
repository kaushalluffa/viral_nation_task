import { gql } from "@apollo/client";

export const SEARCH_PROFILE = gql`
  query SearchProfile(
    $orderBy: globalOrderBy
    $searchString: String!
    $rows: Int
    $page: Int
  ) {
    getAllProfiles(
      orderBy: $orderBy
      searchString: $searchString
      rows: $rows
      page: $page
    ) {
      size
      profiles {
        id
        first_name
        last_name
        email
        is_verified
        image_url
        description
      }
    }
  }
`;