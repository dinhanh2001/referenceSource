import React, { memo, useEffect, useMemo } from 'react';
import { View, useWindowDimensions } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/base';
import RenderHTML from 'react-native-render-html';
import dayjs from 'dayjs';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, tw } from '../../components';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { useUserGetNewsByIdQuery } from '../../graphql/queries/userGetNewsById.generated';
import { useFullScreenLoading } from '../../contexts';

export const NewDetail = memo(() => {
  const { params } = useRoute<RouteProp<AppStackNavigatorParamList, 'news/detail'>>();
  const { width } = useWindowDimensions();

  const { showFullscreenLoading } = useFullScreenLoading();

  const { data, loading } = useUserGetNewsByIdQuery({
    variables: { id: params?.id },
  });

  const news = useMemo(() => data?.userGetNewsById, [data]);

  useEffect(() => {
    showFullscreenLoading(loading);
  }, [loading, showFullscreenLoading]);

  if (!news) return null;
  return (
    <SafeAreaView>
      <AppHeader title={news.title} numberOfLines={1} />
      <ScrollView contentContainerStyle={tw`grow`} scrollIndicatorInsets={{ right: 1 }}>
        <View style={tw`px-[16px]`}>
          <Text style={tw`text-[19px] font-semibold mt-[8px] leading-5`}>{news.title}</Text>
          <Text numberOfLines={1} style={tw`text-12px text-grayscale-light mt-[6px]`}>
            {dayjs(news.createdAt).locale('vi').format('D MMMM, YYYY')}
          </Text>
        </View>

        <RenderHTML source={{ html: news?.body }} contentWidth={width} baseStyle={tw`px-[16px]`} />
      </ScrollView>
    </SafeAreaView>
  );
});
