import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Button, Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useRef } from 'react';
import { View } from 'react-native';

import { ActivityIndicator, RowWithTwoCells, Space, Table, tw } from '../../../components';
import { usePartnerGetStoreHistoryQuery } from '../../../graphql/queries/partnerGetStoreHistory.generated';
import { StoreProductHistoryEntity, StoreProductTypeEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { AppRoutes } from '../../../navigator-params';
import { Empty5 } from '../../../svg';
import { WarehouseDetailScreenNavigationProps, WarehouseDetailTabParamList } from '../warehouse-detail-screen/type';

const LIMIT = 10;

export const WarehouseImportExportTab = memo(() => {
  const navigation = useNavigation<WarehouseDetailScreenNavigationProps>();
  const { params } = useRoute<RouteProp<WarehouseDetailTabParamList, AppRoutes.WAREHOUSE_IMPORT_TAB>>();

  const navigateImportExportScreen = useCallback(() => {
    navigation.navigate(AppRoutes.WAREHOUSE_IMPORT_EXPORT_PRODUCT_SCREEN, {
      isImport: params.isImport,
      storeId: params.storeId,
    });
  }, [navigation, params.isImport, params.storeId]);

  const { data, refetch, fetchMore, loading } = usePartnerGetStoreHistoryQuery({
    variables: {
      storeId: params.storeId,
      limit: LIMIT,
      page: 1,
      type: params.isImport ? StoreProductTypeEnum.IMPORT : StoreProductTypeEnum.EXPORT,
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
      currentPage.current < data?.partnerGetStoreHistory?.meta?.totalPages &&
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

  const renderItem = useCallback(
    ({ item }: { item: StoreProductHistoryEntity }) => {
      return (
        <View>
          <RowWithTwoCells
            leftValue={'Tên sản phẩm'}
            rightValue={item.product.name}
            spacerColor={tw.color('white')}
            bgColorLeft={tw`bg-grayscale-border`}
            bgColorRight={tw`bg-grayscale-border`}
          />
          <Table
            data={
              !params.isImport
                ? [{ 'Ngày xuất hàng': dayjs(item.inputDate).format('DD/MM/YYYY') }, { 'Số lượng': item.quantity }]
                : [{ 'Ngày nhập hàng': dayjs(item.inputDate).format('DD/MM/YYYY') }, { 'Số lượng': item.quantity }]
            }
          />
        </View>
      );
    },
    [params.isImport],
  );

  return (
    <View style={tw`flex-1`}>
      <FlashList
        data={data?.partnerGetStoreHistory.items as StoreProductHistoryEntity[]}
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
      <View style={tw`p-16px`}>
        <Button title={!params.isImport ? 'Xuất hàng' : 'Nhập hàng'} onPress={navigateImportExportScreen} />
      </View>
    </View>
  );
});
