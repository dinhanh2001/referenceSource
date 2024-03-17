import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_AGENCY_ASSIGN_TECHNICIAN>;

export type RepairRequestAgencyAssignTechnicianScreenNavigationProps = PropsType['navigation'];
export type RepairRequestAgencyAssignTechnicianScreenRouteProps = PropsType['route'];
