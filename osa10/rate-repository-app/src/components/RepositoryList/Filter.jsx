import { View, StyleSheet } from 'react-native'

import { useState } from 'react';

import { Button, Modal, Portal, Searchbar } from 'react-native-paper';

import { Text } from '../MyThemeElements'

const Filter = ({selected, setSelectedOrder, searchQuery, setSearchQuery}) => {
  const [visible, setVisible] = useState(false);

  const turnValueToText = (value) => {
    switch (value) {
      case 'latest':
        return 'Latest repositories'
      case 'highest':
        return 'Highest rated repositories'
      case 'lowest':
        return 'Lowest rated repositories'
      default:
        break;
    }
  }

  return (
    <View>

      <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searcBar}
      />

      <Button onPress={() => setVisible(true)} ><Text style={styles.OpenMenuButton}>{turnValueToText(selected)} ▼</Text></Button>

      <View style={styles.filterContainer}>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={() => setVisible(false)}
            contentContainerStyle={styles.filterMenu}
          >
            <Button onPress={() => {setSelectedOrder('latest')}} style={styles.filterMenuButtons}><Text>Latest repositories</Text></Button>
            <Button onPress={() => {setSelectedOrder('highest')}} style={styles.filterMenuButtons}><Text>Highest rated repositories</Text></Button>
            <Button onPress={() => {setSelectedOrder('lowest')}} style={styles.filterMenuButtons}><Text>Lowest rated repositories</Text></Button>
          </Modal>
        </Portal>
      </View>

    </View>
  )
}



const styles = StyleSheet.create({
  OpenMenuButton: {
    fontSize: 20
  },
  filterContainer: {
    backgroundColor: 'white'
  },
  filterMenu: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: '90%',
    alignSelf: 'center'
  },
  filterMenuButtons: {
    margin: 10
  },
  searcBar: {
    backgroundColor: 'white',
    margin: 10
  }
  
})


export default Filter