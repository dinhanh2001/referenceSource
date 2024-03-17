import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

import { useAuth } from './contexts';
import { RootNavigator } from './navigators';
import { tw } from './components';

export const AppNavigator = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const { isLoggedIn, isCheckedMe } = useAuth();

  useEffect(() => {
    if (isCheckedMe) {
      (async () => {
        await SplashScreen.hideAsync();
        setAppIsReady(true);
      })();
    }
  }, [isCheckedMe]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={tw.color('bg-white')} style="dark" />
      <RootNavigator isLoggedIn={isLoggedIn} />
    </>
  );
};
