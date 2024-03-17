import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Button, Image, Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import deepmerge from 'deepmerge';

import { ActivityIndicator, AppHeader, Space, tw } from '../../../components';
import { CallButton } from '../../../components/call-button';
import { usePartnerGetStoresQuery } from '../../../graphql/queries/partnerGetStores.generated';
import { StoreEntity } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { AppRoutes } from '../../../navigator-params';
import { TagSVG } from '../../../svg';

import { PropsType, WarehouseListScreenNavigationProps } from './type';

const LIMIT = 10;

export const WarehouseListScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<WarehouseListScreenNavigationProps>();

  const { data, refetch, fetchMore, loading } = usePartnerGetStoresQuery({
    variables: { limit: LIMIT, page: 1 },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const currentPage = useRef(1);

  const list = useMemo(() => data?.partnerGetStores?.items as StoreEntity[], [data?.partnerGetStores?.items]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerGetStores?.meta?.totalPages && !loading && !isRefetchingByUser) {
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

  const navigateAddWarehouse = useCallback(() => {
    navigation.navigate(AppRoutes.WAREHOUSE_ADD_SCREEN, { isEdit: false });
  }, [navigation]);

  const navigateWarehouseDetail = useCallback(
    (item: StoreEntity) => {
      navigation.navigate(AppRoutes.WAREHOUSE_DETAIL_SCREEN, { id: item.id });
    },
    [navigation],
  );

  const renderRightHeader = useMemo(() => {
    if (!list?.length) {
      return null;
    }

    return (
      <TouchableOpacity onPress={navigateAddWarehouse}>
        <Text style={tw`text-primary-dark font-semibold`}>Thêm mới</Text>
      </TouchableOpacity>
    );
  }, [list?.length, navigateAddWarehouse]);

  const renderItem = useCallback(
    ({ item }: { item: StoreEntity }) => {
      return (
        <TouchableOpacity
          style={tw`border-grayscale-border rounded-4px p-16px flex-row items-center border`}
          onPress={() => navigateWarehouseDetail(item)}
        >
          <Image source={{ uri: item.avatar?.fullOriginalUrl ?? '' }} style={tw`w-60px h-60px`} />
          <Space horizontal />
          <View style={tw`justify-between flex-1`}>
            <Text style={tw`font-semibold`}>{item.name}</Text>
            <Space size={14} />
            <View>
              <Text style={tw`text-13px text-grayscale-gray`}>{item.phoneNumber}</Text>
              <Text style={tw`text-13px text-grayscale-gray`}>{item.address}</Text>
            </View>
          </View>
          <Space horizontal />
          <CallButton phone={item.phoneNumber} />
        </TouchableOpacity>
      );
    },
    [navigateWarehouseDetail],
  );

  const renderEmpty = useCallback(() => {
    return (
      <View style={tw` items-center mt-35px`}>
        <TagSVG />
        <Space size={8} />
        <Text style={tw`text-grayscale-gray text-center`}>Chưa có kho hàng nào</Text>
        <Space />
        <Button style={tw`px-24px bg-primary`} onPress={navigateAddWarehouse}>
          Thêm mới
        </Button>
      </View>
    );
  }, [navigateAddWarehouse]);

  const renderContent = useMemo(() => {
    if (loading && !list?.length) {
      return <ActivityIndicator />;
    }

    return (
      <FlashList
        contentContainerStyle={tw`p-16px`}
        data={data?.partnerGetStores.items as StoreEntity[]}
        keyExtractor={(item: StoreEntity) => item?.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space size={12} />}
        ListEmptyComponent={renderEmpty}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loading ? <ActivityIndicator /> : null}
        estimatedItemSize={500}
        showsVerticalScrollIndicator={false}
      />
    );
  }, [
    data?.partnerGetStores.items,
    isRefetchingByUser,
    list?.length,
    loading,
    onLoadMore,
    refetchByUser,
    renderEmpty,
    renderItem,
  ]);

  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Kho hàng" rightView={renderRightHeader} />
      {renderContent}
    </SafeAreaView>
  );
});
