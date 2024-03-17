import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.WAREHOUSE_IMPORT_EXPORT_PRODUCT_SCREEN>;

export type WarehouseImportExportProductScreenNavigationProps = PropsType['navigation'];
export type WarehouseImportExportProductScreenRouteProps = PropsType['route'];

export type WarehouseImportExportFormData = {
  productId: string;
  name: string;
  date: string;
  quantity: string;
};
