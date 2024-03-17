import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, RefreshControl, Text, TouchableOpacity, View, ListRenderItemInfo } from 'react-native';
import deepmerge from 'deepmerge';

import { useVehiclesQuery } from '../../graphql/queries/vehicles.generated';
import { showFlashMessageError } from '../../helpers';
import { StatusEnum, VehicleEntity } from '../../graphql/type.interface';
import { VehicleCard } from '../vehicle-card';
import { tw } from '../tw';
import { GridViewSvg, UnorderedListSvg } from '../../svg';
import { ActivityIndicator } from '../loading-indicator';
import { ViewType } from '../../@types/utility';

type ExcludesProps = {
  excludeActiveBooking?: boolean;
  excludeActiveMaintenance?: boolean;
};

type Props = {
  viewType?: 'GRID' | 'LIST';
  onVehiclePress?(vehicle: VehicleEntity): void;
  EmptyComponent?: JSX.Element;
  listHeaderShown?: boolean;
  searchFilter?: string;
  selectedVehicle?: VehicleEntity;
  isActive?: StatusEnum;
  excludes?: ExcludesProps;
  hideCheckbox?: boolean;
};

export const InfinityMyVehicleList = memo(
  ({
    onVehiclePress,
    EmptyComponent,
    listHeaderShown = true,
    searchFilter,
    selectedVehicle,
    excludes,
    isActive,
    hideCheckbox,
  }: Props) => {
    const [refreshing, setRefreshing] = useState(false);
    const [viewType, setViewType] = useState<ViewType>('LIST');

    const currentPage = useRef(1);

    useEffect(() => {
      currentPage.current = 1;
    }, [searchFilter]);

    const { data, loading, fetchMore, refetch } = useVehiclesQuery({
      variables: {
        limit: 8,
        page: 1,
        search: searchFilter,
        isActive,
        ...excludes,
      },
      fetchPolicy: 'cache-and-network',
      onError: showFlashMessageError,
      onCompleted: (res) => (currentPage.current = res.vehicles.meta.currentPage),
    });

    const onRefresh = useCallback(async () => {
      try {
        setRefreshing(true);
        currentPage.current = 1;
        await refetch();
        setRefreshing(false);
      } catch (e) {
        setRefreshing(false);
      }
    }, [refetch]);

    const onLoadMore = useCallback(() => {
      if (data && currentPage.current < data?.vehicles.meta.totalPages && !loading && !refreshing) {
        currentPage.current += 1;
        fetchMore({
          variables: {
            limit: 8,
            page: currentPage.current,
          },
          updateQuery: (prev: any, { fetchMoreResult }) => {
            if (!fetchMoreResult) return prev;
            return deepmerge(prev, fetchMoreResult);
          },
        });
      }
    }, [data, fetchMore, loading, refreshing]);

    const renderItem = useCallback(
      ({ item }: ListRenderItemInfo<VehicleEntity>) => {
        return (
          <View style={[viewType === 'LIST' ? tw`pl-16px` : tw`w-1/2 p-6px`]}>
            <VehicleCard
              item={item}
              viewType={viewType}
              onPress={() => onVehiclePress?.(item)}
              borderVisible
              hideCheckbox={hideCheckbox}
              selectable={onVehiclePress != null}
              selected={selectedVehicle?.id === item.id}
            />
          </View>
        );
      },
      [hideCheckbox, onVehiclePress, selectedVehicle?.id, viewType],
    );

    const onToggleView = useCallback(
      (type: ViewType) => async () => {
        if (type !== viewType) {
          await refetch();
          currentPage.current = 1;
          setViewType(type);
        }
      },
      [setViewType, refetch, viewType],
    );

    const ListEmptyComponent = useMemo(() => {
      if (data != null && data.vehicles.meta.totalItems === 0) {
        return EmptyComponent ?? <></>;
      }
    }, [EmptyComponent, data]);

    return (
      <>
        {listHeaderShown && !!data?.vehicles?.items?.length && (
          <View style={tw`px-16px py-12px flex-row items-center`}>
            <Text style={tw`text-13px flex-1`}>{data?.vehicles.meta.totalItems} xe tất cả</Text>
            <TouchableOpacity onPress={onToggleView('GRID')} style={tw`mr-20px`}>
              <GridViewSvg fill={viewType === 'GRID' ? tw.color('grayscale-black') : tw.color('grayscale-light')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onToggleView('LIST')}>
              <UnorderedListSvg
                fill={viewType === 'LIST' ? tw.color('grayscale-black') : tw.color('grayscale-light')}
              />
            </TouchableOpacity>
          </View>
        )}
        <FlatList
          key={viewType}
          data={(data?.vehicles?.items || []) as VehicleEntity[]}
          contentContainerStyle={[tw`py-16px justify-between`, viewType === 'GRID' && tw`-m-6px px-4px`]}
          numColumns={viewType === 'GRID' ? 2 : 1}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          ListEmptyComponent={ListEmptyComponent}
          onEndReached={onLoadMore}
          onEndReachedThreshold={0.8}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              colors={[tw.color('primary')!]}
              tintColor={tw.color('primary')}
              onRefresh={onRefresh}
            />
          }
          ListFooterComponent={loading ? <ActivityIndicator /> : null}
        />
      </>
    );
  },
);
