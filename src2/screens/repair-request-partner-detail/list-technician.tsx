import { RouteProp, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, TechnicianItem, tw } from '../../components';
import { useUserGetAgencyTechniciansQuery } from '../../graphql/queries/userGetAgencyTechnicians.generated';
import { PartnerEntity, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppStackNavigatorParamList } from '../../navigator-params';

export const RepairRequestListTechnician = () => {
  const {
    params: { partnerId },
  } = useRoute<RouteProp<AppStackNavigatorParamList, 'repair-request/select-partner/list-technician'>>();
  const { bottom } = useSafeAreaInsets();

  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = useUserGetAgencyTechniciansQuery({
    variables: {
      filterTechniciansByAgencyId: partnerId ?? '',
      isActive: StatusEnum.ACTIVE,
      limit: 10,
      page: 1,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userGetAgencyTechnicians.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            filterTechniciansByAgencyId: partnerId ?? '',
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
  }, [data, fetchMore, loading, partnerId]);

  const renderItem = ({ item }: { item: PartnerEntity }) => {
    return (
      <View style={tw`px-4 pb-3`}>
        <TechnicianItem technician={item} />
      </View>
    );
  };

  if (loading && !data?.userGetAgencyTechnicians?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <FlashList
        data={data?.userGetAgencyTechnicians?.items as PartnerEntity[]}
        renderItem={renderItem}
        estimatedItemSize={20}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-${bottom + 16}px`}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </View>
  );
};
