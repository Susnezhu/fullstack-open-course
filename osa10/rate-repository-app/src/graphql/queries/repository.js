import { gql } from '@apollo/client';

export const GET_REPOSITORY = gql`
  query ($repositoryId: ID!) {
    repository(id: $repositoryId) {
      id,
      fullName,
      description,
      language,
      forksCount,
      stargazersCount,
      ratingAverage,
      reviewCount,
      ownerAvatarUrl,
      url,
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;