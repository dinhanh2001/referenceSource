import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl } from 'react-native';

import { ActivityIndicator, tw } from '../../components';
import { useMyBookingsQuery } from '../../graphql/queries/myBookings.generated';
import { BookingEntity } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { RequestedItem } from '../my-repair-requests/components';
import { RepairRequestTabParamList } from '../../navigator-params';

import { MyRepairRequestsEmpty } from './components';

export const MyRepairRequestsTab = () => {
  const {
    params: { bookingStatuses: statuses, refetchBadge },
  } = useRoute<RouteProp<RepairRequestTabParamList, 'my-repair-request/waiting'>>();

  const [refreshing, setRefreshing] = useState<boolean>(false);

  const { data, loading, fetchMore, refetch } = useMyBookingsQuery({
    variables: { statuses, page: 1 },
    fetchPolicy: 'cache-and-network',
    onError: showFlashMessageError,
    onCompleted: (res) => (currentPage.current = res.myBookings.meta.currentPage),
  });

  const currentPage = useRef(1);

  useFocusEffect(
    useCallback(() => {
      currentPage.current = 1;
      refetch();
      refetchBadge?.();
    }, [refetch, refetchBadge]),
  );

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      currentPage.current = 1;
      await refetch();
      await refetchBadge?.();
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  }, [refetch, refetchBadge]);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.myBookings.meta.totalPages && !loading && !refreshing) {
      currentPage.current += 1;
      fetchMore({
        variables: {
          statuses,
          page: currentPage.current,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, loading, refreshing, statuses]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<BookingEntity>) => {
      return <RequestedItem item={item} refetchQuery={refetch} />;
    },
    [refetch],
  );

  const ListEmptyComponent = useMemo(() => {
    if (data != null && data.myBookings.meta.totalItems === 0) {
      return <MyRepairRequestsEmpty bookingStatuses={statuses} />;
    }
  }, [data, statuses]);

  return (
    <FlatList
      data={(data?.myBookings?.items || []) as BookingEntity[]}
      contentContainerStyle={[tw`py-16px justify-between`]}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.8}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={[tw.color('primary')!]}
          tintColor={tw.color('primary')}
          onRefresh={onRefresh}
        />
      }
      ListFooterComponent={loading ? <ActivityIndicator /> : null}
    />
  );
};
