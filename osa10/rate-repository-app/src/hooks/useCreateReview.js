import { useMutation, useApolloClient } from '@apollo/client/react';
import { CREATE_REVIEW } from '../graphql/mutations/createReview'
import { useNavigate } from "react-router";

const useCreateReview = () => {
  const apolloClient = useApolloClient();
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();
  
  const createReview = async ({ ownerName, rating, repositoryName, text=""  }) => {
    const response = await mutate({
      variables: {
        review: {
          ownerName,
          rating: Number(rating),
          repositoryName,
          text
        },
      },
    });
  
    await apolloClient.resetStore();

    navigate(`/repository/${response.data.createReview.repositoryId}`);

    return response.data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;