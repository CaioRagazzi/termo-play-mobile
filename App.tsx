import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Provider } from 'mobx-react';
import MainGameStore from "./stores/main-game";
import ReportStore from "./stores/report";
import Toast from 'react-native-toast-message'
import { Provider as PaperProvider } from 'react-native-paper';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider MainGameStore={MainGameStore} ReportStore={ReportStore}>
          <PaperProvider>
            <Navigation colorScheme={colorScheme} />
          </PaperProvider>
          <Toast />
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
