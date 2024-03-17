import { useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { useCallback, useMemo, useRef, useState } from 'react';

import { ActivityIndicator, EmptyView } from '../../components';
import { useGetServiceFeedbacksQuery } from '../../graphql/queries/getServiceFeedbacks.generated';
import { ServiceFeedbackEntity } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { useRefreshByUser } from '../../hooks';
import { FeedbackEmptySvg } from '../../svg';

import { FeedbackItem } from './components';
import { FeedbackTabRouteProp } from './type';

const LIMIT_PAGE = 10;

export const FeedbackList = () => {
  const {
    params: { status, refetchBadges },
  } = useRoute<FeedbackTabRouteProp>();

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, fetchMore, refetch } = useGetServiceFeedbacksQuery({
    variables: {
      limit: LIMIT_PAGE,
      page: 1,
      status,
    },
    fetchPolicy: 'cache-and-network',
    onError: showFlashMessageError,
    onCompleted: (res) => (currentPage.current = res?.getServiceFeedbacks?.meta.currentPage),
  });

  const onRefresh = useCallback(async () => {
    currentPage.current = 1;
    await refetchBadges?.();
    await refetch();
  }, [refetch, refetchBadges]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.getServiceFeedbacks.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            limit: LIMIT_PAGE,
            page: currentPage.current,
            status,
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

  const renderItem = useCallback(({ item }: { item: ServiceFeedbackEntity }) => {
    return <FeedbackItem item={item} />;
  }, []);

  const ListEmptyComponent = useMemo(() => {
    return <EmptyView icon={<FeedbackEmptySvg />} text="Chưa có phản hồi nào" />;
  }, []);

  return (
    <FlashList
      data={data?.getServiceFeedbacks?.items as ServiceFeedbackEntity[]}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      ListEmptyComponent={ListEmptyComponent}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.8}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      estimatedItemSize={20}
      scrollIndicatorInsets={{ right: 1 }}
    />
  );
};
