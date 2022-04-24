import React from 'react';
import { RootTabScreenProps } from '../types';
import Game from '../components/Game';

export default function TabOneScreen({ navigation }: { navigation: RootTabScreenProps<'TabOne'> }) {
  return (
    <Game />
  );
}