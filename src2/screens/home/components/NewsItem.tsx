import { Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import dayjs from 'dayjs';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { tw } from '../../../components';
import { NewsEntity } from '../../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../../navigator-params';

const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

type NewsItemProps = {
  viewType?: 'GRID' | 'LIST';
  item: NewsEntity;
};

const NewsItem = ({ viewType = 'LIST', item }: NewsItemProps) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const navigateToDetail = useCallback(
    (id: string) => {
      navigation.navigate('news/detail', {
        id,
      });
    },
    [navigation],
  );

  if (viewType === 'GRID')
    return (
      <TouchableOpacity onPress={() => navigateToDetail(item?.id)} style={tw`pb-16px border-b border-grayscale-border`}>
        <Image
          style={[tw`h-202px w-auto rounded border border-grayscale-border`]}
          source={{ uri: item?.media?.fullThumbUrl as string }}
          resizeMode={'cover'}
        />
        <Text style={tw`text-14px font-semibold mt-16px leading-5`} numberOfLines={2}>
          {item.title}
        </Text>
        <Text numberOfLines={1} style={tw`text-12px text-grayscale-gray mt-4px`}>
          {item.description}
        </Text>
        <Text numberOfLines={1} style={tw`text-12px text-grayscale-light  mt-12px`}>
          {dayjs(item.createdAt).locale('vi').format('D MMMM, YYYY')}
        </Text>
      </TouchableOpacity>
    );
  return (
    <TouchableOpacity onPress={() => navigateToDetail(item?.id)} style={tw`pb-16px border-b border-grayscale-border`}>
      <View style={tw`flex-row mt-12px`}>
        <View style={tw`mr-20px flex-1`}>
          <Text style={tw`text-14px font-semibold leading-5`} numberOfLines={2}>
            {item.title}
          </Text>
          <Text numberOfLines={1} style={tw`text-12px text-grayscale-gray mt-4px`}>
            {item.description}
          </Text>
        </View>
        <Image
          style={[tw`w-64px h-64px rounded border border-grayscale-border`]}
          source={{ uri: item?.media?.fullThumbUrl as string }}
          resizeMode={'cover'}
        />
      </View>
      <Text numberOfLines={1} style={tw`text-12px text-grayscale-light mt-12px`}>
        {dayjs(item.createdAt).locale('vi').format('D MMMM, YYYY')}
      </Text>
    </TouchableOpacity>
  );
};

export { NewsItem };
