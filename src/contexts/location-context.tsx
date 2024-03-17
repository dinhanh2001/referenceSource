import { PropsWithChildren, createContext, memo, useCallback, useContext, useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { Linking } from 'react-native';

import { LatLng } from '../graphql/type.interface';
import { useAppState } from '../hooks';

import { useOverlay } from './overlay-content';

type Context = {
  latlng?: LatLng;
  requestLocationPermission(required?: boolean): void;
};

const LocationContext = createContext<Context>({
  requestLocationPermission() {
    throw new Error('not ready');
  },
});

export const LocationContextProvider = memo(({ children }: PropsWithChildren) => {
  const [latlng, setLatlng] = useState<LatLng>();

  const appState = useAppState();

  const getLocation = useCallback(async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status === Location.PermissionStatus.GRANTED) {
      const location = await Location.getCurrentPositionAsync({});
      setLatlng({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    }
  }, []);

  useEffect(() => {
    if (appState === 'active') {
      getLocation();
    }
  }, [appState, getLocation]);

  const { showDialog } = useOverlay();

  const requestLocationPermission = useCallback(
    async (required?: boolean) => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (required) {
          await showDialog({
            type: 'ALERT',
            title: 'Chú ý!',
            message: 'Bạn phải cho phép vị trí hiện tại để dùng tính năng này!',
          });

          await Linking.openSettings();
        }

        return;
      }

      getLocation();
    },
    [getLocation, showDialog],
  );

  return <LocationContext.Provider value={{ latlng, requestLocationPermission }}>{children}</LocationContext.Provider>;
});

export const useLocation = () => useContext(LocationContext);
