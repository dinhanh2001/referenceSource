import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { LatLng } from '../../graphql/type.interface';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.ACCOUNT_ADDRESS_DETAIL>;

export type AccountAddressDetailScreenNavigationProps = PropsType['navigation'];
export type AccountAddressDetailScreenRouteProps = PropsType['route'];

export type FormData = {
  address: LatLng & {
    mapAddress: string;
  };
  addressDetail: string;
  userName: string;
  phoneNumber: string;
  setAsDefault: boolean;
  name: string;
};
