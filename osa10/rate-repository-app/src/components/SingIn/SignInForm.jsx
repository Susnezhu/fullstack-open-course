import { useFormik } from 'formik';
import { View } from 'react-native'
import * as yup from 'yup';

import {Button, Input, Text} from '../MyThemeElements';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Must be longer than 5 symbol')
    .required('Name is required'),
  password: yup
    .string()
    .required('Password is required'),
});

const SignInForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <View>
      <Text type='header' style={{alignSelf: 'center', marginTop: 20, marginBottom: 25}}>Welcome back!</Text>

      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.username}</Text>
      )}
      <Input
        testID="usernameInput"
        id="username"
        name="username"
        type="text"
        onChangeText={formik.handleChange('username')}
        value={formik.values.username}
        onBlur={formik.handleBlur('username')}
       />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Input
        testID="passwordInput"
        id="password"
        name="password"
        type="text"
        onChangeText={formik.handleChange('password')}
        value={formik.values.password}
        secret={true}
        onBlur={formik.handleBlur('password')}
       />

       <Button onClick={() => formik.handleSubmit()} width='wide' testID="submitButton" style={{alignSelf: 'center'}}>Submit</Button>
     </View>
   );
};


export default SignInForm