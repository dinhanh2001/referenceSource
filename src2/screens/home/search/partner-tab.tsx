import { useNavigation } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useContext, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AfterInteraction, PartnerItem, SearchEmpty, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useUserGetAgencyTechniciansQuery } from '../../../graphql/queries/userGetAgencyTechnicians.generated';
import { PartnerEntity, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { SearchContext } from './context';
import { SearchHomeNavigationProp } from './type';

const LIMIT = 10;

export const PartnerTab = () => {
  const { bottom } = useSafeAreaInsets();
  const { search } = useContext(SearchContext);

  const navigation = useNavigation<SearchHomeNavigationProp>();

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, refetch, fetchMore } = useUserGetAgencyTechniciansQuery({
    variables: {
      search,
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
    if (data && currentPage.current < data?.userGetAgencyTechnicians.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            limit: 10,
            page: currentPage.current,
            search,
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
    (item: PartnerEntity) => {
      navigation.navigate('home/partner-detail', { partnerId: item?.id, type: item?.type });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: PartnerEntity }) => <PartnerItem item={item} onPress={onDetail} />,
    [onDetail],
  );

  return (
    <AfterInteraction forceShow={loading && !data?.userGetAgencyTechnicians?.items?.length}>
      <FlatList
        data={data?.userGetAgencyTechnicians?.items as PartnerEntity[]}
        renderItem={renderItem}
        ListEmptyComponent={<SearchEmpty />}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-${bottom + 16}px`}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        ItemSeparatorComponent={() => <Space size={1} backgroundColor={tw.color('grayscale-border')} />}
        scrollIndicatorInsets={{ right: 1 }}
      />
    </AfterInteraction>
  );
};
