import React from 'react';
import { Alert } from 'react-native';
import {
  Permission,
  RESULTS,
  check,
  openSettings,
  request,
} from 'react-native-permissions';

export function usePermisstion(permisstion: Permission) {
  const [isHasPermisstion, setIsHasPermisstion] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    checkPermisstion();
  }, []);

  async function checkPermisstion() {
    const result = await check(permisstion);
    if (result !== RESULTS.GRANTED) {
      setIsHasPermisstion(false);
      const result = await request(permisstion);
      if (result === RESULTS.BLOCKED) {
        Alert.alert('Thông báo', 'Vui lòng cấp quyền camera để sử dụng', [
          {
            text: 'Đi tới cài đặt',
            onPress: () => openSettings(),
          },
          {
            text: 'Hủy',
            onPress: () => {},
            style: 'cancel',
          },
        ]);
      }
    }
    if (result === RESULTS.GRANTED) {
      setIsHasPermisstion(true);
    }
  }

  const refTimeout = React.useRef<NodeJS.Timeout>();

  async function checkPermisstionOnly() {
    const result = await check(permisstion);
    console.log(result);
    if (result === RESULTS.GRANTED) {
      setIsHasPermisstion(true);
    }
  }

  function reload() {
    if (refTimeout.current && isHasPermisstion) {
      clearTimeout(refTimeout.current);
    }
    refTimeout.current = setInterval(() => {
      checkPermisstionOnly();
    }, 1000);
  }

  React.useEffect(() => {
    !isHasPermisstion && reload();
    if (isHasPermisstion && refTimeout.current) {
      clearInterval(refTimeout.current);
    }
  }, [isHasPermisstion]);

  function onSetting() {
    openSettings();
  }

  return {
    isHasPermisstion,
    onSetting,
    checkPermisstion,
    checkPermisstionOnly,
  };
}
