import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import { Link } from './MyThemeElements';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bar,
  },
  content: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  appName: {
    margin: 20,
    fontSize: theme.fontSize.big,
    color: '#eeeaea',
  }
})

const AppBar = () => {

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Link fontWeight='bold' style={styles.appName} to='/'>Repositories</Link>
        <ScrollView horizontal>
          <Link to='/singIn'>Sing In</Link>
        </ScrollView>
      </View>
      
    </View>
  )
};

export default AppBar;