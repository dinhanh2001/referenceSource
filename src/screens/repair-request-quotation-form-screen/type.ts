import { StackScreenProps } from '@react-navigation/stack';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.REPAIR_REQUEST_QUOTATION_FORM_SCREEN>;

export type AgentCheckQuoteScreenNavigationProps = PropsType['navigation'];
export type AgentCheckQuoteScreenRouteProps = PropsType['route'];

export type FormAccessory = {
  accessoryName: string;
  accessoryUnit: string;
  accessoryQuantity: string;
  accessoryAvailable: boolean;
  accessoryUnitPrice: string;
};

export type AdditionalFee = {
  additionalFeeName?: string;
  additionalFeeAmount?: string;
};

export type Diagnostics = {
  quotationPriceListId: string;
  workingHour?: string;
  expense?: string;
  description?: string;
  fixable?: boolean;
};

export type FormCheckAndQuote = {
  operatingNumber?: string;
  operatingUnit?: string;
  diagnosisNote?: string;
  estimatedCompleteAt: string;
  accessory: FormAccessory[];
  transportFee: string;
  diagnosticFee: string;
  repairFee: string;
  additional: AdditionalFee[];
  diagnostics: Diagnostics[];
};
