import { FlatList, View, Image, StyleSheet } from 'react-native';

import { Text, Button } from './MyThemeElements'

import theme from '../theme'

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

const Value = ({value, desc}) => {
  const formatThousands = (value) => {
  if (value < 1000) {
    return value.toString();
  }

  return `${Math.floor(value / 1000)}k`;
};

  return (
    <View style={{alignItems: 'center', margin: 10}}>
      <Text fontWeight='bold'>{formatThousands(value)}</Text>
      <Text>{desc}</Text>
    </View>
  );
}

const Item = ({item}) => {
  return (
    <View style={styles.repository}>
      <View style={{flexDirection: 'row'}}>
        <Image source={{uri: item.ownerAvatarUrl}} style={styles.avatar}/>
        <View style={{ flex: 1, flexShrink: 1}}>
          <Text fontWeight='bold'>{item.fullName}</Text>
          <Text>{item.description}</Text>
          <Button>{item.language}</Button>
        </View>
      </View>

      <View style={styles.basicInfo}>
        <Value value={item.stargazersCount} desc='Stars'/>
        <Value value={item.forksCount} desc='Forks'/>
        <Value value={item.reviewCount} desc='Reviews'/>
        <Value value={item.ratingAverage} desc='Rating'/>
      </View>
      

    </View>
  )
}

const RepositoryList = () => {
  return (
    <View>
      <FlatList
          data={repositories}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 5,
    marginRight: 20
  },
  repository: {
    margin: 10,
    backgroundColor: theme.colors.basicColor, 
    padding: 5,
    borderRadius: 5,
    boxShadow: '2px 5px 10px #a1a1a1'
  },
  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});

export default RepositoryList;