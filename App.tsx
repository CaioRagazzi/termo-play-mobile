import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'mobx-react';
import MainGameStore from "./stores/main-game";
import Toast from 'react-native-toast-message'

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider MainGameStore={MainGameStore}>
          <Navigation colorScheme={colorScheme} />
          <Toast />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
