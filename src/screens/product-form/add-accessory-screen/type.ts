import { StackScreenProps } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { ImagePickerAsset } from 'expo-image-picker';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { Media } from '../../../graphql/type.interface';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN>;

export type ProductAddAccessoryScreenNavigationProps = PropsType['navigation'];
export type ProductAddAccessoryScreenRouteProps = RouteProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN
>;

export type ProductPriceType = {
  isFixedCost?: boolean;
  unitPrice?: string;
};

export type ProductDeviceType = {
  modelId: string;
  manufacturerId: string;
  vehicleTypeId: string;
};

export type FormAccessoryData = {
  avatarId: string;
  avatar?: ImagePickerAsset | any;
  descriptionImageIds: (ImagePickerAsset | any)[];
  descriptionImages?: (Media | any)[];
  name: string;
  serialNumber?: string;
  partNumber?: string;
  isNew: boolean;
  originId?: string;
  partId: string;
  productDevices?: ProductDeviceType[];
  detail: string;
  price: ProductPriceType;
  quantity: string;
  productUnitId: string;
};
