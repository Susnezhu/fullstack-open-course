import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Feather from '@expo/vector-icons/Feather';

import { Button, Link, Text} from '../MyThemeElements';

import { useApolloClient } from '@apollo/client/react';
import AuthStorage from '../../utils/authStorage';

import useCurrentUser from '../../hooks/useCurrentUser'

import {theme} from'../../theme';
import { useState } from 'react';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.bar,
  },
  content: {
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20
  },
  userMenu: {
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    padding: 20
  },
  userMenuItem: {
    marginTop: 10,
    marginBottom: 10,
  },
  alignCenter: {
    alignSelf: 'center'
  }
  
})


const UserMenu = ({menuIsOpen, user}) => {
  
  const apolloClient = useApolloClient();
  const authStorage = new AuthStorage();

  const signOut = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();

  };

  return (
    <View>
      {menuIsOpen && (
        <View style={styles.userMenu}>
          {user ? (
            <View style={{ alignItems: 'center' }}>
              <Text style={styles.userMenuItem}><Feather name="user" size={20} color={theme.colors.bar} /> {user.username}</Text>
              <Link style={styles.userMenuItem} to='/myReviews' type='withBackground'>My reviews ({user.reviewCount})</Link>
              <Button onPress={signOut} style={styles.userMenuItem}>Sign Out</Button>
            </View>
          ) : (
            <View>
              <Link to="/signIn" darkColor={true} type='withBackground' style={styles.alignCenter}>
                Sign In
              </Link>

              <Link to="/register" darkColor={true} type='withBackground' style={styles.alignCenter}>
                Register
              </Link>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const AppBar = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const { currentUser } = useCurrentUser()

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <ScrollView horizontal>
          <Link fontWeight='bold' to='/' >Repositories</Link>
          {currentUser && <Link to='/createReview' >New review</Link>}
        </ScrollView>
        <Button onClick={toggleUserMenu}><Feather name="user" size={28} color="white" testID='userMenuButton'/></Button>
      </View>

      <UserMenu menuIsOpen={isUserMenuOpen} user={currentUser} />
    </View>
  )
};

export default AppBar;