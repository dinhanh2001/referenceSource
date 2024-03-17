import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View, useWindowDimensions, Text } from 'react-native';
import deepmerge from 'deepmerge';
import { useRoute } from '@react-navigation/native';

import { ActivityIndicator, ProductItem, tw } from '../../../components';
import { ProductEntity, StatusEnum } from '../../../graphql/type.interface';
import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { useRefreshByUser } from '../../../hooks';

import { ECommerceProductDetailSpecsTabRouteProp } from './type';

const PAGE_SIZE = 10;

export const ECommerceProductDetailSpecsRelated = () => {
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 16 * 2 - 8) / 2);

  const {
    params: { productId },
  } = useRoute<ECommerceProductDetailSpecsTabRouteProp>();

  const { data, refetch, loading, fetchMore } = useUserProductsQuery({
    variables: {
      isActive: StatusEnum.ACTIVE,
      page: 1,
      limit: PAGE_SIZE,
      excludeProductIds: [productId],
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const [loadingMore, setLoadingMore] = useState(false);

  const currentPage = useRef(1);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userProducts.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            limit: PAGE_SIZE,
            page: currentPage.current,
            excludeProductIds: [productId],
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
  }, [data, fetchMore, loading, productId]);

  const renderHeader = useMemo(
    () => (
      <View style={tw`mt-5 mb-4`}>
        <Text style={tw`font-semibold`}>Được khuyến nghị từ nhà cung cấp này</Text>
      </View>
    ),
    [],
  );

  const renderItem = useCallback(
    ({ item }: { item: ProductEntity }) => (
      <View style={tw`shadow-md  w-${w}px bg-white rounded-4px`}>
        <ProductItem size={w} infoStyle={tw`px-11px pt-2px pb-3`} data={item} />
      </View>
    ),
    [w],
  );

  if (loading && !data?.userProducts?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      data={data?.userProducts?.items as ProductEntity[]}
      renderItem={renderItem}
      estimatedItemSize={20}
      numColumns={2}
      contentContainerStyle={tw`px-4`}
      ItemSeparatorComponent={() => <View style={tw`w-2 h-2`} />}
      ListHeaderComponent={renderHeader}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
