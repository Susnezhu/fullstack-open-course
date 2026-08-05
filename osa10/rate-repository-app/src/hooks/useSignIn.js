import { useMutation, useApolloClient } from '@apollo/client/react';
import { AUTHENTICATE } from '../graphql/mutations/authenticate'
import { useNavigate } from "react-router";

import AuthStorage from '../utils/authStorage'

const authStorage = new AuthStorage();

const useSignIn = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(AUTHENTICATE);
  const navigate = useNavigate();
  
  const signIn = async ({ username, password }) => {
    const response = await mutate({
      variables: {
        credentials: {
          username,
          password,
        },
      },
    });

    await authStorage.setAccessToken(response.data.authenticate.accessToken);
  
    apolloClient.resetStore();

    navigate('/')

    return response.data.authenticate;
  };

  return [signIn, result];
};

export default useSignIn;