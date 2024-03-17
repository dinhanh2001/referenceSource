import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import * as SplashScreen from 'expo-splash-screen';
import Bugsnag from '@bugsnag/expo';
import FlashMessage from 'react-native-flash-message';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useDeviceContext } from 'twrnc';

import { useInit } from './init';
import { reactNavigationTheme, rneui } from './theme';
import { AppNavigator } from './app-navigator';
import { client } from './apollo/apollo';
import {
  AuthProvider,
  BottomActionProvider,
  FullScreenLoadingProvider,
  LocationContextProvider,
  OverlayProvider,
  RepairRequestWatcherProvider,
} from './contexts';
import { tw } from './components';

import './init/logging';
import './helpers/notification';
import 'dayjs/locale/vi';
dayjs.extend(utc);
dayjs.extend(customParseFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(relativeTime);

if (process.env.RELEASE_STAGE === 'production') {
  const Mapbox = require('@rnmapbox/maps');

  Mapbox.setAccessToken(process.env.MAPBOX_PUBLIC_KEY);
}

if (process.env.RELEASE_STAGE === 'production') {
  Bugsnag.start();
}

SplashScreen.preventAutoHideAsync();

export const AppContainer = () => {
  useDeviceContext(tw);

  const initResult = useInit();

  if (!initResult) return null;

  return (
    <ApolloProvider client={client}>
      <QueryClientProvider client={initResult.reactQuery}>
        <SafeAreaProvider>
          <GestureHandlerRootView style={styles.container}>
            <ThemeProvider theme={rneui}>
              <NavigationContainer theme={reactNavigationTheme}>
                <OverlayProvider>
                  <FullScreenLoadingProvider>
                    <AuthProvider>
                      <LocationContextProvider>
                        <BottomActionProvider>
                          <RepairRequestWatcherProvider>
                            <AppNavigator />
                          </RepairRequestWatcherProvider>
                        </BottomActionProvider>
                        <FlashMessage position="bottom" floating={true} />
                      </LocationContextProvider>
                    </AuthProvider>
                  </FullScreenLoadingProvider>
                </OverlayProvider>
              </NavigationContainer>
            </ThemeProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
