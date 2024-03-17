import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';

import { AppHeader, Screen, TabbarLabel, tw } from '../../components';
import { useGetCountStatusServiceFeedbackQuery } from '../../graphql/queries/getCountStatusServiceFeedback.generated';
import { ServiceFeedbacksStatusEnum } from '../../graphql/type.interface';
import { UseAppStackNavigatorScreenProps } from '../../navigator-params';

import { FeedbackList } from './feedback-list';
import { FeedbackTabParamList } from './type';

const Tab = createMaterialTopTabNavigator<FeedbackTabParamList>();

export const Feedback = React.memo(() => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'feedback'>>();

  const { data, refetch: refetchBadges } = useGetCountStatusServiceFeedbackQuery({
    fetchPolicy: 'cache-and-network',
  });

  const { all, waiting, inprogress, done } = useMemo(() => {
    const list = data?.getCountStatusServiceFeedback ?? [];

    return {
      all: list.reduce((p, v) => p + (parseInt(v?.quantity, 10) || 0), 0),
      waiting: list.find((it) => it?.status === ServiceFeedbacksStatusEnum.WAITING)?.quantity || 0,
      inprogress: list.find((it) => it?.status === ServiceFeedbacksStatusEnum.IN_PROGRESS)?.quantity || 0,
      done: list.find((it) => it?.status === ServiceFeedbacksStatusEnum.DONE)?.quantity || 0,
    };
  }, [data?.getCountStatusServiceFeedback]);

  const addNewButton = useMemo(
    () => (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('feedback-create');
        }}
      >
        <Text style={tw`text-14px font-semibold text-primary`}>+ Thêm mới</Text>
      </TouchableOpacity>
    ),
    [navigation],
  );

  return (
    <Screen>
      <AppHeader title="Danh sách phản hồi" rightView={addNewButton} />
      <Tab.Navigator
        screenOptions={{
          tabBarItemStyle: tw`items-center w-auto`,
          tabBarIndicatorStyle: {
            backgroundColor: tw.color('white'),
          },
          tabBarScrollEnabled: true,
        }}
      >
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Tất cả'} badge={all} />,
          }}
          name={'feedback/all'}
          component={FeedbackList}
          initialParams={{
            refetchBadges,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Chờ xử lý'} badge={waiting} />,
          }}
          name={'feedback/waiting'}
          component={FeedbackList}
          initialParams={{
            status: ServiceFeedbacksStatusEnum.WAITING,
            refetchBadges,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đang xử lý'} badge={inprogress} />,
          }}
          name={'feedback/inprogress'}
          component={FeedbackList}
          initialParams={{
            status: ServiceFeedbacksStatusEnum.IN_PROGRESS,
            refetchBadges,
          }}
        />
        <Tab.Screen
          options={{
            tabBarLabel: ({ focused }) => <TabbarLabel focused={focused} title={'Đã xử lý'} badge={done} />,
          }}
          name={'feedback/done'}
          component={FeedbackList}
          initialParams={{
            status: ServiceFeedbacksStatusEnum.DONE,
            refetchBadges,
          }}
        />
      </Tab.Navigator>
    </Screen>
  );
});
