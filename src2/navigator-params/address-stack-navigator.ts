import { NavigationProp, RouteProp } from '@react-navigation/native';

import { LatLng } from '../graphql/type.interface';

type AddressInstance = LatLng & {
  mapAddress: string;
};

export type AddressStackNavigatorParamList = {
  ADDRESS_AUTOCOMPLETE: {
    onSelect(address: AddressInstance): void;
  };
  ADDRESS_MAP: {
    onSelect(address: AddressInstance): void;
    initial: LatLng;
  };
};

export type AddressStackScreenNavigationProps = NavigationProp<AddressStackNavigatorParamList>;
export type AddressStackScreenRouteProps<T extends keyof AddressStackNavigatorParamList> = RouteProp<
  AddressStackNavigatorParamList,
  T
>;
