import { useFocusEffect, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import deepmerge from 'deepmerge';

import {
  ActivityIndicator,
  ECommerceFilterRate,
  ECommerceReviewItem,
  ECommerceReviewSummary,
  ECommerceStoreInfo,
  tw,
} from '../../../components';
import { useStoreDetailQuery } from '../../../graphql/queries/storeDetail.generated';
import { useRefreshByUser } from '../../../hooks';
import { PartnerEntity, ReviewEntity, ReviewSummary, ReviewTypeEnum, StarInfo } from '../../../graphql/type.interface';
import { useReviewsOfPartnerQuery } from '../../../graphql/queries/reviewsOfPartner.generated';

import { ECommerceHomeStoreListRouteProp } from './type';

export const ECommerceStoreRateRevew = () => {
  const { bottom } = useSafeAreaInsets();

  const [currentTab, setCurrentTab] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const currentPage = useRef(1);

  const {
    params: { storeId },
  } = useRoute<ECommerceHomeStoreListRouteProp>();

  const { data, loading, refetch } = useStoreDetailQuery({
    variables: {
      id: storeId,
    },
  });

  const star = useMemo(() => {
    if (currentTab > 5) {
      return undefined;
    }

    return currentTab;
  }, [currentTab]);

  const {
    data: dataReviews,
    refetch: refechReviews,
    fetchMore,
  } = useReviewsOfPartnerQuery({
    variables: {
      partnerId: storeId,
      type: ReviewTypeEnum.CLIENT_STORE,
      star,
      limit: 10,
      page: 1,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refetch();
    refechReviews();
  });

  useFocusEffect(
    useCallback(
      () => {
        currentPage.current = 1;
        refetch();
        refechReviews();
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [],
    ),
  );

  const onLoadMore = useCallback(() => {
    if (dataReviews && currentPage.current < dataReviews?.reviewsOfPartner?.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            partnerId: storeId,
            type: ReviewTypeEnum.CLIENT_STORE,
            star,
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
  }, [dataReviews, fetchMore, loading, star, storeId]);

  const renderHeader = useMemo(
    () => (
      <View style={tw`bg-white  -mx-4`}>
        <ECommerceStoreInfo containerStyle={tw`mx-4 mt-5 mb-5`} data={data?.storeDetail as PartnerEntity} />
        <ECommerceReviewSummary reviewSummary={data?.storeDetail?.storeReviewSummary as ReviewSummary} />
        <ECommerceFilterRate
          starInfo={data?.storeDetail?.storeStarInfo as StarInfo[]}
          current={currentTab}
          setCurrent={setCurrentTab}
        />
      </View>
    ),
    [currentTab, data?.storeDetail],
  );

  const renderItem = useCallback(
    ({ item }: { item: ReviewEntity }) => <ECommerceReviewItem containerStyle={tw`mt-8`} item={item} />,
    [],
  );

  if (loading && !data?.storeDetail) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <FlashList
        scrollIndicatorInsets={{ right: 1 }}
        data={dataReviews?.reviewsOfPartner?.items as ReviewEntity[]}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        estimatedItemSize={20}
        contentContainerStyle={tw`px-4 pb-${bottom + 16}px`}
        ItemSeparatorComponent={() => <View style={tw`w-2 h-2`} />}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
      />
    </View>
  );
};
