import { gql } from '@apollo/client';

export const REGISTER = gql`
  mutation CreateUser($user: CreateUserInput!) {
    createUser(user: $user) {
      createdAt
      username
    }
  }
`;

