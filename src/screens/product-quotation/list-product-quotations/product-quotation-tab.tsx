import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { useCallback, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, ProductQuotationEmptyList, ProductQuotationItem, Space, tw } from '../../../components';
import { usePartnerProductQuotationsQuery } from '../../../graphql/queries/partnerProductQuotations.generated';
import { ProductQuotationEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { ProductQuotationTabRouteProp } from './type';

export const ProductQuotationTab = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { status, refetchBadges },
  } = useRoute<ProductQuotationTabRouteProp>();

  const [loadingMore, setLoadingMore] = useState(false);
  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = usePartnerProductQuotationsQuery({
    variables: {
      status,
      page: 1,
      limit: 10,
      isActive: StatusEnum.ACTIVE,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetchBadges?.();
    await refetch();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerProductQuotations.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            status,
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
  }, [data, fetchMore, loading, status]);

  const renderItem = useCallback(
    ({ item }: { item: ProductQuotationEntity }) => <ProductQuotationItem item={item} />,
    [],
  );

  if (loading && !data?.partnerProductQuotations?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      data={data?.partnerProductQuotations?.items as ProductQuotationEntity[]}
      renderItem={renderItem}
      ListEmptyComponent={<ProductQuotationEmptyList status={status} />}
      onEndReachedThreshold={0.8}
      estimatedItemSize={10}
      ItemSeparatorComponent={() => <View style={tw`bg-grayscale-border h-6px w-full`} />}
      contentContainerStyle={tw`pb-${bottom + 24}px`}
      showsVerticalScrollIndicator={false}
      onEndReached={onLoadMore}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      ListHeaderComponent={() => <Space size={6} backgroundColor={'#EEE'} />}
    />
  );
};
