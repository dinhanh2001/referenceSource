import React, { memo, useCallback, useEffect } from 'react';
import { FlatList, RefreshControl } from 'react-native-gesture-handler';
import { Divider } from '@rneui/base';
import deepmerge from 'deepmerge';

import { AppHeader, Screen, tw } from '../../components';
import { UserGetNewsQueryVariables, useUserGetNewsQuery } from '../../graphql/queries/userGetNews.generated';
import { NewsEntity, StatusEnum } from '../../graphql/type.interface';
import { NewsItem } from '../home/components';
import { useFullScreenLoading } from '../../contexts';
import { useRefreshByUser } from '../../hooks';

const filter: UserGetNewsQueryVariables = {
  limit: 4,
  page: 1,
  isActive: StatusEnum.ACTIVE,
};
export const News = memo(() => {
  const { showFullscreenLoading } = useFullScreenLoading();

  const { data, loading, refetch, fetchMore } = useUserGetNewsQuery({ variables: filter });

  useEffect(() => {
    showFullscreenLoading(loading);
  }, [loading, showFullscreenLoading]);

  const { refetchByUser } = useRefreshByUser(async () => {
    await refetch();
  });

  const onEndReachedLoadMore = useCallback(async () => {
    if (!data?.userGetNews?.meta) return;
    const { currentPage, totalPages } = data.userGetNews.meta;

    if (currentPage < totalPages && !loading) {
      await fetchMore({
        variables: {
          ...filter,
          page: currentPage + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult?.userGetNews) return prev;

          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data?.userGetNews.meta, fetchMore, loading]);

  return (
    <Screen style={tw`bg-white`}>
      <AppHeader title="Tin tức" />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={data != null && loading}
            colors={[tw.color('primary')!]}
            tintColor={tw.color('primary')}
            onRefresh={refetchByUser}
          />
        }
        keyExtractor={(item) => item?.id}
        style={tw`flex-1 px-16px`}
        contentContainerStyle={tw`pb-4`}
        data={data?.userGetNews?.items as NewsEntity[]}
        renderItem={({ item }) => {
          return <NewsItem key={item?.id} item={item} viewType={'GRID'} />;
        }}
        ItemSeparatorComponent={() => <Divider style={tw`bg-grayscale-bg h-[1px] mt-4`} />}
        onEndReachedThreshold={0.8}
        onEndReached={onEndReachedLoadMore}
      />
    </Screen>
  );
});
