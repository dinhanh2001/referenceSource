import React, { useCallback, useRef, useState } from 'react';
import deepmerge from 'deepmerge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native';

import { ActivityIndicator, SurveyItem, tw } from '../../../components';
import { usePartnerGetSurveysQuery } from '../../../graphql/queries/partnerGetSurveys.generated';
import { StatusEnum, SurveyEntity } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';
import { AppRoutes } from '../../../navigator-params';

import { SurveyListNavigationProps } from './type';

export const SurveyListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const navigation = useNavigation<SurveyListNavigationProps>();

  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, refetch, fetchMore } = usePartnerGetSurveysQuery({
    variables: {
      isActive: StatusEnum.ACTIVE,
      page: 1,
      limit: 15,
    },
  });
  const onRefresh = useCallback(async () => {
    currentPage.current = 1;
    await refetch();
  }, [refetch]);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(onRefresh);

  useFocusEffect(
    useCallback(() => {
      onRefresh();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerGetSurveys.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            limit: 15,
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
  }, [data, fetchMore, loading]);

  const onPressDetail = useCallback(
    (surveyId: string) => {
      navigation.navigate(AppRoutes.SURVEY_SCREEN, { surveyId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: SurveyEntity }) => <SurveyItem item={item} containerStyle={tw`mx-4`} onPress={onPressDetail} />,
    [onPressDetail],
  );

  if (loading && !data?.partnerGetSurveys?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlatList
      data={data?.partnerGetSurveys?.items as SurveyEntity[]}
      renderItem={renderItem}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      contentContainerStyle={tw`pb-${bottom + 16}px`}
      onEndReachedThreshold={0.8}
      onEndReached={onLoadMore}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
