import { StackScreenProps } from '@react-navigation/stack';
import { CompositeNavigationProp, NavigationProp, RouteProp } from '@react-navigation/native';
import { ImagePickerAsset } from 'expo-image-picker';

import {
  AppRoutes,
  AppStackNavigatorParamList,
  AuthStackNavigatorParamList,
  RootNavigatorParamList,
} from '../../../navigator-params';
import { Media } from '../../../graphql/type.interface';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN>;

export type ProductAddVehicleScreenNavigationProps = CompositeNavigationProp<
  NavigationProp<RootNavigatorParamList>,
  NavigationProp<AuthStackNavigatorParamList>
>;
export type ProductAddVehicleScreenProps = PropsType['navigation'];

export type ProductAddVehicleScreenRouteProps = RouteProp<
  AppStackNavigatorParamList,
  AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN
>;

export type ProductPriceType = {
  isFixedCost?: boolean;
  unitPrice?: string;
};

export type ProductStatusType = {
  isNew?: boolean;
  operatingNumber?: string;
  operatingUnit?: string;
};

export type FormVehicleData = {
  avatarId: string;
  avatar?: ImagePickerAsset | any;
  descriptionImageIds: (ImagePickerAsset | any)[];
  descriptionImages?: (Media | any)[];
  name: string;
  vehicleRegistrationPlate?: string;
  ordinalNumber?: string;
  vehicleTypeId: string;
  manufacturerId: string;
  modelId: string;
  serialNumber?: string;
  vinNumber: string;
  originId?: string;
  yearOfManufacture?: string;
  status: ProductStatusType;
  detail: string;
  price: ProductPriceType;
  quantity: string;
  productUnitId: string;
};
