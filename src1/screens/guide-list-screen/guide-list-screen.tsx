import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { tw } from '../../components';
import { useUserGetGuidesQuery } from '../../graphql/queries/userGetGuides.generated';
import { GuideEntity, StatusEnum } from '../../graphql/type.interface';
import { useEffectAfterMount, useRefreshByUser } from '../../hooks';
import { ArrowRight, DocumentSVG } from '../../svg';

import { GuideListScreenNavigationProps, PropsType } from './type';

const LIMIT = 10;

export const GuideListScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<GuideListScreenNavigationProps>();

  const { bottom } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const navigateToDocumentDetail = useCallback(
    (guideId: string) => {
      navigation.navigate('guide/detail', { guideId });
    },
    [navigation],
  );

  const { data, refetch, fetchMore, loading } = useUserGetGuidesQuery({
    variables: {
      limit: LIMIT,
      page: 1,
      isActive: StatusEnum.ACTIVE,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const currentPage = useRef(1);

  useEffectAfterMount(() => {
    if (isFocused) {
      currentPage.current = 1;
      refetch();
    }
  }, [isFocused]);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userGetGuides?.meta?.totalPages && !loading && !isRefetchingByUser) {
      currentPage.current += 1;
      fetchMore({
        variables: {
          limit: LIMIT,
          page: currentPage.current,
          isActive: StatusEnum.ACTIVE,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, isRefetchingByUser, loading]);

  const renderItem = useCallback(
    ({ item }: { item: GuideEntity }) => {
      return (
        <TouchableOpacity
          style={tw`mx-4 flex-row border mb-12px rounded-4px border-grayscale-border p-16px items-center`}
          onPress={() => navigateToDocumentDetail(item.id)}
        >
          <DocumentSVG />
          <View style={tw`flex-1 mx-16px`}>
            <Text style={tw`font-medium `} numberOfLines={2}>
              {item?.name}
            </Text>
            <Text style={tw`text-13px text-grayscale-gray`} numberOfLines={2}>
              {item?.description}
            </Text>
            <Text style={tw`text-11px text-grayscale-light`}>{dayjs(item?.createdAt).format('DD/MM/YYYY')}</Text>
          </View>
          <ArrowRight />
        </TouchableOpacity>
      );
    },
    [navigateToDocumentDetail],
  );

  return (
    <FlashList
      renderItem={renderItem}
      data={data?.userGetGuides.items as GuideEntity[]}
      onEndReached={onLoadMore}
      keyExtractor={(item) => item.id}
      onEndReachedThreshold={0.8}
      estimatedItemSize={500}
      scrollIndicatorInsets={{ right: 1 }}
      contentContainerStyle={tw`pb-${bottom + 20}px`}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
    />
  );
});
