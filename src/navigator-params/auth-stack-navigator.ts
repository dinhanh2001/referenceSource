import { CategoryEntity } from '../graphql/type.interface';
import { RegisterTechnicianInformationFormData } from '../components';

import { AppRoutes } from './app-routes';

export type AuthStackNavigatorParamList = {
  [AppRoutes.LOGIN]?: undefined;
  [AppRoutes.FREELANCER_REGISTER]?: undefined;
  [AppRoutes.VERIFY_OTP]: {
    phone: string;
    email?: string;
  };
  [AppRoutes.REGISTRATION_PASSWORD_CREATION]: RegisterTechnicianInformationFormData;
  [AppRoutes.FORGOT_PASSWORD]: undefined;
  [AppRoutes.FREELANCER_REGISTER_SUCCESS]: undefined;
  [AppRoutes.AREA_PICKER]: undefined;
  [AppRoutes.QUALIFICATION_SELECTOR]?: {
    selectedQualifications?: CategoryEntity[];
    onSelect(data: CategoryEntity[]): void;
  };
  [AppRoutes.RESET_PASSWORD_SUCCESS]: { sendtoMail: boolean };
};
