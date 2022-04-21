import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

import Keyboard from '../components/Keyboard';
import TableLetterGame from '../components/TableLetterGame';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedLetter, setSelectedLetter] = useState('');

  function onLetterPressed(params: string) {
    setSelectedLetter(params)
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <TableLetterGame inputLetter={selectedLetter} />
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard onPress={onLetterPressed} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameContainer: {
    height: '70%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardContainer: {
    height: '30%',
    width: '100%'
  },
});
