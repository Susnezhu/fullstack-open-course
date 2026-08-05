import useRepository from "../../hooks/useRepository"
import { useParams } from 'react-router-native';

import { View, StyleSheet, FlatList } from 'react-native';
import { Text, BrowserLink } from "../MyThemeElements";
import {theme, defaultElements} from'../../theme';

import RepositoryItem from "./RepositoryItem";


const SingleRepositoryComponents = ({repository}) => {
  return (
    <View>
      <RepositoryItem item={repository} showLink={false}/>
      <View style={styles.contentContainer}>
        <BrowserLink url={repository.url} style={styles.browserLink}>Open in GitHub</BrowserLink>
      </View>
    </View>
  )
}

const ReviewItem = ({review}) => {
  const formatDate = (date) => new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));

  return (
    <View style={styles.contentContainer}>
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewRating}>{review.rating}</Text>
        <View style={styles.reviewConteiner}>
          <Text style={{fontWeight: 'bold'}}>{review.user.username}</Text>
          <Text>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>
    </View>
  )
}

const SingleRepository = () => {
  const { id } = useParams();
  const { repository, loading } = useRepository(id);

  const reviews = repository?.reviews?.edges

  if (loading || !repository) {
    return (
      <Text>Loading repository..</Text>
    )
  }

  console.log(reviews)

  return (
    <View>
      <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewItem review={item.node} />}
          keyExtractor={( item ) => item.node.id}
          ListHeaderComponent={<SingleRepositoryComponents repository={repository} />}
          contentContainerStyle={{ paddingBottom: 1000 }}
      />
    </View>
  )
}



const styles = StyleSheet.create({
  contentContainer: defaultElements.contentContainer,
  reviewConteiner: {
    flexShrink: 1,
  },
  browserLink: {
    backgroundColor: theme.colors.button,
    fontSize: 20,
    textAlign: 'center',
    padding: 20,
    borderRadius: 10,
    fontWeight: 'bold'
  },
  reviewInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  reviewRating: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 100,
    padding: 10,
    fontSize: 20,
  }
});


export default SingleRepository;