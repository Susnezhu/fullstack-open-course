import CreateReviewForm from './CreateReviewForm';
import useCreateReview from '../../hooks/useCreateReview'

const CreateReview = () => {
  const [createReview] = useCreateReview();;

  const handleFormSubmit = async (values) => {
    try {
      await createReview(values);

    } catch (e) {
      console.log(e);
    }
  };

  return <CreateReviewForm onSubmit={handleFormSubmit} />;
   
};

export default CreateReview;