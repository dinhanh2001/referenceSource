import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.WAREHOUSE_DETAIL_SCREEN>;

export type WarehouseDetailScreenNavigationProps = PropsType['navigation'];
export type WarehouseDetailScreenRouteProps = PropsType['route'];

export type WarehouseTabScreenParam = {
  isImport: boolean;
  storeId: string;
};

export type WarehouseDetailTabParamList = {
  [AppRoutes.WAREHOUSE_IMPORT_TAB]: WarehouseTabScreenParam;
  [AppRoutes.WAREHOUSE_EXPORT_TAB]: WarehouseTabScreenParam;
  [AppRoutes.WAREHOUSE_WAREHOUSE_TAB]: { storeId: string };
};
