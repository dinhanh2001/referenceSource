import { RouteProp, useFocusEffect, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useRef } from 'react';
import { View } from 'react-native';

import { ActivityIndicator, RowWithTwoCells, Space, Table, tw } from '../../../components';
import { usePartnerGetStoreProductQuery } from '../../../graphql/queries/partnerGetStoreProduct.generated';
import { StoreProductEntity } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { AppRoutes } from '../../../navigator-params';
import { Empty5 } from '../../../svg';
import { WarehouseDetailTabParamList } from '../warehouse-detail-screen/type';

const LIMIT = 10;

export const WarehouseWarehouseTab = memo(() => {
  const { params } = useRoute<RouteProp<WarehouseDetailTabParamList, AppRoutes.WAREHOUSE_WAREHOUSE_TAB>>();

  const { data, refetch, fetchMore, loading } = usePartnerGetStoreProductQuery({
    variables: {
      storeId: params.storeId,
      limit: LIMIT,
      page: 1,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const currentPage = useRef(1);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onLoadMore = useCallback(() => {
    if (
      data &&
      currentPage.current < data?.partnerGetStoreProduct?.meta?.totalPages &&
      !loading &&
      !isRefetchingByUser
    ) {
      currentPage.current += 1;
      fetchMore({
        variables: {
          limit: 8,
          page: currentPage.current,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, isRefetchingByUser, loading]);

  const renderEmpty = useCallback(() => {
    return (
      <View style={tw` items-center mt-35px`}>
        <Empty5 />
        <Space size={8} />
        <Text style={tw`text-grayscale-gray text-center`}>Chưa có sản phẩm nào</Text>
        <Space />
      </View>
    );
  }, []);

  const renderItem = useCallback(({ item }: { item: StoreProductEntity }) => {
    return (
      <View>
        <RowWithTwoCells
          leftValue={'Tên sản phẩm'}
          rightValue={item.product.name}
          spacerColor={tw.color('white')}
          bgColorLeft={tw`bg-grayscale-border`}
          bgColorRight={tw`bg-grayscale-border`}
        />
        <Table data={[{ 'Số lượng': item.quantity }]} />
      </View>
    );
  }, []);

  return (
    <View style={tw`flex-1`}>
      <FlashList
        data={data?.partnerGetStoreProduct.items as StoreProductEntity[]}
        renderItem={renderItem}
        contentContainerStyle={tw`p-16px`}
        ItemSeparatorComponent={() => <Space />}
        estimatedItemSize={500}
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        ListEmptyComponent={renderEmpty}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
});
