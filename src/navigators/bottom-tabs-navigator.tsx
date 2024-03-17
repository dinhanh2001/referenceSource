import React, { useMemo } from 'react';
import { BottomTabBarProps, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { AccountSVG, StoreSVG, NotificationSVG, SettingSVG, BookSavedSVG, LogoPrimarySVG } from '../svg';
import { tw } from '../components';
import { BottomTabNavigatorParamList, AppRoutes } from '../navigator-params';
import { Learning, Service, Notification, Account, Store, Home } from '../screens';
import { usePartnerNotificationTypeUnSeenCountQuery } from '../graphql/queries/partnerNotificationTypeUnSeenCount.generated';

const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

type TabBarProps = BottomTabBarProps & {
  role: 'AGENT' | 'KTV';
};

const MyCustomTabBar = React.memo(({ state, descriptors, navigation, role }: TabBarProps) => {
  const { data } = usePartnerNotificationTypeUnSeenCountQuery();

  const hasUnread = useMemo(
    () => (data?.partnerNotificationTypeUnSeenCount?.reduce?.((acc, cur) => acc + cur?.count, 0) || 0) > 0,
    [data?.partnerNotificationTypeUnSeenCount],
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
            <LogoPrimarySVG width={24} height={24} />
          </View>
        );
      if (role === 'AGENT') {
        if (index === 1) {
          return <StoreSVG width={22} height={20} fill={fillColor} />;
        } else if (index === 2) {
          return <SettingSVG width={22} height={20} fill={fillColor} />;
        } else if (index === 3) {
          return (
            <View>
              <NotificationSVG width={22} height={20} fill={fillColor} />
              {hasUnread && <View style={tw`h-2 w-2 rounded-full bg-error absolute -right-0`} />}
            </View>
          );
        } else if (index === 4) {
          return <AccountSVG width={22} height={20} fill={fillColor} />;
        }
      } else {
        if (index === 1) {
          return <BookSavedSVG width={22} height={20} fill={fillColor} />;
        } else if (index === 2) {
          return (
            <View>
              <NotificationSVG width={22} height={20} fill={fillColor} />
              {hasUnread && <View style={tw`h-2 w-2 rounded-full bg-error absolute -right-0`} />}
            </View>
          );
        } else if (index === 3) {
          return <AccountSVG width={22} height={20} fill={fillColor} />;
        }
      }
    },
    [hasUnread, role],
  );

  const insets = useSafeAreaInsets();

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
            style={tw.style(index === 0 ? 'pr-14px' : 'items-center justify-between flex-1 h-40px')}
            key={label}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            activeOpacity={1}
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
  /* 
    - role: 'AGENT' | 'AGENT_TECHNICAN'
    - get from user api
    */
  const role = 'AGENT';
  return (
    <Tab.Navigator tabBar={(props) => <MyCustomTabBar {...props} role={role} />} screenOptions={{ headerShown: false }}>
      <Tab.Screen name={AppRoutes.HOME} component={Home} />
      {role === 'AGENT' ? (
        <>
          <Tab.Screen
            name={AppRoutes.STORE}
            component={Store}
            options={{
              tabBarLabel: 'Gian hàng',
            }}
          />
          <Tab.Screen
            name={AppRoutes.SERVICE}
            component={Service}
            options={{
              tabBarLabel: 'Sửa chữa',
            }}
          />
        </>
      ) : (
        <Tab.Screen
          name={AppRoutes.LEARNING}
          component={Learning}
          options={{
            tabBarLabel: 'Học tập',
          }}
        />
      )}
      <Tab.Screen
        name={AppRoutes.NOTIFICATION}
        component={Notification}
        options={{
          tabBarLabel: 'Thông báo',
        }}
      />
      <Tab.Screen
        name={AppRoutes.ACCOUNT}
        component={Account}
        options={{
          tabBarLabel: 'Tài khoản',
        }}
      />
    </Tab.Navigator>
  );
};
