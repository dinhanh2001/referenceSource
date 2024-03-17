import { NavigatorScreenParams } from '@react-navigation/native';

import { ActiveCodeEnum } from '../graphql/type.interface';

import { AppStackNavigatorParamList } from './app-stack-navigator';
import { AuthStackNavigatorParamList } from './auth-stack-navigator';
import { AddressStackNavigatorParamList } from './address-stack-navigator';

export type RootNavigatorParamList = AddressStackNavigatorParamList & {
  auth?: NavigatorScreenParams<AuthStackNavigatorParamList>;
  app?: NavigatorScreenParams<AppStackNavigatorParamList>;
  verifyOtp: {
    phone: string;
    email?: string;
    deviceId?: string;
    type: ActiveCodeEnum;
  };
};
