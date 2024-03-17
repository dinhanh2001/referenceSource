import { useIsFocused, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AfterInteraction, MyOrderEmptyList, MyOrderItem, tw } from '../../../components';
import { usePartnerOrdersQuery } from '../../../graphql/queries/partnerOrders.generated';
import { OrderEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { MyOrderTabRouteProp } from './type';

export const MyOrderTabScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { statuses, refetchBadges },
  } = useRoute<MyOrderTabRouteProp>();

  const [loadingMore, setLoadingMore] = useState(false);
  const currentPage = useRef(1);
  const isFocused = useIsFocused();

  const { data, loading, refetch, fetchMore } = usePartnerOrdersQuery({
    variables: {
      statuses,
      isActive: StatusEnum.ACTIVE,
      limit: 10,
      page: 1,
    },
    onCompleted: (res) => (currentPage.current = res.partnerOrders.meta.currentPage),
  });

  const onRefresh = useCallback(async () => {
    currentPage.current = 1;
    await refetchBadges?.();
    await refetch();
  }, [refetch, refetchBadges]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

  useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused, onRefresh]);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerOrders.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            statuses,
            isActive: StatusEnum.ACTIVE,
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
  }, [data, fetchMore, loading, statuses]);

  const renderItem = useCallback(
    ({ item }: { item: OrderEntity }) => <MyOrderItem item={item} refechBadge={refetchBadges} />,
    [refetchBadges],
  );

  return (
    <AfterInteraction forceShow={loading && !data?.partnerOrders?.items?.length}>
      <FlatList
        data={data?.partnerOrders?.items as OrderEntity[]}
        renderItem={renderItem}
        ListEmptyComponent={<MyOrderEmptyList statuses={statuses} />}
        onEndReachedThreshold={0.8}
        ItemSeparatorComponent={() => <View style={tw`bg-grayscale-border h-6px w-full`} />}
        contentContainerStyle={tw`pb-${bottom + 24}px`}
        showsVerticalScrollIndicator={false}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
      />
    </AfterInteraction>
  );
};
