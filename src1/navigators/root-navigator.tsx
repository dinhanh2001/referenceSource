import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootNavigatorParamList } from '../navigator-params';
import { AddressAutoCompleteScreen, AddressMapScreen, VerifyOtpScreen } from '../screens';

import { AppStackNavigator } from './app-stack-navigator';
import { AuthStackNavigator } from './auth-stack-navigator';

const Stack = createNativeStackNavigator<RootNavigatorParamList>();

type Props = {
  isLoggedIn: boolean;
};

export const RootNavigator = ({ isLoggedIn }: Props) => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {isLoggedIn ? (
        <Stack.Screen name="app" component={AppStackNavigator} />
      ) : (
        <Stack.Screen name="auth" component={AuthStackNavigator} />
      )}

      <Stack.Screen name="verifyOtp" component={VerifyOtpScreen} />

      <Stack.Group>
        <Stack.Screen name="ADDRESS_AUTOCOMPLETE" component={AddressAutoCompleteScreen} />
        <Stack.Screen name="ADDRESS_MAP" component={AddressMapScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
