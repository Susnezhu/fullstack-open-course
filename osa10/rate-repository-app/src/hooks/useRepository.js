import { useQuery } from '@apollo/client/react';
import { GET_REPOSITORY } from '../graphql/queries/repository';

const useRepository = (repositoryId) => {
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    variables: { repositoryId },
    fetchPolicy: 'cache-and-network',
  });
  
  console.log({ loading, error, data });

  return {
    repository: data?.repository,
    loading,
    error,
  };
};

export default useRepository;