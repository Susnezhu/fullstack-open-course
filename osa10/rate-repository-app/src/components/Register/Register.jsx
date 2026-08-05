import RegisterForm from './RegisterForm';
import useRegister from '../../hooks/useRegister'

const Register = () => {
  const [register] = useRegister();

  const handleFormSubmit = async (values) => {
    try {
      await register(values);

    } catch (e) {
      console.log(e);
    }
  };

  return <RegisterForm onSubmit={handleFormSubmit} />;
   
};

export default Register;