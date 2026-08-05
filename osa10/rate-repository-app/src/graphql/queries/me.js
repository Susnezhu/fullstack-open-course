import { gql } from '@apollo/client';

export const GET_CURRENT_USER = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username,
      reviewCount,
      reviews @include(if: $includeReviews) {
        edges {
          node {
            createdAt,
            rating,
            text,
            id
            repository {
              fullName,
              id
            }
          }
        }
    }
    }
  }
`;