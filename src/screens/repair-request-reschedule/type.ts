import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = NativeStackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_RESCHEDULE_REQUEST>;

export type RepairRequestRescheduleScreenNavigationProps = PropsType['navigation'];
export type RepairRequestRescheduleScreenRouteProps = PropsType['route'];

export type ScheduleFormData = {
  scheduleDate: string;
  scheduleTime: string;
  scheduleReason: string;
};
