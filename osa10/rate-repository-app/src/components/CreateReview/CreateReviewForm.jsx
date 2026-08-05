import * as yup from 'yup';
import { useFormik } from 'formik';

import { View } from 'react-native';
import { Input, Button, Text } from "../MyThemeElements";

const validationSchema = yup.object().shape({
  ownerName: yup
    .string()
    .required('repository owner name is required'),
  repositoryName: yup
    .string()
    .required('repository name is required'),
  rating: yup
    .number()
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : Number(originalValue)
    )
    .required('rating is required')
    .min(0)
    .max(100),
  text: yup
    .string()
});

const CreateReviewForm = ({onSubmit}) => {
  const formik = useFormik({
    initialValues: {
      ownerName: '',
      rating: '',
      repositoryName: '',
      text: '',
    },
    validationSchema,
    onSubmit: (values) => {
      onSubmit(values);
      // console.log('new review', values)
    },
  });

  return (
    <View>
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.ownerName}</Text>
      )}
      <Input
        id="ownerName"
        name="Repository owner name"
        type="text"
        onChangeText={formik.handleChange('ownerName')}
        value={formik.values.ownerName}
        onBlur={formik.handleBlur('ownerName')}
      />

      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.repositoryName}</Text>
      )}
      <Input
        id="repositoryName"
        name="Repository name"
        type="text"
        onChangeText={formik.handleChange('repositoryName')}
        value={formik.values.repositoryName}
        onBlur={formik.handleBlur('repositoryName')}
      />

      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.rating}</Text>
      )}
      <Input
        id="rating"
        name="Rating between 0 and 100"
        type="text"
        onChangeText={formik.handleChange('rating')}
        value={formik.values.rating}
        onBlur={formik.handleBlur('rating')}
        keyboardType='numeric'
      />

      {formik.touched.text && formik.errors.text && (
        <Text style={{ color: '#d73a4a' }}>{formik.errors.text}</Text>
      )}
      <Input
        id="text"
        name="Review"
        type="text"
        onChangeText={formik.handleChange('text')}
        value={formik.values.text}
        onBlur={formik.handleBlur('text')}
      />

      <Button onClick={() => formik.handleSubmit()} width='wide' testID="submitButton" style={{alignSelf: 'center'}}>Create a review</Button>
    </View>
  )
}

export default CreateReviewForm