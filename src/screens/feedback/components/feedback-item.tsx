import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { tw } from '../../../components';
import {
  ServiceFeedbackEntity,
  ServiceFeedbackTypeEnum,
  ServiceFeedbacksStatusEnum,
} from '../../../graphql/type.interface';
import { renderTime } from '../../../helpers';
import { AppRoutes, UseAppStackNavigatorScreenProps } from '../../../navigator-params';
import { LifeRingSvg, Question2Svg, SmsEdit } from '../../../svg';

import { convertServiceFeedbackTypeEnum, convertServiceFeedbacksStatusEnum } from './enum';

type FeedbackItemProps = {
  item: ServiceFeedbackEntity;
};

export const typeIcon = {
  [ServiceFeedbackTypeEnum.COMPLAIN]: <SmsEdit />,
  [ServiceFeedbackTypeEnum.SUPPORT]: <LifeRingSvg />,
  [ServiceFeedbackTypeEnum.QUESTION]: <Question2Svg />,
};

export const FeedbackItem = React.memo(({ item }: FeedbackItemProps) => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<AppRoutes.FEEDBACK_DETAIL>>();
  const statusColor =
    item.status === ServiceFeedbacksStatusEnum.IN_PROGRESS
      ? tw.color('primary')
      : item.status === ServiceFeedbacksStatusEnum.WAITING
      ? tw.color('blue')
      : tw.color('status-success');

  const onDetail = useCallback(() => {
    navigation.navigate(AppRoutes.FEEDBACK_DETAIL, { id: item?.id });
  }, [navigation, item]);

  return (
    <TouchableOpacity onPress={onDetail} style={tw`flex-row p-16px items-center`}>
      {item.type && typeIcon[item.type]}
      <View style={tw`flex-row shrink`}>
        <View style={tw`flex-1 px-16px`}>
          <Text style={tw`text-14px font-medium`}>{convertServiceFeedbackTypeEnum(item.type)}</Text>
          <Text numberOfLines={1} style={tw`text-12px text-grayscale-gray mt-4px`}>
            {item.content}
          </Text>
        </View>
        <View style={tw`items-end justify-between`}>
          <Text style={[tw`text-12px`, { color: statusColor }]}>{convertServiceFeedbacksStatusEnum(item.status)}</Text>
          <Text style={tw`text-10px text-grayscale-light mt-4px`}>{renderTime(item.createAt, true)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
});
