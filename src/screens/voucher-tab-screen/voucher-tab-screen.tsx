import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import { FlashList } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { memo, useCallback, useMemo, useRef } from 'react';
import { RefreshControl, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, Space, VoucherItem, tw } from '../../components';
import { usePartnerGetDiscountCodesQuery } from '../../graphql/queries/partnerGetDiscountCodes.generated';
import { DiscountCodeEntity, SortDirectionEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { useEffectAfterMount, useRefreshByUser } from '../../hooks';
import { AppRoutes } from '../../navigator-params';
import { Empty6 } from '../../svg';
import { VoucherTabParamList } from '../voucher-screen';
import { VoucherScreenNavigationProps } from '../voucher-screen/type';

const LIMIT = 10;

export const VoucherTabScreen = memo(() => {
  const {
    params: { discountStatus, refetchBadge },
  } = useRoute<RouteProp<VoucherTabParamList, AppRoutes.VOUCHER_ACTIVE_TAB>>();
  const navigation = useNavigation<VoucherScreenNavigationProps>();

  const isFocused = useIsFocused();
  const inset = useSafeAreaInsets();

  const currentPage = useRef(1);

  const { data, loading, refetch, fetchMore } = usePartnerGetDiscountCodesQuery({
    variables: {
      limit: LIMIT,
      page: 1,
      isActivities: discountStatus,
      sort: {
        field: 'startDate',
        direction: SortDirectionEnum.ASC,
      },
    },
    fetchPolicy: 'cache-and-network',
    onError: showFlashMessageError,
    onCompleted: (res) => (currentPage.current = res.partnerGetDiscountCodes.meta.currentPage),
  });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetchBadge?.();
    await refetch();
  });
  const hasData = !!data?.partnerGetDiscountCodes?.items?.length;

  const handleNavigateDetail = useCallback(
    (id: string) => {
      navigation.navigate(AppRoutes.VOUCHER_DETAIL_SCREEN, { id: id, isActivities: discountStatus });
    },
    [discountStatus, navigation],
  );

  const renderItem = useCallback(
    ({ item }: { item: DiscountCodeEntity }) => (
      <VoucherItem discountStatus={discountStatus} item={item} onPress={handleNavigateDetail} />
    ),
    [discountStatus, handleNavigateDetail],
  );

  const onLoadMore = useCallback(async () => {
    if (
      data &&
      currentPage.current < data?.partnerGetDiscountCodes.meta.totalPages &&
      !loading &&
      !isRefetchingByUser
    ) {
      currentPage.current += 1;
      await fetchMore({
        variables: {
          limit: LIMIT,
          page: currentPage.current,
          isActivities: discountStatus,
          sort: {
            field: 'startDate',
            direction: SortDirectionEnum.ASC,
          },
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, discountStatus, fetchMore, isRefetchingByUser, loading]);

  useEffectAfterMount(() => {
    if (isFocused) {
      currentPage.current = 1;
      refetch();
      refetchBadge && refetchBadge();
    }
  }, [isFocused]);

  const renderEmpty = useMemo(
    () => (
      <View style={tw`items-center mt-35px flex-1`}>
        <Empty6 />
        <Space size={8} />
        <Text style={tw`text-grayscale-gray text-center`}>
          {discountStatus ? 'Chưa có mã giảm giá nào đang hoạt động' : 'Chưa có mã giảm giá nào đã kết thúc'}
        </Text>
      </View>
    ),
    [discountStatus],
  );

  if (loading && !hasData) {
    return <ActivityIndicator />;
  }

  return (
    <View style={[tw`bg-grayscale-${hasData ? 'border' : 'bg'} flex-1`]}>
      <FlashList
        data={data?.partnerGetDiscountCodes.items as DiscountCodeEntity[]}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefetchingByUser}
            colors={[tw.color('primary')!]}
            tintColor={tw.color('primary')}
            onRefresh={refetchByUser}
          />
        }
        onEndReached={onLoadMore}
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.8}
        estimatedItemSize={500}
        ItemSeparatorComponent={() => <View style={tw`bg-grayscale-border h-2 w-full`} />}
        ListHeaderComponent={() => (hasData ? <View style={tw`bg-grayscale-border h-6px w-full`} /> : null)}
        contentContainerStyle={tw`pb-${inset.bottom + 24}px`}
        ListEmptyComponent={renderEmpty}
      />
    </View>
  );
});
