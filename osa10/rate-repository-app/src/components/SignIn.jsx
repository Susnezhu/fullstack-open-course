import { useFormik } from 'formik';
import { View } from 'react-native'
import * as yup from 'yup';

import {Button, Input, Text} from './MyThemeElements';

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Must be longer than 3 symbol')
    .required('Name is required'),
  password: yup
    .string()
    .required('Password is required'),
});


const SignIn = () => {
  const formik = useFormik({
     initialValues: {
       name: '',
       password: '',
     },
     validationSchema,
     onSubmit: values => {
       console.log(values)
     },
   });
   return (
     <View>
      {formik.touched.name && formik.errors.name && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.name}</Text>
      )}
      <Input
         id="name"
         name="name"
         type="text"
         onChangeText={formik.handleChange('name')}
         value={formik.values.name}
         onBlur={formik.handleBlur('name')}
       />

      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.password}</Text>
      )}
      <Input
         id="password"
         name="password"
         type="text"
         onChangeText={formik.handleChange('password')}
         value={formik.values.password}
         secret={true}
         onBlur={formik.handleBlur('password')}
       />

       <Button onClick={formik.handleSubmit} width='wide'>Submit</Button>
     </View>
   );
};

export default SignIn;