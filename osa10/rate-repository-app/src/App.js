import { ApolloProvider } from '@apollo/client/react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeRouter } from 'react-router-native';
import { PaperProvider } from 'react-native-paper';

import {theme} from'./theme';
import Main from './Main'
import AuthStorage from './utils/authStorage';

import createApolloClient from './utils/apolloClient';
import AuthStorageContext from './contexts/AuthStorageContext';

const authStorage = new AuthStorage();
const apolloClient = createApolloClient(authStorage);



export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <AuthStorageContext.Provider value={authStorage}>
            <PaperProvider>
              <Main />
            </PaperProvider>
          </AuthStorageContext.Provider>
        </ApolloProvider>
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
