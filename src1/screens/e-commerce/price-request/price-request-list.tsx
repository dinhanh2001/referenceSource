import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import deepmerge from 'deepmerge';

import { ActivityIndicator, ECommercePriceRequestEmptyList, ECommercePriceRequestItem, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useUserProductQuotationsQuery } from '../../../graphql/queries/userProductQuotations.generated';
import { ProductQuotationEntity } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { ECommercePriceRequestNavigationProp, ECommercePriceRequestTabRouteProp } from './type';

export const ECommercePriceRequestList = () => {
  const navigation = useNavigation<ECommercePriceRequestNavigationProp>();
  const {
    params: { type, refetchBadge },
  } = useRoute<ECommercePriceRequestTabRouteProp>();
  const { bottom } = useSafeAreaInsets();

  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = useUserProductQuotationsQuery({
    variables: {
      status: type,
      page: 1,
      limit: 10,
    },
  });

  const onRefresh = useCallback(() => {
    currentPage.current = 1;
    refetchBadge?.();
    refetch();
  }, [refetch, refetchBadge]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

  const [loadingMore, setLoadingMore] = useState(false);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userProductQuotations.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            limit: 10,
            page: currentPage.current,
          },
          updateQuery: (prev: any, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return deepmerge(prev, fetchMoreResult);
          },
        });
      } catch (error) {
        console.log('error', error);
      } finally {
        setLoadingMore(false);
      }
    }
  }, [data, fetchMore, loading]);

  const renderItem = useCallback(
    ({ item }: { item: ProductQuotationEntity }) => (
      <View>
        <ECommercePriceRequestItem
          containerStyle={tw`m-4`}
          onPress={(id: string) => navigation.navigate('e-commerce/price-request-detail', { id })}
          item={item}
        />
        <Space size={6} backgroundColor={'#EEE'} />
      </View>
    ),
    [navigation],
  );

  if (loading && !data?.userProductQuotations?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      data={data?.userProductQuotations?.items as ProductQuotationEntity[]}
      renderItem={renderItem}
      ListEmptyComponent={
        <ECommercePriceRequestEmptyList type={type} onPress={() => navigation.navigate('e-commerce/home')} />
      }
      estimatedItemSize={20}
      contentContainerStyle={tw`pb-${bottom + 16}px`}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
