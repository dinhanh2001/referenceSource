import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import deepmerge from 'deepmerge';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ActivityIndicator, ECommerceCartDiscountItem, tw } from '../../../components';
import { useUserGetDiscountCodesQuery } from '../../../graphql/queries/userGetDiscountCodes.generated';
import { DiscountCodeEntity, StatusEnum } from '../../../graphql/type.interface';
import { useDebounce, useRefreshByUser } from '../../../hooks';
import { SearchCustomSvg } from '../../../svg';

import { ECommerceCartDiscountSelectRouteProps, ECommerceCartNavigationProp } from './type';

export const ECommerceCartDiscountSelect = () => {
  const {
    params: { productIds, onSelectDiscount, currentDiscount },
  } = useRoute<ECommerceCartDiscountSelectRouteProps>();
  const navigation = useNavigation<ECommerceCartNavigationProp>();

  const [_search, setSearch] = useState('');
  const search = useDebounce(_search, 500);
  const [selected, setSelected] = useState<DiscountCodeEntity | undefined>(currentDiscount);
  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, refetch, fetchMore } = useUserGetDiscountCodesQuery({
    variables: {
      search,
      productIds,
      limit: 10,
      isActive: StatusEnum.ACTIVE,
      page: 1,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.userGetDiscountCodes.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            search,
            productIds,
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
  }, [data, fetchMore, loading, productIds, search]);

  const onSubmit = useCallback(() => {
    onSelectDiscount?.(selected as DiscountCodeEntity);
    navigation.goBack();
  }, [navigation, onSelectDiscount, selected]);

  const renderHeader = useMemo(() => {
    return (
      <View style={tw`px-4 py-7px bg-[#EEE] m-4 flex-row gap-3 rounded-2`}>
        <SearchCustomSvg width={16} fill={'#919699'} stroke={'#919699'} />
        <TextInput
          value={_search}
          onChangeText={setSearch}
          placeholder="Chọn hoặc nhập mã giảm giá"
          style={tw`flex-1`}
        />
      </View>
    );
  }, [_search]);

  const renderItem = useCallback(
    ({ item }: { item: DiscountCodeEntity }) => {
      return <ECommerceCartDiscountItem item={item} onSelect={setSelected} selected={selected?.id === item?.id} />;
    },
    [selected?.id],
  );

  if (loading && !data?.userGetDiscountCodes?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <FlatList
        data={data?.userGetDiscountCodes?.items as DiscountCodeEntity[]}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        onEndReached={onLoadMore}
        onEndReachedThreshold={0.8}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        ListHeaderComponent={renderHeader}
      />

      <Button title={'Xác nhận'} containerStyle={tw`mx-4 mt-2 mb-4`} disabled={!selected} onPress={onSubmit} />
    </SafeAreaView>
  );
};
