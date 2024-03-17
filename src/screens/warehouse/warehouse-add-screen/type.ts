import { StackScreenProps } from '@react-navigation/stack';
import * as ImagePicker from 'expo-image-picker';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.WAREHOUSE_ADD_SCREEN>;

export type WarehouseAddScreenNavigationProps = PropsType['navigation'];
export type WarehouseAddScreenRouteProps = PropsType['route'];

export type WarehouseAddFormData = {
  avatarId?: string;
  name: string;
  address: string;
  phoneNumber: string;
  email: string;
  description?: string;
  file?: ImagePicker.ImagePickerAsset;
};
