import { StyleSheet } from 'react-native';

import Keyboard from '../components/Keyboard';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View style={styles.container}>
      <View style={styles.gameContainer}>
        <Text>test</Text>
      </View>
      <View style={styles.keyboardContainer}>
        <Keyboard />
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
  gameContainer:{
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
