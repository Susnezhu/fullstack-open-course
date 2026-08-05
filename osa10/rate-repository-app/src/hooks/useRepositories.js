import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORIES } from '../graphql/queries/repositories';

// orderBy values: 'CREATED_AT' or 'RATING_AVERAGE'
// orderDirections values: 'DESC' or 'ASC'
const useRepositories = (orderBy='CREATED_AT', orderDirection='DESC', searchKeyword='') => {

  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword,
    },
    fetchPolicy: 'cache-and-network',
  });
  
  // console.log({ loading, error, data });

  return {
    repositories: data?.repositories,
    loading,
    error,
  };
};

export default useRepositories;