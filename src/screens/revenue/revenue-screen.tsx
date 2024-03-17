import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '../../components';

import { RevenueAllTab } from './revenue-all-tab';
import { RevenueStoreTab } from './revenue-store-tab';
import { RevenueTab, RevenueTabParamList } from './type';
import { RevenueServiceTab } from './revenue-service-tab';

const Tab = createMaterialTopTabNavigator<RevenueTabParamList>();

export const RevenueScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName={RevenueTab.All}
      screenOptions={{
        tabBarItemStyle: tw`items-center w-auto`,
        tabBarIndicatorStyle: {
          backgroundColor: tw.color('white'),
        },
        tabBarScrollEnabled: true,
      }}
    >
      <Tab.Screen
        name={RevenueTab.All}
        component={RevenueAllTab}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Tất cả'} />,
        }}
      />
      <Tab.Screen
        name={RevenueTab.Store}
        component={RevenueStoreTab}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Gian hàng'} />,
        }}
      />
      <Tab.Screen
        name={RevenueTab.Service}
        component={RevenueServiceTab}
        options={{
          tabBarLabel: ({ focused }) => <TabBarLabel focused={focused} title={'Dịch vụ'} />,
        }}
      />
    </Tab.Navigator>
  );
};

type LabelProps = {
  focused: boolean;
  title: string;
};

const TabBarLabel = ({ focused, title }: LabelProps) => (
  <View style={[tw`py-2 mx-2`, focused && tw` border-b-2 border-b-primary-dark`]}>
    <Text style={[tw`leading-22px`, focused ? tw`text-primary-dark  font-semibold` : tw`text-grayscale-gray mx-1px`]}>
      {title}
    </Text>
  </View>
);
