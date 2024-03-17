import { memo, useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { Switch, tw } from '../../components';
import { FaceIdSVG, TouchIdSVG } from '../../svg';
import { useBiometricSetting } from '../../hooks';
import { useAuth, useFullScreenLoading, useOverlay } from '../../contexts';
import { BIOMETRIC_CREDENTIAL_FOR, BIOMETRIC_CREDENTIAL_ID } from '../../constants';
import { useRegisterBiometricLoginMutation } from '../../graphql/mutations/registerBiometricLogin.generated';
import { showFlashMessageError } from '../../helpers';
import { useUnregisterBiometricLoginMutation } from '../../graphql/mutations/unregisterBiometricLogin.generated';

export const BiometricLogin = memo(() => {
  const [isEnabled, setIsEnabled] = useState(false);

  const { user } = useAuth();

  const supportBiometricType = useBiometricSetting();

  const initialize = useCallback(async () => {
    const enabledFor = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_FOR);
    if (enabledFor === user?.id) {
      setIsEnabled(true);
    } else {
      await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_FOR);
      await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_ID);
    }
  }, [setIsEnabled, user?.id]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const [registerBiometricLogin, { loading }] = useRegisterBiometricLoginMutation({
    onCompleted: async (res) => {
      await SecureStore.setItemAsync(BIOMETRIC_CREDENTIAL_FOR, res.registerBiometricLogin.userId);
      await SecureStore.setItemAsync(BIOMETRIC_CREDENTIAL_ID, res.registerBiometricLogin.biometricId);
      setIsEnabled(true);
    },
    onError: showFlashMessageError,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const { showDialog } = useOverlay();

  const [unregisterBiometricLogin] = useUnregisterBiometricLoginMutation({
    onError: () => {
      //
    },
  });

  const handleUpdate = useCallback(
    async (status: boolean) => {
      if (status === false) {
        const biometricId = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_ID);

        if (biometricId != null) {
          unregisterBiometricLogin({
            variables: {
              biometricId,
            },
          });
        }

        await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_FOR);
        await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_ID);
        setIsEnabled(false);
      } else {
        const isHardwareSupport = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (!isHardwareSupport || !isEnrolled) {
          await showDialog({
            type: 'ALERT',
            title: 'Đăng nhập sinh trắc học thất bại',
            message:
              'Mở khoá sinh trắc học chưa được kích hoạt trên thiết bị của bạn. Vui lòng kích hoạt trong phần cài đặt của hệ thống và thử lại.',
          });
          return;
        }

        const response = await LocalAuthentication.authenticateAsync();

        if (response.success) await registerBiometricLogin();
      }
    },
    [registerBiometricLogin, showDialog, unregisterBiometricLogin],
  );

  if (supportBiometricType == null) return <></>;

  return (
    <View style={tw`flex-row items-end justify-between mt-12px pb-12px`}>
      {supportBiometricType === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION ? (
        <FaceIdSVG width={20} height={20} />
      ) : (
        <TouchIdSVG width={20} height={20} />
      )}
      <Text style={tw`text-14px flex-1 ml-16px`}>
        Đăng nhập bằng{' '}
        {supportBiometricType === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION ? 'FaceID' : 'TouchID'}
      </Text>
      <Switch value={isEnabled} onChange={handleUpdate} />
      <View style={tw`absolute bottom-0 right-0 left-0 border-b bg-primary ml-36px border-grayscale-border`} />
    </View>
  );
});
