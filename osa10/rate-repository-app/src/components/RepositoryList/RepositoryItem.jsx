import { View, Image, StyleSheet } from 'react-native';

import { Text, Button, Link } from '../MyThemeElements';
import { defaultElements} from'../../theme';


const Value = ({value, desc}) => {
  const formatThousands = (value) => {
    if (value < 1000) return String(value);

    return `${(value / 1000).toFixed(1).replace('.0', '')}k`;
  };

  return (
    <View style={{alignItems: 'center', margin: 10}}>
      <Text fontWeight='bold'>{formatThousands(value)}</Text>
      <Text>{desc}</Text>
    </View>
  );
}

const RepositoryItem = ({item, showLink = true}) => {
  return (
    <View style={styles.contentContainer} testID="repositoryItem">

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

      {showLink && (
        <Link to={`/repository/${item.id}`} style={{textAlign: 'center'}} darkColor={true}>read more</Link>
      )}

    </View>
  )
}


const styles = StyleSheet.create({
  contentContainer: defaultElements.contentContainer,
  avatar: defaultElements.avatar.default,

  basicInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});


export default RepositoryItem