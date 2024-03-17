import { View, Text, ScrollView, RefreshControl } from 'react-native';
import React, { useMemo } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import dayjs from 'dayjs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, RenderImageByType, Screen, tw } from '../../components';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { Media, ServiceFeedbacksStatusEnum } from '../../graphql/type.interface';
import { useGetServiceFeedbackQuery } from '../../graphql/queries/getServiceFeedback.generated';
import { useRefreshByUser } from '../../hooks';

import { convertServiceFeedbackTypeEnum, convertServiceFeedbacksStatusEnum } from './components';

export const FeedbackDetail = React.memo(
  ({ route }: NativeStackScreenProps<AppStackNavigatorParamList, 'feedback-detail'>) => {
    const { id = '' } = route.params;

    const { bottom } = useSafeAreaInsets();

    const { data, loading, refetch } = useGetServiceFeedbackQuery({ variables: { id } });
    const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

    const feedback = useMemo(() => data?.getServiceFeedback, [data]);

    const statusColor = useMemo(() => {
      if (!feedback) return '';
      return feedback.status === ServiceFeedbacksStatusEnum.IN_PROGRESS
        ? tw.color('primary')
        : feedback.status === ServiceFeedbacksStatusEnum.WAITING
        ? tw.color('blue')
        : tw.color('status-success');
    }, [feedback]);

    if (loading) return <ActivityIndicator />;
    if (!feedback) return null;
    return (
      <Screen>
        <AppHeader title={convertServiceFeedbackTypeEnum(feedback?.type)} />
        <ScrollView
          scrollIndicatorInsets={{ right: 1 }}
          refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
          contentContainerStyle={tw`pb-${bottom + 20}px`}
        >
          <View style={tw`p-16px`}>
            <View style={tw`flex-row justify-between items-center mt-12px`}>
              <Text style={tw`text-14px text-grayscale-gray`}>Trạng thái</Text>
              <Text style={[tw`text-14px`, { color: statusColor }]}>
                {convertServiceFeedbacksStatusEnum(feedback?.status)}
              </Text>
            </View>
            <View style={tw`mt-12px`}>
              <Text style={tw`text-14px text-grayscale-gray`}>Nội dung phản ánh:</Text>
              <Text style={tw`text-17px text-grayscale-black font-bold leading-22px`}>{feedback?.content}</Text>
            </View>
            <View style={tw`flex-row justify-between items-center mt-12px`}>
              <Text style={tw`text-14px text-grayscale-gray`}>Thời gian phản ánh</Text>
              <Text style={tw`text-14px text-grayscale-black`}>
                {dayjs(feedback?.createAt).format('DD/MM/YYYY HH:mm')}
              </Text>
            </View>
            {!!feedback?.images?.length && (
              <View style={tw`pt-16px pb-8px `}>
                <Text style={tw`text-14px text-grayscale-black font-bold`}>{'Ảnh/ Video phản ánh'}</Text>
              </View>
            )}
            <View style={tw`flex justify-start flex-row items-center flex-wrap gap-x-8px`}>
              {(feedback?.images ?? []).map?.((item, idx) => (
                <RenderImageByType
                  index={idx}
                  imagesParent={feedback?.images as Media[]}
                  images={item as Media}
                  key={idx}
                  imageSize={80}
                />
              ))}
            </View>
            <View style={tw`border-b border-solid border-grayscale-border my-24px`} />
            {feedback.status !== ServiceFeedbacksStatusEnum.WAITING && (
              <View>
                <View style={tw``}>
                  <View>
                    <Text style={tw`text-14px text-grayscale-gray`}>Nội dung phản hồi:</Text>
                    <Text style={tw`text-17px text-grayscale-black font-bold leading-22px`}>{feedback?.answer}</Text>
                  </View>
                  <View style={tw`flex-row justify-between items-center mt-12px`}>
                    <Text style={tw`text-14px text-grayscale-gray`}>Thời gian phản hồi</Text>
                    <Text style={tw`text-14px text-grayscale-black`}>
                      {dayjs(feedback?.updateAt).format('DD/MM/YYYY HH:mm')}
                    </Text>
                  </View>
                </View>
                {!!feedback?.imagesAnswer?.length && (
                  <View style={tw`pt-16px pb-8px`}>
                    <Text style={tw`text-14px text-grayscale-black font-bold`}>{'Ảnh/ Video phản hồi'}</Text>
                  </View>
                )}
                <View style={tw`flex justify-start flex-row items-center flex-wrap gap-x-8px`}>
                  {(feedback?.imagesAnswer ?? []).map?.((item, idx) => (
                    <RenderImageByType
                      index={idx}
                      imagesParent={feedback?.imagesAnswer as Media[]}
                      images={item as Media}
                      key={idx}
                      imageSize={80}
                    />
                  ))}
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </Screen>
    );
  },
);
