import { useNavigation, useRoute } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, ECommerceDepartmentItem, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useSearchStoreQuery } from '../../../graphql/queries/searchStore.generated';
import { PartnerEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { DisplayEnum } from './filter';
import { ECommerceSearchNavigationProp, ECommerceSearchResultListRouteProp } from './type';
import { FilterContext } from './context';

export const ECommerceSearchResultListDepartment = () => {
  const {
    params: { search },
  } = useRoute<ECommerceSearchResultListRouteProp>();
  const navigation = useNavigation<ECommerceSearchNavigationProp>();

  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 16 * 2 - 8) / 2);

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { filter } = useContext(FilterContext);
  const isGrid = filter?.display === DisplayEnum.GRID;

  const { data, loading, refetch, fetchMore } = useSearchStoreQuery({
    variables: {
      search: search as string,
      isActive: StatusEnum.ACTIVE,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.searchStore.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            search: search as string,
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
  }, [data, fetchMore, loading, search]);

  const onDetailStore = useCallback(
    (storeId: string) => {
      navigation.push('e-commerce/store-detail', { storeId });
    },
    [navigation],
  );

  // const renderHeader = useMemo(
  //   () => (
  //     <View style={tw`mb-2 -mx-4`}>
  //       <ECommerceSearchResultBanner />
  //     </View>
  //   ),
  //   [],
  // );

  const renderItem = useCallback(
    ({ item }: { item: PartnerEntity }) => {
      return (
        <ECommerceDepartmentItem
          containerStyle={isGrid ? tw`mx-1 mb-2` : tw`py-3`}
          item={item}
          onPress={onDetailStore}
          isGrid={isGrid}
          width={w}
        />
      );
    },
    [isGrid, onDetailStore, w],
  );

  return (
    <FlatList
      scrollIndicatorInsets={{ right: 1 }}
      key={filter?.display}
      data={data?.searchStore?.items as PartnerEntity[]}
      // ListHeaderComponent={renderHeader}
      numColumns={isGrid ? 2 : 1}
      renderItem={renderItem}
      ItemSeparatorComponent={() => (isGrid ? null : <Space size={1} backgroundColor={'#EEE'} />)}
      onRefresh={refetchByUser}
      refreshing={isRefetchingByUser}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      contentContainerStyle={tw`pb-${bottom + 16}px px-4`}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
