import { createStackNavigator } from '@react-navigation/stack';
import { useMemo } from 'react';

import { tw } from '../components';
import { useTranslation } from '../i18n';
import { AuthStackNavigatorParamList } from '../navigator-params';
import {
  ForgotPasswordScreen,
  LoginScreen,
  PasswordCreationScreen,
  PasswordGenerationSuccessScreen,
  RegisterScreen,
} from '../screens';

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
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen
        name="register"
        component={RegisterScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: '',
        }}
      />
      <Stack.Screen
        name="passwordCreation"
        component={PasswordCreationScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Tạo  mật khẩu',
        }}
      />
      <Stack.Screen
        name="forgotPassword"
        component={ForgotPasswordScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: 'Quên mật khẩu',
        }}
      />
      <Stack.Screen
        name="passwordGenerationSuccess"
        component={PasswordGenerationSuccessScreen}
        options={{
          ...withHeaderOptions,
          headerTitle: '',
          headerBackImage: () => null,
        }}
      />
    </Stack.Navigator>
  );
};
