import { useCallback, useEffect, useState } from 'react';
import { Alert, Platform, PermissionsAndroid } from 'react-native';
import * as Location from 'expo-location';

import { useOverlay } from '../contexts/overlay-content';
import { isAndroid, isIOS } from '../utils';
import { openSetting } from '../helpers';

export const useCurrentLocation = () => {
  const { showDialog } = useOverlay();
  const [userLocation, setUserLocation] = useState<Pick<Location.LocationRegion, 'latitude' | 'longitude'> | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const hasPermissionIOS = useCallback(async () => {
    const { status, canAskAgain } = await Location.requestForegroundPermissionsAsync();

    if (status === Location.PermissionStatus.GRANTED) {
      return true;
    }

    if (status === Location.PermissionStatus.DENIED) {
      await showDialog({
        type: 'ALERT',
        title: 'Truy cập vị trí thất bại',
        message: 'Quền truy cập vị trí bị từ chối',
      });
    }

    if (!canAskAgain) {
      Alert.alert(`Cần cho phép truy cập vị trí của bạn`, '', [
        { text: 'Settings', onPress: openSetting },
        { text: 'Cancel' },
      ]);
    }

    return false;
  }, [showDialog]);

  const hasLocationPermission = useCallback(async () => {
    if (isIOS) {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (isAndroid && +Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }
    if (status === PermissionsAndroid.RESULTS.DENIED) {
      await showDialog({
        type: 'ALERT',
        title: 'Thất bại',
        message: 'Quền truy cập vị trí bị từ chối',
      });
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      await showDialog({
        type: 'ALERT',
        title: 'Thất bại',
        message: 'Quền truy cập vị trí bị từ chối',
      });
    }

    return false;
  }, [hasPermissionIOS, showDialog]);

  const getLocation = useCallback(async () => {
    setLoading(true);
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    const location = await Location.getCurrentPositionAsync({
      accuracy: isAndroid ? Location.Accuracy.Low : Location.Accuracy.Lowest,
      timeInterval: 10000,
    });

    setUserLocation(location.coords);
    setLoading(false);
  }, [hasLocationPermission, setLoading]);

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  return { userLocation, loading };
};
