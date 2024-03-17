import { useFocusEffect, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ActivityIndicator,
  ECommerceFilterRate,
  ECommerceReviewItem,
  ECommerceReviewSummary,
  tw,
} from '../../../components';
import { useReviewsOfProductQuery } from '../../../graphql/queries/reviewsOfProduct.generated';
import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { ReviewEntity, ReviewSummary, ReviewTypeEnum, StarInfo } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { ECommerceProductReviewRouteProp } from './type';

export const ECommerceProductReview = () => {
  const { bottom } = useSafeAreaInsets();
  const {
    params: { productId },
  } = useRoute<ECommerceProductReviewRouteProp>();

  const [currentTab, setCurrentTab] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  const currentPage = useRef(1);

  const { data, loading, refetch } = useUserProductQuery({
    variables: {
      id: productId,
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
  } = useReviewsOfProductQuery({
    variables: {
      productId,
      type: ReviewTypeEnum.CLIENT_PRODUCT,
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
    useCallback(() => {
      currentPage.current = 1;
      refetch();
      refechReviews();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLoadMore = useCallback(() => {
    if (dataReviews && currentPage.current < dataReviews?.reviewsOfProduct?.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            productId,
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
  }, [dataReviews, fetchMore, loading, productId, star]);

  const renderHeader = useMemo(
    () => (
      <View style={tw`bg-white  -mx-4`}>
        <ECommerceReviewSummary reviewSummary={data?.userProduct?.reviewSummary as ReviewSummary} />
        <ECommerceFilterRate
          starInfo={data?.userProduct?.starInfo as StarInfo[]}
          current={currentTab}
          setCurrent={setCurrentTab}
        />
      </View>
    ),
    [currentTab, data?.userProduct?.reviewSummary, data?.userProduct?.starInfo],
  );

  const renderItem = useCallback(
    ({ item }: { item: ReviewEntity }) => <ECommerceReviewItem containerStyle={tw`mt-8`} item={item} />,
    [],
  );

  if (loading && !data?.userProduct) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <FlashList
        data={dataReviews?.reviewsOfProduct?.items as ReviewEntity[]}
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
