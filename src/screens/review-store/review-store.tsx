import React, { useCallback, useMemo, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import deepmerge from 'deepmerge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, FilterRate, ReviewItem, ReviewSummaryComponent, Space, tw } from '../../components';
import { useAuth } from '../../contexts';
import { ReviewEntity, ReviewObjectEnum, ReviewSummary, StarInfo, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { usePartnerListReviewQuery } from '../../graphql/queries/partnerListReview.generated';

const LIMIT = 10;

export const ReviewStoreScreen = () => {
  const { partner, refetch: refetchMe } = useAuth();
  const { bottom } = useSafeAreaInsets();

  const [currentStar, setCurrentStar] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const currentPage = useRef(1);

  const star = useMemo(() => {
    if (currentStar > 5) {
      return undefined;
    }

    return currentStar;
  }, [currentStar]);

  const { data, loading, refetch, fetchMore } = usePartnerListReviewQuery({
    variables: {
      page: 1,
      limit: LIMIT,
      isActive: StatusEnum.ACTIVE,
      reviewObject: ReviewObjectEnum.ORDER,
      star,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetchMe?.();
    await refetch?.();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerListReview?.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            reviewObject: ReviewObjectEnum.ORDER,
            star,
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
  }, [data, fetchMore, loading, star]);

  const renderHeader = useMemo(() => {
    return (
      <View style={tw`gap-13px`}>
        <ReviewSummaryComponent summary={partner?.storeReviewSummary as ReviewSummary} />
        <Space size={1} backgroundColor={tw.color('grayscale-border')} />
        <FilterRate current={currentStar} setCurrent={setCurrentStar} starInfo={partner?.storeStarInfo as StarInfo[]} />
      </View>
    );
  }, [currentStar, partner?.storeReviewSummary, partner?.storeStarInfo]);

  const renderItem = useCallback(
    ({ item }: { item: ReviewEntity }) => <ReviewItem containerStyle={tw`mt-8`} item={item} />,
    [],
  );

  if (loading && !isRefetchingByUser) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data?.partnerListReview?.items as ReviewEntity[]}
      renderItem={renderItem}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={tw`px-4 pb-${bottom + 20}px`}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
