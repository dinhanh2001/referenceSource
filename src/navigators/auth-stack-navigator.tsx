import { createStackNavigator } from '@react-navigation/stack';
import { useMemo } from 'react';

import {
  ForgotPasswordScreen,
  FreelancerRegisterScreen,
  FreelancerRegisterSuccessScreen,
  LoginScreen,
  QualificationSelectorScreen,
  RegistrationPasswordCreationScreen,
  ResetPasswordSuccessScreen,
} from '../screens/auth';
import { tw } from '../components';
import { useTranslation } from '../i18n';
import { AuthStackNavigatorParamList, AppRoutes } from '../navigator-params';

import { defaultStackNavigationOptions } from './default-navigation-options';

const Stack = createStackNavigator<AuthStackNavigatorParamList>();

export const AuthStackNavigator = () => {
  const { t } = useTranslation();

  const withHeaderOptions = useMemo(
    () => ({
      headerShown: true,
      headerTransparent: false,
      headerTitle: t('auth.register.title'),
      headerStyle: {
        borderBottomColor: tw.color('transparent'),
        shadowOpacity: 0,
      },
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
      ...defaultStackNavigationOptions,
    }),
    [t],
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: '',
        ...defaultStackNavigationOptions,
      }}
    >
      <Stack.Screen name={AppRoutes.LOGIN} component={LoginScreen} />
      <Stack.Screen
        name={AppRoutes.FREELANCER_REGISTER}
        component={FreelancerRegisterScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Đăng ký Kỹ thuật viên',
        }}
      />
      <Stack.Screen
        name={AppRoutes.REGISTRATION_PASSWORD_CREATION}
        component={RegistrationPasswordCreationScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Tạo  mật khẩu',
        }}
      />
      <Stack.Screen
        name={AppRoutes.FORGOT_PASSWORD}
        component={ForgotPasswordScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Quên mật khẩu',
        }}
      />
      <Stack.Screen
        name={AppRoutes.FREELANCER_REGISTER_SUCCESS}
        component={FreelancerRegisterSuccessScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: '',
          headerBackImage: () => null,
        }}
      />

      <Stack.Screen
        name={AppRoutes.QUALIFICATION_SELECTOR}
        component={QualificationSelectorScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Chuyên môn',
        }}
      />
      <Stack.Screen name={AppRoutes.RESET_PASSWORD_SUCCESS} component={ResetPasswordSuccessScreen} />
    </Stack.Navigator>
  );
};
