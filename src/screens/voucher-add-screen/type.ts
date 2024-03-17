import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.VOUCHER_ADD_SCREEN>;

export type VoucherAddScreenNavigationProps = PropsType['navigation'];
export type VoucherAddScreenRouteProps = PropsType['route'];

export type VoucherAddFormData = {
  voucherName: string;
  products?: {
    productIds?: string[];
    isAllProducts?: boolean;
  };
  limitTime?: string;
  limitTimePerAccount?: string;
  date: {
    startDate: string;
    endDate: string;
  };
  discount: {
    unit: string;
    value: string;
  };
  minOrderValue: string;
  isActive?: boolean;
};
