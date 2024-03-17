import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';

export type AuthStackNavigatorParamList = {
  login?: undefined;
  register?: undefined;
  passwordCreation: {
    phone: string;
  };
  forgotPassword: undefined;
  passwordGenerationSuccess: {
    message: string;
  };
};

export type AuthStackNavigatorScreens = keyof AuthStackNavigatorParamList;

export type AuthStackNavigatorScreenProps<T extends AuthStackNavigatorScreens> = NativeStackScreenProps<
  AuthStackNavigatorParamList,
  T
>;

export type UseAuthStackNavigatorScreenProps<T extends AuthStackNavigatorScreens> = NativeStackNavigationProp<
  AuthStackNavigatorParamList,
  T
>;
