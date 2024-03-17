import { ApolloError, useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

import { useLogoutMutation } from '../graphql/mutations/logout.generated';
// import { useGetFirebaseDeviceTokenMutation } from '../services';
import { DeleteUserInput, UserEntity } from '../graphql/type.interface';
import { useMeUserQuery } from '../graphql/queries/meUser.generated';
import { BIOMETRIC_CREDENTIAL_FOR, BIOMETRIC_CREDENTIAL_ID } from '../constants';
import { useUnregisterBiometricLoginMutation } from '../graphql/mutations/unregisterBiometricLogin.generated';
import { registerForPushNotificationsAsync } from '../helpers/notification';
import { useDeleteUserMutation } from '../graphql/mutations/deleteUser.generated';

type ContextProps = {
  isLoggedIn: boolean;
  isCheckedMe: boolean;
  deviceId?: string;
  user?: UserEntity;
  logout: () => Promise<void>;
  login: (data: UserEntity) => Promise<void> | void;
  deleteAccount: (
    input: DeleteUserInput,
    onCompleted?: () => void,
    onError?: (err: ApolloError) => void,
  ) => Promise<void>;
};

const AuthContext = createContext<ContextProps>({
  isLoggedIn: false,
  isCheckedMe: false,
  login() {
    throw new Error('not-ready');
  },
  logout() {
    throw new Error('not-ready');
  },
  deleteAccount() {
    throw new Error('not-ready');
  },
});

export const useAuth = () => useContext(AuthContext);

type Props = PropsWithChildren;

export const AuthProvider = ({ children }: Props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deviceId, setDeviceId] = useState<string>();

  const [user, setUser] = useState<UserEntity>();

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();

      setDeviceId(token);
    })();
  }, [deviceId]);

  const [unregisterBiometricLogin] = useUnregisterBiometricLoginMutation({
    onError: () => {
      //
    },
  });

  const login = useCallback(
    async (data: UserEntity) => {
      setUser(data);
      setIsLoggedIn(true);

      const biometricForId = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_FOR);
      const biometricId = await SecureStore.getItemAsync(BIOMETRIC_CREDENTIAL_ID);

      if (biometricForId != null && biometricForId !== data.id) {
        biometricId != null &&
          (await unregisterBiometricLogin({
            variables: {
              biometricId,
            },
          }));

        await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_FOR);
        await SecureStore.deleteItemAsync(BIOMETRIC_CREDENTIAL_ID);
      }
      // await getFirebaseDeviceToken();
    },
    [unregisterBiometricLogin],
  );

  const { loading, called } = useMeUserQuery({
    variables: {
      deviceId,
    },
    onCompleted: (res) => {
      login(res.meUser as UserEntity);
    },
  });

  const client = useApolloClient();

  const [apolloLogout] = useLogoutMutation();
  const [deleteUser] = useDeleteUserMutation();

  const logout = useCallback(async () => {
    try {
      apolloLogout({
        variables: {
          deviceId,
        },
      });
    } catch (error) {
      // Do nothing
    }

    await AsyncStorage.clear();
    await client.clearStore();
    setIsLoggedIn(false);
  }, [apolloLogout, client, deviceId]);

  const deleteAccount = useCallback(
    async (input: DeleteUserInput, onCompleted?: () => void, onError?: (err: ApolloError) => void) => {
      try {
        const res = await deleteUser({
          variables: { input },
          onError,
          onCompleted,
        });

        if (res?.data?.deleteUser) {
          await AsyncStorage.clear();
          await client.clearStore();
          setIsLoggedIn(false);
        }
      } catch (error) {
        //
      }
    },
    [client, deleteUser],
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isCheckedMe: !loading && called, login, logout, deleteAccount, user, deviceId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
