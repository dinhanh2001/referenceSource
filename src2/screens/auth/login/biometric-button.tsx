import { memo, useCallback, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';

import { FaceIdSVG, TouchIdSVG } from '../../../svg';
import { tw } from '../../../components';
import { useBiometricSetting } from '../../../hooks';
import { useFullScreenLoading, useOverlay } from '../../../contexts';
import { BIOMETRIC_CREDENTIAL_ID } from '../../../constants';
import { useBiometricLoginMutation } from '../../../graphql/mutations/biometricLogin.generated';
import { showFlashMessageError } from '../../../helpers';
import { UserEntity } from '../../../graphql/type.interface';

type Props = {
  onLogin(user: UserEntity, accessToken: string, refreshToken: string): Promise<void>;
};

export const BiometricButton = memo(({ onLogin }: Props) => {
  const supportedBiometricType = useBiometricSetting();

  const { showDialog } = useOverlay();

  const [login, { loading }] = useBiometricLoginMutation({
    onCompleted: (res) =>
      onLogin(res.biometricLogin.user as UserEntity, res.biometricLogin.accessToken, res.biometricLogin.refreshToken),
    onError: showFlashMessageError,
  });

  const { showFullscreenLoading } = useFullScreenLoading();

  useEffect(() => {
    showFullscreenLoading(loading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  const handleBiometricLogin = useCallback(async () => {
    const biometricId = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_ID);

    if (biometricId == null) {
      await showDialog({
        type: 'ALERT',
        title: 'Đăng nhập sinh trắc học thất bại',
        message: 'Bạn phải đăng nhập và tiến hành đăng ký trong tài khoản của tôi để có thể sử dụng tính năng này.',
      });
      return;
    }

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

    if (response.success) {
      await login({
        variables: {
          input: {
            biometricId,
          },
        },
      });
    }
  }, [login, showDialog]);

  if (supportedBiometricType == null) return <></>;

  return (
    <TouchableOpacity
      style={tw`flex justify-center items-center h-48px w-48px rounded-4px bg-primary-lighter ml-16px`}
      onPress={handleBiometricLogin}
    >
      {supportedBiometricType === LocalAuthentication.AuthenticationType.FINGERPRINT ? <TouchIdSVG /> : <FaceIdSVG />}
    </TouchableOpacity>
  );
});
