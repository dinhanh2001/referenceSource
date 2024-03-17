import { PropsWithChildren, createContext, memo } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { useOnCreateBookingSubscription } from '../graphql/subscriptions/onCreateBooking.generated';
import { AppRoutes, AppStackNavigatorParamList } from '../navigator-params';

import { useAuth } from './auth-context';

const Context = createContext({});

export const RepairRequestWatcherProvider = memo(({ children }: PropsWithChildren) => {
  const { isLoggedIn } = useAuth();

  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  useOnCreateBookingSubscription({
    skip: isLoggedIn === false,
    onData: (data) => {
      if (data.data.data?.onCreateBooking.id) {
        navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_PUSH_AGENCY, {
          bookingId: data.data.data?.onCreateBooking.id,
        });
      }
      console.log('data: ', data);
    },
  });

  return <Context.Provider value={{}}>{children}</Context.Provider>;
});
