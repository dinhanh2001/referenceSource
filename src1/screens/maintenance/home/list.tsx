import { useFocusEffect, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import deepmerge from 'deepmerge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, MaintenanceEmptyList, MaintenanceItem, tw } from '../../../components';
import { useUserMaintenancesQuery } from '../../../graphql/queries/userMaintenances.generated';
import { useRefreshByUser } from '../../../hooks';
import { MaintenanceEntity } from '../../../graphql/type.interface';

import { MaintenanceTabRouteProp } from './type';

export const MaintenanceList = () => {
  const {
    params: { status, refetchBadge },
  } = useRoute<MaintenanceTabRouteProp>();
  const { bottom } = useSafeAreaInsets();

  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = useUserMaintenancesQuery({
    variables: {
      statuses: status,
      limit: 10,
      page: 1,
    },
  });

  const onRefresh = useCallback(async () => {
    currentPage.current = 1;
    await refetchBadge?.();
    await refetch();
  }, [refetch, refetchBadge]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );
  const [loadingMore, setLoadingMore] = useState(false);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userMaintenances.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            statuses: [status],
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
  }, [data, fetchMore, loading, status]);

  const renderItem = useCallback(({ item }: { item: MaintenanceEntity }) => {
    return <MaintenanceItem item={item} />;
  }, []);

  if (loading && !data?.userMaintenances?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1 bg-grayscale-bg`}>
      <FlashList
        data={data?.userMaintenances?.items as MaintenanceEntity[]}
        renderItem={renderItem}
        ListEmptyComponent={<MaintenanceEmptyList status={status} />}
        estimatedItemSize={20}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        contentContainerStyle={tw`pb-${bottom + 16}px`}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </View>
  );
};
