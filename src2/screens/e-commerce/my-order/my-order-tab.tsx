import { useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  AfterInteraction,
  ECommerceMyOrderEmptyList,
  ECommerceMyOrderItem,
  tw,
} from '../../../components';
import { Space } from '../../../components/spacer';
import { useMyOrdersQuery } from '../../../graphql/queries/myOrders.generated';
import { OrderEntity, StatusEnum } from '../../../graphql/type.interface';
import { useEffectAfterMount, useRefreshByUser } from '../../../hooks';

import { ECommerceMyOrderNavigationProp, ECommerceMyOrderTabRouteProp } from './type';

export const ECommerceMyOrderTab = () => {
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();
  const isFocused = useIsFocused();

  const { bottom } = useSafeAreaInsets();
  const {
    params: { statuses, refetchBadge },
  } = useRoute<ECommerceMyOrderTabRouteProp>();

  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = useMyOrdersQuery({
    variables: {
      statuses,
      isActive: StatusEnum.ACTIVE,
      limit: 10,
      page: 1,
    },
  });

  const onRefresh = useCallback(async () => {
    currentPage.current = 1;
    await refetchBadge?.();
    await refetch();
  }, [refetchBadge, refetch]);

  const { refetchByUser, isRefetchingByUser } = useRefreshByUser(onRefresh);

  const [loadingMore, setLoadingMore] = useState(false);

  useEffectAfterMount(() => {
    if (isFocused) {
      onRefresh();
    }
  }, [isFocused]);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.myOrders.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            statuses,
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

  const onDetail = useCallback(
    (orderId: string) => navigation.navigate('e-commerce/my-order-detail', { orderId }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: OrderEntity }) => (
      <View>
        <ECommerceMyOrderItem containerStyle={tw`p-4`} onPress={onDetail} item={item} />
        <Space size={6} backgroundColor={'#EEE'} />
      </View>
    ),
    [onDetail],
  );

  return (
    <AfterInteraction forceShow={loading && !data?.myOrders?.items?.length}>
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        data={data?.myOrders?.items as OrderEntity[]}
        renderItem={renderItem}
        ListEmptyComponent={<ECommerceMyOrderEmptyList statuses={statuses} />}
        contentContainerStyle={tw`pb-${bottom + 16}px`}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </AfterInteraction>
  );
};
