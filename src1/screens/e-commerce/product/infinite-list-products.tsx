import { ContentStyle, FlashList, ListRenderItem } from '@shopify/flash-list';
import deepmerge from 'deepmerge';
import React, { ComponentType, JSXElementConstructor, ReactElement, useCallback, useRef, useState } from 'react';

import { ActivityIndicator, AfterInteraction } from '../../../components';
import { useUserProductsQuery } from '../../../graphql/queries/userProducts.generated';
import { ProductEntity, ProductTypeEnum, SortInput, StatusEnum } from '../../../graphql/type.interface';
import { useRefreshByUser } from '../../../hooks';

export type VariablesListProductProps = {
  partnerId?: string;
  type?: ProductTypeEnum;
  isNew?: boolean;
  sort?: SortInput;
  search?: string;
};

type Props = {
  variables?: VariablesListProductProps;
  renderItem: ListRenderItem<ProductEntity> | null | undefined;
  ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
  numColumns?: number;
  contentContainerStyle?: ContentStyle;
  refresh?: () => void;
};

const PAGE_LIMIT = 10;

export function InfiniteListProducts({
  renderItem,
  ListHeaderComponent,
  variables = {},
  contentContainerStyle,
  numColumns,
  refresh,
}: Props) {
  const currentPage = useRef(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, refetch, loading, fetchMore } = useUserProductsQuery({
    variables: {
      ...variables,
      isActive: StatusEnum.ACTIVE,
      limit: PAGE_LIMIT,
      page: 1,
    },
  });

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(() => {
    currentPage.current = 1;
    refresh?.();
    refetch();
  });

  const onLoadMore = useCallback(() => {
    if (data && currentPage.current < (data?.userProducts.meta.totalPages || 0) && !loading) {
      currentPage.current += 1;
      try {
        setLoadingMore(true);
        fetchMore({
          variables: {
            ...variables,
            isActive: StatusEnum.ACTIVE,
            limit: PAGE_LIMIT,
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
  }, [data, fetchMore, loading, variables]);

  return (
    <AfterInteraction forceShow={loading && !data?.userProducts?.items?.length}>
      <FlashList
        scrollIndicatorInsets={{ right: 1 }}
        data={data?.userProducts?.items as ProductEntity[]}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        estimatedItemSize={20}
        onRefresh={refetchByUser}
        refreshing={isRefetchingByUser}
        onEndReachedThreshold={0.8}
        onEndReached={onLoadMore}
        ListFooterComponent={loadingMore ? <ActivityIndicator /> : null}
        contentContainerStyle={contentContainerStyle}
        numColumns={numColumns}
      />
    </AfterInteraction>
  );
}
