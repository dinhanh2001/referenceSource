import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '@rneui/themed';
import { QueryClientProvider } from 'react-query';
import { ApolloProvider } from '@apollo/client';
import FlashMessage from 'react-native-flash-message';
import * as SplashScreen from 'expo-splash-screen';
import Bugsnag from '@bugsnag/expo';
import React from 'react';
import { useDeviceContext } from 'twrnc';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/vi';

import { useInit } from './init';
import { reactNavigationTheme, rneui } from './theme';
import { AppNavigator } from './app-navigator';
import { client } from './apollo/apollo';
import {
  AuthProvider,
  BottomActionProvider,
  OverlayProvider,
  FullScreenLoadingProvider,
  LocationContextProvider,
} from './contexts';
import { tw, BookingTimeOutGuard } from './components';

dayjs.extend(utc);
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);

import './init/logging';
import './helpers/notification';

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
          <GestureHandlerRootView style={tw`flex-1`}>
            <ThemeProvider theme={rneui}>
              <NavigationContainer theme={reactNavigationTheme}>
                <FullScreenLoadingProvider>
                  <LocationContextProvider>
                    <AuthProvider>
                      <OverlayProvider>
                        <BottomActionProvider>
                          <AppNavigator />
                          <BookingTimeOutGuard />
                          <FlashMessage position="bottom" floating={true} />
                        </BottomActionProvider>
                      </OverlayProvider>
                    </AuthProvider>
                  </LocationContextProvider>
                </FullScreenLoadingProvider>
              </NavigationContainer>
            </ThemeProvider>
          </GestureHandlerRootView>
        </SafeAreaProvider>
      </QueryClientProvider>
    </ApolloProvider>
  );
};
