import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Image, Text } from '@rneui/themed';
import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { Pressable, SafeAreaView, View } from 'react-native';

import { ArrowLeftSVG, EditSVG } from '../../svg';
import { ActivityIndicator, Space, TabBarLabel2, tw } from '../../components';
import { AppRoutes } from '../../navigator-params';
import { getQualification } from '../../utils';
import { useAgencyGetDetailTechnicianQuery } from '../../graphql/queries/agencyGetDetailTechnician.generated';

import { PropsType } from './type';
import { TechnicianRepairHistoryTab } from './technician-repair-history-tab';
import { TechnicianReceiptTab } from './technician-receipt-tab';
import { TechnicianReviewTab } from './technician-review-tab';

const Tab = createMaterialTopTabNavigator();
export const TechnicianDetailScreen: React.FC<PropsType> = memo(({ navigation, route }: PropsType) => {
  const navigateToInfomation = useCallback(() => {
    navigation.navigate(AppRoutes.TECHNICIAN_INFORMATION_SCREEN, { id: route.params.id });
  }, [navigation, route.params.id]);

  const { data, loading } = useAgencyGetDetailTechnicianQuery({
    variables: { id: route.params.id },
    skip: !route.params.id,
  });

  const technician = useMemo(() => data?.agencyGetDetailTechnician || undefined, [data]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Pressable onPress={navigateToInfomation}>
            <EditSVG style={tw`mr-16px mt-16px`} />
          </Pressable>
        );
      },
      headerLeft: () => {
        return (
          <Pressable onPress={() => navigation.goBack()}>
            <ArrowLeftSVG style={tw`ml-16px mt-16px`} fill="#fff" />
          </Pressable>
        );
      },
      headerTitleAlign: 'left',
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
    });
  }, [navigateToInfomation, navigation]);

  if (loading)
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  if (!technician) return null;
  return (
    <SafeAreaView style={tw`flex-1`}>
      <View style={tw`items-center bg-grayscale-gray p-16px`}>
        <View style={tw`p-1px border rounded-full border-white shadow-xl`}>
          <Image
            source={{ uri: (technician?.avatar?.fullThumbUrl as string) ?? '' }}
            style={tw`w-55px h-55px rounded-full`}
          />
        </View>
        <Space size={12} />
        <Text style={tw`font-semibold text-16px text-white`}>{technician?.fullname || ''}</Text>
        <Space size={4} />
        <Text style={tw`text-11px text-white text-center`}>{getQualification(technician.qualifications)}</Text>
        <Space size={24} />
        <View style={tw`flex-row`}>
          <View style={tw`items-center`}>
            <Text style={tw`text-14px text-white`}>123</Text>
            <Space size={4} />
            <Text style={tw`text-11px text-white`}>Lượt sửa chữa</Text>
          </View>
          <Space horizontal size={50} />
          <View style={tw`items-center`}>
            <Text style={tw`text-14px text-white`}>789</Text>
            <Space size={4} />
            <Text style={tw`text-11px text-white`}>Đánh giá</Text>
          </View>
        </View>
      </View>
      <Tab.Navigator
        screenOptions={{
          tabBarGap: 0,
          tabBarAllowFontScaling: true,
          tabBarItemStyle: { width: 'auto' },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          name={AppRoutes.TECHNICIAN_REPAIR_HISTORY_TAB}
          component={TechnicianRepairHistoryTab}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Lịch sử sửa chữa'} />,
          }}
        />
        <Tab.Screen
          name={AppRoutes.TECHNICIAN_RECEIPT_TAB}
          component={TechnicianReceiptTab}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Hoá đơn'} />,
          }}
        />
        <Tab.Screen
          name={AppRoutes.TECHNICIAN_REVIEW_TAB}
          component={TechnicianReviewTab}
          options={{
            tabBarLabel: ({ focused }) => <TabBarLabel2 focused={focused} title={'Đánh giá'} />,
          }}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
});
