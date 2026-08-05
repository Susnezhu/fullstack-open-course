import useCurrentUser from '../../hooks/useCurrentUser'
import useDeleteReview from '../../hooks/useReviewDelete'

import { View, FlatList, StyleSheet, Alert } from 'react-native';

import { Text, Link, Button } from '../MyThemeElements'

import { defaultElements } from '../../theme';


const MyReviewItem = ({ review }) => {
  const [ deleteReview ] = useDeleteReview()

  const formatDate = (date) => new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));


  const handleReviewDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          onPress: () => deleteReview(review.id),
        },
      ]
    );
  };



  return (
    <View style={styles.contentContainer}>
      <View style={styles.reviewInfo}>
        <Text style={styles.reviewRating}>{review.rating}</Text>
        <View style={styles.reviewConteiner}>
          <Text style={{fontWeight: 'bold'}}>{review.repository.fullName}</Text>
          <Text>{formatDate(review.createdAt)}</Text>
          <Text>{review.text}</Text>
        </View>
      </View>

      <View style={styles.reviewButtonMenu}>
        <Link type='withBackground' style={{backgroundColor: 'grey'}} to={`/repository/${review.repository.id}`}>View repository</Link>
        <Button onClick={handleReviewDelete}>Delete review</Button>
      </View>
    </View>
  )
}

const MyReviewsForm = ({reviews}) => {

  return (
    <View>
      <FlatList
        data={reviews}
        renderItem={({item}) => <MyReviewItem review={item} />}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 1000 }}
      />
    </View>
  )
}

const MyReviews = () => {

  const { currentUser } = useCurrentUser(true)

  return (
    <MyReviewsForm reviews={currentUser?.reviews?.edges?.map(edge => edge.node)} />
  )
}


const styles = StyleSheet.create({
  contentContainer: defaultElements.contentContainer,
  reviewConteiner: {
    flexShrink: 1,
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
  },
  reviewButtonMenu: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20
  }
});



export default MyReviews