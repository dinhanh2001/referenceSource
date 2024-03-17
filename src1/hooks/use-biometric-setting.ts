import { useEffect, useState } from 'react';
import * as LocalAuthentication from 'expo-local-authentication';

export function useBiometricSetting() {
  const [biometricType, setBiometricType] = useState<LocalAuthentication.AuthenticationType>();

  useEffect(() => {
    const getSupportedBiometricAuth = async () => {
      try {
        const supportedAuthenticationTypes = await LocalAuthentication.supportedAuthenticationTypesAsync();
        const isHardwareSupport = await LocalAuthentication.hasHardwareAsync();

        if (isHardwareSupport) {
          const faceID = supportedAuthenticationTypes.find(
            (it) => it === LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
          );
          const touchId = supportedAuthenticationTypes.find(
            (it) => it === LocalAuthentication.AuthenticationType.FINGERPRINT,
          );

          setBiometricType(faceID ?? touchId);
        }
      } catch (error) {
        //
      }
    };

    getSupportedBiometricAuth();
  }, []);

  return biometricType;
}
