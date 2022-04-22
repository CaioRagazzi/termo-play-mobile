import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import Keyboard, { OnPressKeyboardEvent } from '../components/Keyboard';
import TableLetterGame from '../components/TableLetterGame';
import { View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  const [selectedLetter, setSelectedLetter] = useState<OnPressKeyboardEvent>({ letter: '', date: new Date, isDeleteLetter: false, isEnterLetter: false });
  const [activeLine, setActiveLine] = useState<number>(1)

  useEffect(() => {
    if (activeLine > 5) {
      setActiveLine(1);
    }
  }, [activeLine])
  

  function onLetterPressed(onPressKeyboardEvent: OnPressKeyboardEvent) {
    if (onPressKeyboardEvent.isEnterLetter) {
      setActiveLine(activeLine + 1)
    }
    setSelectedLetter(onPressKeyboardEvent)
  }

  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <TableLetterGame activeLine={activeLine} inputLetter={selectedLetter} />
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
