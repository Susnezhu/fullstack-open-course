import { useQuery } from '@apollo/client/react';
import { GET_CURRENT_USER } from '../graphql/queries/me';

// orderBy values: 'CREATED_AT' or 'RATING_AVERAGE'
// orderDirections values: 'DESC' or 'ASC'
const useCurrentUser = (includeReviews=false) => {

  const { data, error, loading } = useQuery(GET_CURRENT_USER, {
    variables: {
      includeReviews
    },
    fetchPolicy: 'cache-and-network',
  });
  
  // console.log({ loading, error, data });

  return {
    currentUser: data?.me,
    loading,
    error,
  };
};

export default useCurrentUser;