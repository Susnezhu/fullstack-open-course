import useSignIn from '../../hooks/useSignIn';

import SignInForm from './SignInForm';


const SignIn = () => {
  const [signIn, result] = useSignIn();

  const handleFormSubmit = async (values) => {
    try {
      const authenticate = await signIn(values);

      // console.log(authenticate.accessToken);
      // console.log(authenticate.user.username);
    } catch (e) {
      console.log(e);
    }
  };

  return <SignInForm onSubmit={handleFormSubmit} />;
   
};

export default SignIn;