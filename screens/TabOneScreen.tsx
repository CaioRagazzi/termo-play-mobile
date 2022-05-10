import React, { useEffect, useLayoutEffect, useState } from 'react';
import { RootTabScreenProps } from '../types';
import Game from '../components/Game';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabOneScreen({ navigation }: { navigation: RootTabScreenProps<'TabOne'> }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={openModal}>
          <Ionicons name="md-information-circle-outline" size={32} color="black" style={{ paddingRight: 10 }} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  // async function checkStatusAsync() {
  //   const status = await BackgroundFetch.getStatusAsync();
  //   const isRegistered = await TaskManager.isTaskRegisteredAsync(backGroundName);
  //   setStatus(status);
  //   setIsRegistered(isRegistered);
  // };

  return (
    <>
      <Game OpenModal={isModalOpen} ModalClosed={() => setIsModalOpen(false)} />
    </>
  );
}