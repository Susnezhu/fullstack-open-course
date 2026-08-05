import { FlatList, View } from 'react-native';

import { useDebounce } from 'use-debounce';

import useRepositories from '../../hooks/useRepositories';

import RepositoryItem from './RepositoryItem';

import Filter from './Filter';
import { useState } from 'react';


export const RepositoryListContainer = ({ repositories, selectedOrder, setSelectedOrder, searchQuery, setSearchQuery }) => {

  const repositoriesNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];

  // console.log(repositoriesNodes);

  return (
    <View>
      <FlatList
        data={repositoriesNodes}
        renderItem={({item}) => <RepositoryItem item={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 400 }}
        ListHeaderComponent={
          <Filter
            selected={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        }
      />
    </View>
  );
};


const RepositoryList = () => {
  const [selectedOrder, setSelectedOrder] = useState('latest');
  const [searchQuery, setSearchQuery] = useState('');

  const sortOptions = {
    latest: {
      orderBy: 'CREATED_AT',
      orderDirection: 'DESC',
    },
    highest: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'DESC',
    },
    lowest: {
      orderBy: 'RATING_AVERAGE',
      orderDirection: 'ASC',
    },
  };

  const [debouncedSearch] = useDebounce(searchQuery, 500);

  const { repositories } = useRepositories(
    sortOptions[selectedOrder].orderBy,
    sortOptions[selectedOrder].orderDirection,
    debouncedSearch
  );

  return (
    <RepositoryListContainer 
      repositories={repositories}

      selectedOrder={selectedOrder} 
      setSelectedOrder={setSelectedOrder} 
     
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />

  );
};



export default RepositoryList;