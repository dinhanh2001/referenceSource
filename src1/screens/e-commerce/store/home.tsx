import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, ECommerceStoreInfo, ListProductHorizontal, tw } from '../../../components';
import { useStoreDetailQuery } from '../../../graphql/queries/storeDetail.generated';
import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { PartnerEntity, ProductEntity, SortDirectionEnum, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

import { ECommerceHomeStoreListNavigationProps, ECommerceHomeStoreListRouteProp } from './type';

const LIMIT_ITEMS = 4;

export const EcommerceStoreHome = () => {
  const { bottom } = useSafeAreaInsets();

  const {
    params: { storeId },
  } = useRoute<ECommerceHomeStoreListRouteProp>();
  const navigation = useNavigation<ECommerceHomeStoreListNavigationProps>();

  const { data, loading, refetch } = useStoreDetailQuery({
    variables: {
      id: storeId,
    },
  });
  const { data: productReview, refetch: refetchProductReview } = useUserProductsQuery({
    variables: {
      partnerId: storeId,
      isActive: StatusEnum.ACTIVE,
      limit: LIMIT_ITEMS,
      sort: {
        field: 'star',
        direction: SortDirectionEnum.DESC,
      },
    },
  });
  const { data: productNew, refetch: refetchProductNew } = useUserProductsQuery({
    variables: {
      partnerId: storeId,
      isActive: StatusEnum.ACTIVE,
      isNew: true,
      limit: LIMIT_ITEMS,
    },
  });
  const { data: productSold, refetch: refetchProductSold } = useUserProductsQuery({
    variables: {
      partnerId: storeId,
      isActive: StatusEnum.ACTIVE,
      limit: LIMIT_ITEMS,
      sort: {
        field: 'numberSold',
        direction: SortDirectionEnum.DESC,
      },
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    refetch();
    refetchProductNew();
    refetchProductReview();
    refetchProductSold();
  });

  const onNavigateReviewVehicle = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Xếp hạng hàng đầu',
      variables: {
        sort: {
          field: 'star',
          direction: SortDirectionEnum.DESC,
        },
        partnerId: storeId,
      },
    });
  }, [navigation, storeId]);
  const onNavigateNewVehicle = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Mới về',
      variables: {
        isNew: true,
        partnerId: storeId,
      },
    });
  }, [navigation, storeId]);
  const onNavigateSoldVehicle = useCallback(() => {
    navigation.navigate('e-commerce/product-list', {
      title: 'Bán chạy',
      variables: {
        partnerId: storeId,
        sort: {
          field: 'numberSold',
          direction: SortDirectionEnum.DESC,
        },
      },
    });
  }, [navigation, storeId]);

  if (loading && !data?.storeDetail) return <ActivityIndicator />;

  return (
    <ScrollView
      scrollIndicatorInsets={{ right: 1 }}
      contentContainerStyle={tw`pb-${bottom + 16}px`}
      refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}
    >
      <ECommerceStoreInfo containerStyle={tw`mx-4 mt-5`} data={data?.storeDetail as PartnerEntity} />

      <ListProductHorizontal
        title="Xếp hạng hàng đầu"
        data={productReview?.userProducts?.items as ProductEntity[]}
        onPress={onNavigateReviewVehicle}
      />
      <ListProductHorizontal
        title="Mới về"
        data={productNew?.userProducts?.items as ProductEntity[]}
        onPress={onNavigateNewVehicle}
      />
      <ListProductHorizontal
        title="Bán chạy"
        data={productSold?.userProducts?.items as ProductEntity[]}
        onPress={onNavigateSoldVehicle}
      />
    </ScrollView>
  );
};
