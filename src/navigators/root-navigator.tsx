import { createStackNavigator } from '@react-navigation/stack';

import { RootNavigatorParamList, AppRoutes } from '../navigator-params';
import { AddressAutoCompleteScreen, AddressMapScreen, SelectScreen } from '../screens';

import { AppStackNavigator } from './app-stack-navigator';
import { AuthStackNavigator } from './auth-stack-navigator';
import { withHeader } from './default-navigation-options';

const Stack = createStackNavigator<RootNavigatorParamList>();

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
        <Stack.Screen name={AppRoutes.APP} component={AppStackNavigator} />
      ) : (
        <Stack.Screen name={AppRoutes.AUTH} component={AuthStackNavigator} />
      )}
      <Stack.Group>
        <Stack.Screen name={AppRoutes.ADDRESS_AUTOCOMPLETE} component={AddressAutoCompleteScreen} />
        <Stack.Screen name={AppRoutes.ADDRESS_MAP} component={AddressMapScreen} />
        <Stack.Screen name={AppRoutes.SELECT} component={SelectScreen} options={{ ...withHeader, headerTitle: '' }} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
