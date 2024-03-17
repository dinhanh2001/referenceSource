import { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import { useAuth } from './contexts';
import { RootNavigator } from './navigators';

export const AppNavigator = () => {
  const [isAppReady, setIsAppReady] = useState(false);

  const { isLoggedIn, isCheckedMe } = useAuth();

  useEffect(() => {
    if (isCheckedMe) {
      SplashScreen.hideAsync();

      setTimeout(() => {
        setIsAppReady(true);
      }, 1000);
    }
  }, [isCheckedMe]);

  if (!isAppReady) {
    return null;
  }

  return <RootNavigator isLoggedIn={isLoggedIn} />;
};
