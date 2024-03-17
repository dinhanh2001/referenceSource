import { useNavigation, useRoute } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import deepmerge from 'deepmerge';

import { ActivityIndicator, EmptyListNotificaiton, NotificationItem, tw } from '../../components';
import { NotificationEntity, NotificationTypeEnum, StatusEnum } from '../../graphql/type.interface';
import { useRefreshByUser } from '../../hooks';
import { SearchNormalSVG } from '../../svg';
import { usePartnerNotificationsQuery } from '../../graphql/queries/partnerNotifications.generated';
import { useSeenNotificationMutation } from '../../graphql/mutations/seenNotification.generated';
import { showFlashMessageError } from '../../helpers';
import { useFullScreenLoading } from '../../contexts';
import { AppRoutes } from '../../navigator-params';

import { NotificationNavigationProp, NotificationTabRouteProp } from './type';

export const NotificationList = () => {
  const {
    params: { type, refetchBadge },
  } = useRoute<NotificationTabRouteProp>();
  const navigation = useNavigation<NotificationNavigationProp>();

  const { showFullscreenLoading } = useFullScreenLoading();

  const [unread, setUnread] = useState(false);
  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, loading, refetch, fetchMore } = usePartnerNotificationsQuery({
    variables: {
      type,
      isActive: StatusEnum.ACTIVE,
      page: 1,
      limit: 15,
      isSeen: unread ? false : undefined,
    },
  });

  const [seenNoti, { loading: loadingSeen }] = useSeenNotificationMutation({
    onError: showFlashMessageError,
    onCompleted: () => {
      currentPage.current = 1;
      refetchBadge?.();
      refetch?.();
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(async () => {
    currentPage.current = 1;
    await refetchBadge?.();
    await refetch?.();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < data?.partnerNotifications.meta.totalPages && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            type,
            isActive: StatusEnum.ACTIVE,
            limit: 15,
            page: currentPage.current,
            isSeen: unread ? false : undefined,
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
  }, [data, fetchMore, loading, type, unread]);

  useEffect(() => {
    showFullscreenLoading(loadingSeen);
  }, [loadingSeen, showFullscreenLoading]);

  const { placeholder } = useMemo(() => {
    switch (type) {
      case NotificationTypeEnum.ORDER:
        return {
          placeholder: 'Tìm trong thông báo Đơn hàng',
        };
      case NotificationTypeEnum.MAINTENANCE:
        return {
          placeholder: 'Tìm trong thông báo Lịch bảo dưỡng',
        };
      case NotificationTypeEnum.BOOKING:
        return {
          placeholder: 'Tìm trong thông báo Sửa chữa',
        };
      case NotificationTypeEnum.OTHER:
        return {
          placeholder: 'Tìm trong thông báo Sửa chữa',
        };
      default:
        return {
          placeholder: '',
        };
    }
  }, [type]);

  const onPressItem = useCallback(
    (item: NotificationEntity) => {
      const { id, seen, objectId } = item || {};

      if (!seen) {
        seenNoti({
          variables: {
            id,
          },
        });
      }

      switch (type) {
        case NotificationTypeEnum.ORDER:
          navigation.navigate(AppRoutes.MY_ORDER_DETAIL_SCREEN, { orderId: objectId as string });
          break;

        case NotificationTypeEnum.BOOKING:
          navigation.navigate(AppRoutes.REPAIR_REQUEST_REQUEST_DETAIL_SCREEN, { bookingId: objectId as string });
          break;

        default:
          break;
      }
    },
    [navigation, seenNoti, type],
  );

  const renderHeader = useMemo(() => {
    return (
      <View style={tw`mb-1`}>
        <View style={tw`py-2 px-3 flex-row bg-grayscale-bg rounded-full`}>
          <SearchNormalSVG width={16} />
          <TextInput
            style={tw`pl-12px text-13px flex-1`}
            clearButtonMode="while-editing"
            placeholder={placeholder}
            placeholderTextColor={tw.color('grayscale-light')}
          />
        </View>
        <TouchableOpacity
          style={tw`mt-4 border self-start py-6px px-3 rounded-full border-${
            unread ? 'grayscale-black' : '[#EEE]'
          } bg-${unread ? 'grayscale-bg' : 'white'}`}
          onPress={() => setUnread(!unread)}
        >
          <Text style={tw`text-grayscale-black text-13px`}>Chưa đọc</Text>
        </TouchableOpacity>
      </View>
    );
  }, [placeholder, unread]);

  const renderItem = useCallback(
    ({ item }: { item: NotificationEntity }) => {
      return <NotificationItem item={item} type={type} onPress={onPressItem} />;
    },
    [type, onPressItem],
  );

  if (loading && !data?.partnerNotifications?.items?.length) {
    return <ActivityIndicator />;
  }

  return (
    <FlashList
      ListHeaderComponent={renderHeader}
      data={data?.partnerNotifications?.items as NotificationEntity[]}
      renderItem={renderItem}
      ListEmptyComponent={<EmptyListNotificaiton type={type} />}
      estimatedItemSize={20}
      contentContainerStyle={tw`p-4`}
      refreshing={isRefetchingByUser}
      onRefresh={refetchByUser}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.8}
      ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
    />
  );
};
