import { NavigationProp, RouteProp } from '@react-navigation/native';

import { LatLng } from '../graphql/type.interface';

import { AppRoutes } from './app-routes';

type AddressInstance = LatLng & {
  mapAddress: string;
};

export type AddressStackNavigatorParamList = {
  [AppRoutes.ADDRESS_AUTOCOMPLETE]: {
    onSelect(address: AddressInstance): void;
  };
  [AppRoutes.ADDRESS_MAP]: {
    onSelect(address: AddressInstance): void;
    initial: LatLng;
  };
};

export type AddressStackScreenNavigationProps = NavigationProp<AddressStackNavigatorParamList>;
export type AddressStackScreenRouteProps<T extends keyof AddressStackNavigatorParamList> = RouteProp<
  AddressStackNavigatorParamList,
  T
>;
