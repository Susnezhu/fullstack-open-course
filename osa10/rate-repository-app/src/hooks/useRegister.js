import { useMutation } from '@apollo/client/react';
import { REGISTER } from '../graphql/mutations/register'
import useSignIn from './useSignIn';


const useRegister = () => {
  const [mutate, result] = useMutation(REGISTER);
  const [signIn] = useSignIn();
  
  const register = async ({ password, username }) => {
    const response = await mutate({
      variables: {
        user: {
          password,
          username,
        },
      },
    });

    try {
      await signIn({password, username});

      // console.log(authenticate.accessToken);
      // console.log(authenticate.user.username);
    } catch (e) {
      console.log(e);
    }
  

    return response.data.createUser;
  };

  return [register, result];
};

export default useRegister;