import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';

import theme from './theme';
import Main from './Main'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  }
});
