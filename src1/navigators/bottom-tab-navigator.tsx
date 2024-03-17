import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import React, { useMemo } from 'react';

import { tw } from '../components';
import { BottomTabScreensParams } from '../navigator-params/bottom-tab-navigator';
import { Account, Home, Maintenance, MyRepairRequestScreen, Notification } from '../screens';
import { AccountSVG, CallMeSVG, NotificationSVG, SettingSVG, Clock } from '../svg';
import { useUserNotificationTypeUnSeenCountQuery } from '../graphql/queries/userNotificationTypeUnSeenCount.generated';

const Tab = createBottomTabNavigator<BottomTabScreensParams>();

const MyCustomTabBar = React.memo((props: BottomTabBarProps) => {
  const insets = useSafeAreaInsets();
  const { state, descriptors, navigation } = props;

  const { data } = useUserNotificationTypeUnSeenCountQuery();

  const hasUnread = useMemo(
    () => (data?.userNotificationTypeUnSeenCount?.reduce?.((acc, cur) => acc + (cur?.count || 0), 0) || 0) > 0,
    [data?.userNotificationTypeUnSeenCount],
  );

  const getIcon = React.useCallback(
    (index: number, isFocused: boolean) => {
      const fillColor = isFocused ? tw.color('primary') : tw.color('grayscale-gray');
      if (index === 0)
        return (
          <View
            style={tw.style(
              `w-40px h-40px rounded-full justify-center items-center bg-primary`,
              isFocused ? 'bg-opacity-100' : 'bg-opacity-80',
            )}
          >
            <CallMeSVG width={24} height={24} />
          </View>
        );
      else if (index === 1) {
        return <SettingSVG width={22} height={20} fill={fillColor} />;
      } else if (index === 2) {
        return <Clock width={22} height={20} fill={fillColor} />;
      } else if (index === 3) {
        return (
          <View>
            <NotificationSVG width={22} height={20} fill={fillColor} />
            {hasUnread && <View style={tw`h-8px w-8px rounded-full bg-error absolute -right-0`} />}
          </View>
        );
      } else if (index === 4) {
        return <AccountSVG width={22} height={20} fill={fillColor} />;
      }
    },
    [hasUnread],
  );

  return (
    <SafeAreaView
      edges={['bottom']}
      style={tw.style(
        'flex-row w-full bg-white pl-16px items-center justify-between shadow-md pt-10px',
        insets.bottom ? '' : 'pb-30px',
      )}
    >
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const icon = getIcon(index, isFocused);

        const onPress = () => {
          requestAnimationFrame(() => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          });
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            style={tw`items-center justify-between flex-1 h-40px`}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
          >
            {icon}
            {index !== 0 && (
              <Text style={tw.style('text-10px font-normal', isFocused ? 'text-primary' : 'text-grayscale-gray')}>
                {label}
              </Text>
            )}
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
});

export const AppBottomTabsNavigator = () => {
  return (
    <Tab.Navigator tabBar={(props) => <MyCustomTabBar {...props} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={'home'} component={Home} />
      <Tab.Screen
        name={'my-repair-requests'}
        component={MyRepairRequestScreen}
        options={{
          tabBarLabel: 'Sửa chữa',
        }}
      />
      <Tab.Screen
        name={'maintaince'}
        component={Maintenance}
        options={{
          tabBarLabel: 'Bảo dưỡng',
        }}
      />
      <Tab.Screen
        name={'notification'}
        component={Notification}
        options={{
          tabBarLabel: 'Thông báo',
        }}
      />
      <Tab.Screen
        name={'account'}
        component={Account}
        options={{
          tabBarLabel: 'Cá nhân',
        }}
      />
    </Tab.Navigator>
  );
};
