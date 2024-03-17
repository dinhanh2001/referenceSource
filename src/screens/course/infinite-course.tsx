import { useFocusEffect, useNavigation } from '@react-navigation/native';
import deepmerge from 'deepmerge';
import React, { useCallback, useRef, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, CourseItem, tw } from '../../components';
import {
  PartnerGetCoursesQueryResponse,
  usePartnerGetCoursesQuery,
} from '../../graphql/queries/partnerGetCourses.generated';
import { CourseEntity, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';

import { PartnerCourseScreenNavigationProp } from './type';

type Props = {
  search?: string;
};

const PAGE_LIMIT = 16;

export const InfiniteCourses = ({ search }: Props) => {
  const navigation = useNavigation<PartnerCourseScreenNavigationProp>();
  const { bottom } = useSafeAreaInsets();

  const [loadingMore, setLoadingMore] = useState(false);
  const { data, loading, refetch, fetchMore } = usePartnerGetCoursesQuery({
    variables: {
      limit: PAGE_LIMIT,
      page: 1,
      isActive: StatusEnum.ACTIVE,
      search,
    },
    onCompleted: (res: PartnerGetCoursesQueryResponse) => {
      currentPage.current = res?.partnerGetCourses?.meta?.currentPage || 0;
    },
  });

  const currentPage = useRef(1);

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetch();
  });

  useFocusEffect(
    useCallback(() => {
      currentPage.current = 1;
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerGetCourses.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            isActive: StatusEnum.ACTIVE,
            limit: PAGE_LIMIT,
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
  }, [data, loading, fetchMore, search]);

  const onDetailCourse = useCallback(
    (courseId: string) => {
      navigation.navigate(AppRoutes.COURSE_DETAIL, { courseId });
    },
    [navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: CourseEntity }) => <CourseItem item={item} onDetail={onDetailCourse} />,
    [onDetailCourse],
  );

  if (loading && !data?.partnerGetCourses?.items?.length)
    return (
      <View style={tw`flex-1 flex items-center justify-center`}>
        <ActivityIndicator />
      </View>
    );

  return (
    <FlatList
      numColumns={2}
      data={data?.partnerGetCourses?.items as CourseEntity[]}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.8}
      ListFooterComponent={() => (loadingMore ? <ActivityIndicator /> : null)}
      renderItem={renderItem}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      contentContainerStyle={tw`px-2 pb-${bottom}px`}
      scrollIndicatorInsets={{ right: 1 }}
    />
  );
};
