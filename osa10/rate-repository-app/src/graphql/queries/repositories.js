import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query GetRepositories(
    $orderBy: AllRepositoriesOrderBy, 
    $orderDirection: OrderDirection,
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy, 
      orderDirection: $orderDirection,
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          fullName
          description
          language
          forksCount
          stargazersCount
          ratingAverage
          reviewCount
          ownerAvatarUrl
        }
      }
    }
  }
`;