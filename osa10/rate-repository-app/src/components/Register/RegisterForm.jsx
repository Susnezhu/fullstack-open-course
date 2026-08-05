import { useFormik } from 'formik';
import { View } from 'react-native'
import * as yup from 'yup';

import {Button, Input, Text} from '../MyThemeElements';

const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, 'Must be longer than 5 symbol')
    .max(30, 'Can be no longer than 30 symbols')
    .required('Name is required'),
  password: yup
    .string()
    .min(5, 'Must be longer than 5 symbol')
    .max(30, 'Can be no longer than 30 symbols')
    .required('Password is required'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required')
});

const RegisterForm = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema,
    onSubmit: ({ passwordConfirm, ...values }) => {
      onSubmit(values);
    },
  });

  return (
    <View>
      <Text type='header' style={{alignSelf: 'center', marginTop: 20, marginBottom: 25}}>Let´s get started!</Text>

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

      {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.passwordConfirm}</Text>
      )}
      <Input
        testID="passwordConfirmInput"
        id="passwordConfirm"
        name="password confirmation"
        type="text"
        onChangeText={formik.handleChange('passwordConfirm')}
        value={formik.values.passwordConfirm}
        secret={true}
        onBlur={formik.handleBlur('passwordConfirm')}
      />


       <Button onClick={() => formik.handleSubmit()} width='wide' testID="submitButton" style={{alignSelf: 'center'}}>Submit</Button>
     </View>
   );
};


export default RegisterForm
