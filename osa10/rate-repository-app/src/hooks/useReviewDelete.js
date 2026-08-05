import { useMutation, useApolloClient } from '@apollo/client/react';
import { DELETE_REVIEW } from '../graphql/mutations/deleteReview'

const useDeleteReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(DELETE_REVIEW);

  const deleteReview = async ( id ) => {
    const response = await mutate({
      variables: {
        deleteReviewId: id
      },
    });
  
    await apolloClient.resetStore();

    return response.data.deleteReview;
  };

  return [deleteReview, result];
};

export default useDeleteReview;