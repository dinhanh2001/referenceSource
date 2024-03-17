import { StackScreenProps } from '@react-navigation/stack';
import { ImagePickerAsset } from 'expo-image-picker';

import { AppRoutes, AppStackNavigatorParamList } from '../../navigator-params';
import { LatLng } from '../../graphql/type.interface';

export type PropsType = StackScreenProps<AppStackNavigatorParamList, AppRoutes.TECHNICIAN_INFORMATION_SCREEN>;

export type TechnicianInformationScreenNavigationProps = PropsType['navigation'];
export type TechnicianInformationScreenRouteProps = PropsType['route'];

export type FieldTitleProps = {
  isRequired: boolean;
  title: string;
};

export type FormDataTechnician = {
  address?: LatLng & {
    mapAddress: string;
  };
  addressDetail: string;
  avatarId?: string;
  bank?: string;
  birthday: string;
  cardNumber?: string;
  citizenId: string;
  education?: string;
  email: string;
  fullname: string;
  level?: string;
  phone: string;
  qualifications: string[];
  file?: ImagePickerAsset;
};
