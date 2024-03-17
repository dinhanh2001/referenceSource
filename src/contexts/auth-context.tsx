import { ApolloError, useApolloClient } from '@apollo/client';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useState } from 'react';

import { DeletePartnerInput, PartnerEntity } from '../graphql/type.interface';
import { useMePartnerLazyQuery, useMePartnerQuery } from '../graphql/queries/mePartner.generated';
import { useLogoutMutation } from '../graphql/mutations/logout.generated';
import { registerForPushNotificationsAsync, showFlashMessageError } from '../helpers';
import { useDeletePartnerMutation } from '../graphql/mutations/deletePartner.generated';

type ContextProps = {
  isLoggedIn: boolean;
  isCheckedMe: boolean;
  deviceId?: string;
  partner?: PartnerEntity;
  logout: () => Promise<void>;
  login: (data: PartnerEntity) => Promise<void> | void;
  refetch?(): Promise<any>;
  deleteAccount: (
    input: DeletePartnerInput,
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

  const [partner, setPartner] = useState<PartnerEntity>();

  useEffect(() => {
    (async () => {
      const token = await registerForPushNotificationsAsync();

      setDeviceId(token);
    })();
  }, [deviceId]);

  const { loading, called } = useMePartnerQuery({
    variables: {
      deviceId,
    },
    onCompleted: (res) => {
      setPartner(res.mePartner as PartnerEntity);
      setIsLoggedIn(true);
    },
  });

  const [refetchLazy] = useMePartnerLazyQuery({
    variables: {
      deviceId,
    },
    fetchPolicy: 'cache-first',
  });

  const refetch = useCallback(async () => {
    const res = await refetchLazy();

    setPartner(res?.data?.mePartner as PartnerEntity);
  }, [refetchLazy]);

  const login = useCallback((data: PartnerEntity) => {
    setPartner(data);
    setIsLoggedIn(true);
  }, []);

  const [partnerLogout] = useLogoutMutation();
  const [deletePartner] = useDeletePartnerMutation();

  const client = useApolloClient();

  const logout = useCallback(async () => {
    try {
      await partnerLogout({
        variables: {
          deviceId,
        },
      });
      setPartner(undefined);
    } catch (error) {
      // Do nothing
    }

    await AsyncStorage.clear();
    await client.clearStore();
    setIsLoggedIn(false);
  }, [client, deviceId, partnerLogout]);

  const deleteAccount = useCallback(
    async (input: DeletePartnerInput, onCompleted?: () => void, onError?: (err: ApolloError) => void) => {
      try {
        const res = await deletePartner({
          variables: { input },
          onError,
          onCompleted,
        });

        if (res?.data?.deletePartner) {
          await AsyncStorage.clear();
          await client.clearStore();
          setIsLoggedIn(false);
        }
      } catch (error) {
        //
      }
    },
    [client, deletePartner],
  );

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isCheckedMe: !loading && called, login, logout, deleteAccount, partner, refetch, deviceId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
