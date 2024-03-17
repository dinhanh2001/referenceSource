import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import React, { memo } from 'react';
import { SafeAreaView } from 'react-native';

import { TabBarLabel2, tw } from '../../components';
import { AppRoutes } from '../../navigator-params';

import { TechnicianRepairDetailTab } from './technician-repair-detail-tab';
import { PropsType } from './type';
import { TechnicianRepairReviewTab } from './technician-repair-review-tab';

const Tab = createMaterialTopTabNavigator();
export const TechnicianRepairDetailScreen: React.FC<PropsType> = memo(() => {
  return (
    <SafeAreaView style={tw`flex-1`}>
      <Tab.Navigator
        screenOptions={{
          tabBarGap: 0,
          tabBarAllowFontScaling: true,
          tabBarItemStyle: { width: 'auto' },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          name={AppRoutes.TECHNICIAN_REPAIR_DETAIL_TAB}
          component={TechnicianRepairDetailTab}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Thông tin sửa chữa'} />,
          }}
        />
        <Tab.Screen
          name={AppRoutes.TECHNICIAN_REPAIR_REVIEW_TAB}
          component={TechnicianRepairReviewTab}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Khách hàng đánh giá'} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
});
