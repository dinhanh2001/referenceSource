/* eslint-disable react-native/no-color-literals */
import { Button, Text } from '@rneui/themed';
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, RefreshControl, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import deepmerge from 'deepmerge';
import { CompositeNavigationProp, NavigationProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { showMessage } from 'react-native-flash-message';

import { ActivityIndicator, Space, TechnicianItem, tw } from '../../components';
import { AppRoutes, AppStackNavigatorParamList, RootNavigatorParamList } from '../../navigator-params';
import { EmptyTechnician } from '../../svg';
import { useAgencyGetTechniciansQuery } from '../../graphql/queries/agencyGetTechnicians.generated';
import { getQualification } from '../../utils';
import { useAgencyDeleteTechnicianMutation } from '../../graphql/mutations/agencyDeleteTechnician.generated';
import { useFullScreenLoading } from '../../contexts';
import { ReviewSummary } from '../../graphql/type.interface';

import { PropsType } from './type';

const filters = {
  page: 1,
  litmit: 15,
  filter: null,
};

export const TechnicianListScreen: React.FC<PropsType> = memo(({ navigation }: PropsType) => {
  const navigateToDetail = (id: string) => {
    navigation.navigate(AppRoutes.TECHNICIAN_DETAIL_SCREEN, { id: id });
  };
  const navigateToCreate = useCallback(() => {
    navigation.navigate(AppRoutes.TECHNICIAN_INFORMATION_SCREEN, {});
  }, [navigation]);
  const currentPage = useRef(1);
  const [refreshing, setRefreshing] = useState(false);

  const { showFullscreenLoading } = useFullScreenLoading();

  const { data, loading, refetch, fetchMore } = useAgencyGetTechniciansQuery({
    variables: filters,
    onCompleted(res) {
      currentPage.current = res.agencyGetTechnicians.meta.currentPage;
    },
  });

  const [removeTechnicianApi, { loading: removing }] = useAgencyDeleteTechnicianMutation({
    onError(err) {
      refetch();
      showMessage({
        type: 'danger',
        message: 'Xóa KTV thất bại!',
        description: err?.message,
      });
    },
    onCompleted() {
      refetch();
      showMessage({
        type: 'success',
        message: 'Xóa KTV thành công',
      });
    },
  });

  const technicians = useMemo(() => data?.agencyGetTechnicians.items || [], [data]);

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
    if (data && currentPage.current < data?.agencyGetTechnicians.meta.totalPages && !loading && !refreshing) {
      const newPage = (currentPage.current += 1);

      fetchMore({
        variables: {
          litmit: 10,
          page: newPage,
        },
        updateQuery: (prev: any, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev;
          return deepmerge(prev, fetchMoreResult);
        },
      });
    }
  }, [data, fetchMore, loading, refreshing]);

  const handleRemoveAgency = useCallback(
    (id: string) => {
      removeTechnicianApi({
        variables: { input: { id } },
      });
    },
    [removeTechnicianApi],
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`font-semibold text-17px`}>Kĩ thuật viên</Text>
        </View>
      ),
      headerRight: () => {
        return !data ? null : (
          <Pressable onPress={navigateToCreate}>
            <Text style={tw`text-primary font-semibold mr-16px`}>Thêm mới</Text>
          </Pressable>
        );
      },
      headerTitleAlign: 'left',
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
    });
  }, [navigation, data, navigateToCreate]);

  useEffect(() => {
    showFullscreenLoading(removing);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removing]);

  useFocusEffect(
    useCallback(() => {
      currentPage.current = 1;
      refetch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  if (loading)
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator />
      </View>
    );
  return (
    <View style={tw`flex-1 mx-16px`}>
      <SwipeListView
        data={technicians}
        style={tw`flex-1`}
        renderItem={({ item }) => {
          const { fullname, phone, qualifications, id } = item;
          const jobTitle = getQualification(qualifications);
          return (
            <SwipeRow rightOpenValue={-75}>
              <View style={styles.rowBack}>
                <TouchableOpacity
                  style={[styles.backRightBtn, styles.backRightBtnRight]}
                  onPress={() => handleRemoveAgency(id)}
                >
                  <Text style={styles.backTextWhite}>Xóa</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.rowFront}>
                <TechnicianItem
                  fullThumUrl={item?.avatar ? (item.avatar.fullThumbUrl as string) : ''}
                  name={fullname || ''}
                  phoneNumber={phone}
                  onPress={() => navigateToDetail(item.id)}
                  jobTitle={jobTitle}
                  reviewSummary={item?.reviewSummary as ReviewSummary}
                />
              </TouchableOpacity>
            </SwipeRow>
          );
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            colors={[tw.color('primary')!]}
            tintColor={tw.color('primary')}
            onRefresh={onRefresh}
          />
        }
        keyExtractor={(item) => item.id}
        onEndReachedThreshold={0.3}
        onEndReached={onLoadMore}
        ItemSeparatorComponent={() => <Space size={14} />}
        ListEmptyComponent={<ListEmptyComponent />}
      />
    </View>
  );
});

const ListEmptyComponent = memo(() => {
  const navigation =
    useNavigation<
      CompositeNavigationProp<NavigationProp<AppStackNavigatorParamList>, NavigationProp<RootNavigatorParamList>>
    >();

  const hanldeNavigate = () => {
    navigation.navigate(AppRoutes.TECHNICIAN_INFORMATION_SCREEN, { id: undefined });
  };
  return (
    <View style={tw`flex-1 justify-center items-center`}>
      <EmptyTechnician />
      <Button style={tw`px-12px`} titleStyle={tw`font-semibold text-13px leading-18px`} onPress={hanldeNavigate}>
        Thêm mới
      </Button>
    </View>
  );
});

const styles = StyleSheet.create({
  backRightBtn: {
    alignItems: 'center',
    borderRadius: 4,
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
  },
});
