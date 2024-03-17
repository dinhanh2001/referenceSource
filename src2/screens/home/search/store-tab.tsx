import deepmerge from 'deepmerge';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList, useWindowDimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { ActivityIndicator, AfterInteraction, ECommerceDepartmentItem, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useSearchStoreQuery } from '../../../graphql/queries/searchStore.generated';
import { PartnerEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { SearchContext } from './context';
import { SearchHomeNavigationProp } from './type';

const LIMIT = 10;

export const StoreTab = () => {
  const { search } = useContext(SearchContext);
  const navigation = useNavigation<SearchHomeNavigationProp>();

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { bottom } = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const w = Math.floor((width - 16 * 2 - 8) / 2);

  const { data, loading, refetch, fetchMore } = useSearchStoreQuery({
    variables: {
      search: search || '',
      isActive: StatusEnum.ACTIVE,
      page: 1,
      limit: LIMIT,
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
            limit: LIMIT,
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

  const onDetail = useCallback(
    (storeId: string) => navigation.navigate('e-commerce/store-detail', { storeId }),
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: PartnerEntity }) => {
      return <ECommerceDepartmentItem containerStyle={tw`py-3 px-4`} item={item} width={w} onPress={onDetail} />;
    },
    [w, onDetail],
  );

  return (
    <AfterInteraction forceShow={loading && !data?.searchStore?.items?.length}>
      <FlatList
        scrollIndicatorInsets={{ right: 1 }}
        data={data?.searchStore?.items as PartnerEntity[]}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Space size={1} backgroundColor={'#EEE'} />}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        contentContainerStyle={tw`pb-${bottom + 16}px`}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </AfterInteraction>
  );
};
