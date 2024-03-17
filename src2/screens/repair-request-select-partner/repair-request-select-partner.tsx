import React, { memo, useCallback, useMemo, useState } from 'react';
import { FlatList, ListRenderItemInfo, RefreshControl, TouchableOpacity, View } from 'react-native';
import { Button, Divider, Text } from '@rneui/themed';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import deepmerge from 'deepmerge';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ActivityIndicator, AppHeader, ChipButton, PartnerCard, Screen, SearchInputHeader, tw } from '../../components';
import { CloseSvg, EmptyMapSVG, FilterSVG, SearchNormalSvg } from '../../svg';
import {
  PartnersForBookingQueryVariables,
  usePartnersForBookingQuery,
} from '../../graphql/queries/partnersForBooking.generated';
import { PartnerEntity, StatusEnum } from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { hitSlop, showFlashMessageError } from '../../helpers';
import { useDebounce } from '../../hooks';

import { AgentFilterModal } from './components';

const LIMIT = 1000000;

export const RepairRequestSelectPartnerScreen = memo(() => {
  const { params } = useRoute<RouteProp<AppStackNavigatorParamList, 'repair-request/select-partner'>>();
  const navigation = useNavigation<StackNavigationProp<AppStackNavigatorParamList>>();

  const defaultQuery = useMemo(
    () => ({
      latitude: params.address.lat,
      longitude: params.address.lng,
      isActive: StatusEnum.ACTIVE,
    }),
    [params.address.lat, params.address.lng],
  );

  const initialQuery: PartnersForBookingQueryVariables = useMemo(
    () => ({
      page: 1,
      limit: LIMIT,
      ...defaultQuery,
    }),
    [defaultQuery],
  );

  const [showSearchInput, setShowSearchInput] = useState(false);

  const [query, setQuery] = useState<
    PartnersForBookingQueryVariables & {
      settingDescription?: string;
    }
  >(initialQuery);

  const debounceQuery = useDebounce(query);

  const { loading, refetch, data, fetchMore } = usePartnersForBookingQuery({
    variables: { ...debounceQuery, ...defaultQuery },
    onError: showFlashMessageError,
  });

  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const onEndReachedLoadMore = useCallback(async () => {
    if (!data?.partnersForBooking?.meta) return;

    const { currentPage, totalPages } = data.partnersForBooking.meta;

    if (currentPage < totalPages && !loading) {
      await fetchMore({
        variables: {
          ...query,
          limit: LIMIT,
          page: currentPage + 1,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult.partnersForBooking) return prev;

          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, loading, query]);

  const handleFilterApply = (draft: PartnersForBookingQueryVariables) => {
    if (
      draft.sortBy === query.sortBy &&
      draft.isAgency === query.isAgency &&
      draft.isTechnician === query.isTechnician
    ) {
      return;
    }

    draft.page = 1;
    setQuery(draft);
  };

  const handleSelectPartner = useCallback(
    (partner: PartnerEntity) => {
      navigation.navigate('repair-request/select-partner/partner-detail', {
        ...params,
        partner,
        expense: partner.expenseInfo ?? undefined,
      });
    },
    [navigation, params],
  );

  const _renderItem = ({ item }: ListRenderItemInfo<PartnerEntity>) => {
    return (
      <TouchableOpacity style={tw`px-4 pt-4`} onPress={() => handleSelectPartner(item)}>
        <PartnerCard partner={item} />
      </TouchableOpacity>
    );
  };

  const ListEmptyComponent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator style={tw`py-20px`} />;
    }

    return () => (
      <View style={tw`flex flex-col items-center`}>
        <EmptyMapSVG />
        <Text style={tw`text-grayscale-gray`}>Không tìm thấy đơn vị sửa chữa nào</Text>
        <Button containerStyle={tw`mt-4`} titleStyle={tw`px-6`} title="Làm mới" onPress={() => refetch(query)} />
      </View>
    );
  }, [loading, query, refetch]);

  const onTapLeftIconSearchInput = useCallback(() => {
    setShowSearchInput(false);
  }, []);

  const onTapSearchIcon = useCallback(() => {
    setShowSearchInput(true);
  }, []);

  const handleSearchTextChange = useCallback((search: string) => {
    setQuery((old) => ({
      ...old,
      page: 1,
      search,
    }));
  }, []);

  const handleRefresh = useCallback(() => {
    refetch({
      ...query,
      page: 1,
    });
  }, [query, refetch]);

  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[tw`flex-1`, { paddingBottom: bottom }]}>
      <AgentFilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setIsFilterModalVisible(false)}
        onFilterApplied={handleFilterApply}
        query={query}
      />
      <Screen edges={['top']}>
        <View>
          {showSearchInput ? (
            <SearchInputHeader
              placeholder="Tìm kiếm..."
              value={query.search ?? undefined}
              onTapLeftIcon={onTapLeftIconSearchInput}
              onChangeText={handleSearchTextChange}
            />
          ) : (
            <AppHeader
              leftIcon={<CloseSvg width={24} height={24} />}
              title="Tên đơn vị sửa chữa"
              rightView={
                <TouchableOpacity onPress={onTapSearchIcon} hitSlop={hitSlop(4)} activeOpacity={0.5}>
                  <SearchNormalSvg />
                </TouchableOpacity>
              }
            />
          )}
        </View>

        <View style={tw`flex flex-row gap-2 py-2 px-4 flex-wrap`}>
          <ChipButton
            onPress={() => setIsFilterModalVisible(true)}
            text={query.settingDescription ?? 'Lọc theo'}
            leftIcon={<FilterSVG width={16} height={16} />}
            style={query.settingDescription != null && tw`bg-primary-light`}
          />
        </View>
        <Divider style={tw`h-4px bg-grayscale-border`} />
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={data != null && loading}
              // refreshing={refreshing}
              colors={[tw.color('primary')!]}
              tintColor={tw.color('primary')}
              onRefresh={handleRefresh}
            />
          }
          keyExtractor={(item) => item?.id}
          style={tw`flex-1`}
          contentContainerStyle={tw`pb-4`}
          data={data?.partnersForBooking?.items as PartnerEntity[]}
          renderItem={_renderItem}
          ItemSeparatorComponent={() => <Divider style={tw`bg-grayscale-bg h-[1px] mt-4`} />}
          onEndReachedThreshold={0.8}
          onEndReached={onEndReachedLoadMore}
          ListEmptyComponent={ListEmptyComponent}
        />
      </Screen>
    </View>
  );
});
