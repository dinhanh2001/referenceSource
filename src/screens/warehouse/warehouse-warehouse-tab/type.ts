import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';

import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { WarehouseDetailTabParamList } from '../warehouse-detail-screen/type';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.WAREHOUSE_DETAIL_SCREEN>;

export type WarehouseImportExportTabNavigationProps = PropsType['navigation'];
export type WarehouseImportExportTabRouteProp = RouteProp<WarehouseDetailTabParamList, AppRoutes.WAREHOUSE_IMPORT_TAB>;
