import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useRef, useState } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';

import { ActivityIndicator, EmptyRepairRequest, RepairRequestCard, tw } from '../../components';
import { usePartnerBookingsQuery } from '../../graphql/queries/partnerBookings.generated';
import { BookingEntity } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppRoutes } from '../../navigator-params';
import { RepairRequestTabParamList } from '../repair-request-list-screen';

const LIMIT = 10;

export const RepairRequestTabScreen = memo(() => {
  const {
    params: { bookingStatuses, refetchBadge },
  } = useRoute<RouteProp<RepairRequestTabParamList, AppRoutes.REPAIR_REQUEST_LIST_AWAITING_REQUEST>>();

  const [refreshing, setRefreshing] = useState(false);
  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore, called } = usePartnerBookingsQuery({
    variables: {
      limit: LIMIT,
      page: 1,
      statuses: bookingStatuses,
    },
    fetchPolicy: 'cache-and-network',
    onError: showFlashMessageError,
    onCompleted: (res) => (currentPage.current = res.partnerBookings.meta.currentPage),
  });
  const renderItem = useCallback((item: BookingEntity) => {
    return <RepairRequestCard data={item} />;
  }, []);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      currentPage.current = 1;
      await refetchBadge?.();
      await refetch();
      setRefreshing(false);
    } catch (e) {
      setRefreshing(false);
    }
  }, [refetch, refetchBadge]);

  const onLoadMore = useCallback(async () => {
    if (data && currentPage.current < data?.partnerBookings.meta.totalPages && !loading && !refreshing) {
      currentPage.current += 1;
      await fetchMore({
        variables: {
          limit: LIMIT,
          page: currentPage.current,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, loading, refreshing]);

  const inset = useSafeAreaInsets();

  useFocusEffect(
    useCallback(() => {
      currentPage.current = 1;
      refetch();
      refetchBadge && refetchBadge();
    }, [refetch, refetchBadge]),
  );

  if (loading && !called) {
    return <ActivityIndicator />;
  }

  return (
    <View style={[tw`bg-white flex-1`, { paddingBottom: inset.bottom + 24 }]}>
      <FlashList
        data={data?.partnerBookings?.items as BookingEntity[]}
        renderItem={({ item }) => renderItem(item)}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[tw.color('primary')!]}
            tintColor={tw.color('primary')}
            onRefresh={onRefresh}
          />
        }
        ListEmptyComponent={() => <EmptyRepairRequest bookingStatuses={bookingStatuses} />}
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        estimatedItemSize={500}
        ItemSeparatorComponent={() => <View style={tw`bg-grayscale-bg h-10px w-full`} />}
      />
    </View>
  );
});
