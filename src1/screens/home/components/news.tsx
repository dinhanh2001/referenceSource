import React, { memo, useEffect, useMemo } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';
import { Text } from '@rneui/base';

import { useUserGetNewsQuery } from '../../../graphql/queries/userGetNews.generated';
import { NewsEntity, StatusEnum } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';
import { tw } from '../../../components';
import { ArrowRight } from '../../../svg';

import { NewsItem } from './NewsItem';

interface Props {
  isRefetchingByUser: boolean;
}

export const News = memo(({ isRefetchingByUser }: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const { data, refetch } = useUserGetNewsQuery({
    variables: {
      limit: 5,
      page: 1,
      isActive: StatusEnum.ACTIVE,
    },
  });
  const news = useMemo(() => data?.userGetNews?.items ?? [], [data]);

  useEffect(() => {
    if (isRefetchingByUser) {
      console.log(1111);

      refetch();
    }
  }, [isRefetchingByUser, refetch]);

  return (
    <View>
      <View style={tw`flex-row items-center mb-12px mt-28px`}>
        <Text style={tw`font-semibold text-17px mr-12px`}>Tin tức</Text>
        <TouchableOpacity
          style={tw`bg-primary-light rounded-full w-20px h-20px justify-center items-center`}
          onPress={() => navigation.navigate('news')}
        >
          <ArrowRight width={12} height={12} />
        </TouchableOpacity>
      </View>
      {news.map((n, index) => (
        <NewsItem key={index} item={n as NewsEntity} viewType={index === 0 ? 'GRID' : 'LIST'} />
      ))}
    </View>
  );
});
