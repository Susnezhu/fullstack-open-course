import { gql } from '@apollo/client';

export const CREATE_REVIEW = gql`
  mutation CreateReview($review: CreateReviewInput!) {
    createReview(review: $review) {
      rating
      repositoryId
      text
    }
  }
`;

