import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import dayjs from 'dayjs';
import deepmerge from 'deepmerge';
import React, { useCallback, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Space, tw } from '../../components';
import { usePartnerGetReferencesQuery } from '../../graphql/queries/partnerGetReferences.generated';
import { ReferenceEntity, StatusEnum } from '../../graphql/type.interface';
import { useEffectAfterMount, useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';
import { ArrowRightSVG, DocumentSVG } from '../../svg';

import { DocumentScreenNavigationProps } from './type';

const LIMIT = 10;

export const DocumentScreen = () => {
  const navigation = useNavigation<DocumentScreenNavigationProps>();

  const { bottom } = useSafeAreaInsets();
  const isFocused = useIsFocused();

  const navigateToDocumentDetail = useCallback(
    (id: string) => {
      navigation.navigate(AppRoutes.DOCUMENT_LIST_SCREEN, { id });
    },
    [navigation],
  );

  const { data, refetch, fetchMore, loading } = usePartnerGetReferencesQuery({
    variables: {
      limit: LIMIT,
      page: 1,
      isActive: StatusEnum.ACTIVE,
    },
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetch();
  });

  const currentPage = useRef(1);

  useEffectAfterMount(() => {
    if (isFocused) {
      currentPage.current = 1;
      refetch();
    }
  }, [isFocused]);

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerGetReferences?.meta?.totalPages && !loading && !isRefetchingByUser) {
      currentPage.current += 1;
      fetchMore({
        variables: {
          limit: LIMIT,
          page: currentPage.current,
          isActive: StatusEnum.ACTIVE,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, isRefetchingByUser, loading]);

  const renderItem = useCallback(
    ({ item }: { item: ReferenceEntity }) => {
      const { id, name, description, createdAt } = item || {};

      return (
        <TouchableOpacity
          style={tw`flex-row border mb-12px rounded-4px border-grayscale-border p-16px items-center`}
          onPress={() => navigateToDocumentDetail(id)}
        >
          <DocumentSVG />
          <Space horizontal />
          <View style={tw`flex-1`}>
            <Text style={tw`font-medium `}>{name}</Text>
            {!!description && <Text style={tw`text-13px text-grayscale-gray`}>{description}</Text>}
            <Text style={tw`text-11px text-grayscale-light`}>{dayjs(createdAt).format('DD/MM/YYYY')}</Text>
          </View>
          <ArrowRightSVG />
        </TouchableOpacity>
      );
    },
    [navigateToDocumentDetail],
  );

  return (
    <View style={tw`flex-1 bg-white`}>
      <FlashList
        renderItem={renderItem}
        data={data?.partnerGetReferences.items as ReferenceEntity[]}
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        estimatedItemSize={500}
        scrollIndicatorInsets={{ right: 1 }}
        contentContainerStyle={tw`px-4 pb-${bottom + 20}px`}
        refreshing={isRefetchingByUser}
        onRefresh={refetchByUser}
      />
    </View>
  );
};
