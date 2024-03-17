import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ListRenderItemInfo, RefreshControl, Text, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AppHeader, ECommerceCartAddressItem, tw } from '../../../components';
import { useFullScreenLoading, useOverlay } from '../../../contexts';
import { useRemoveAddressMutation } from '../../../graphql/mutations/removeAddress.generated';
import { AddressesDocument, useAddressesQuery } from '../../../graphql/queries/addresses.generated';
import { AddressEntity } from '../../../graphql/type.interface';
import { showFlashMessageError } from '../../../helpers';
import { useRefreshByUser } from '../../../hooks';
import { AddCircle } from '../../../svg';

import { ECommerceCartAddressRouteProps, ECommerceCartNavigationProp } from './type';

export const ECommerceCartAddress = () => {
  const {
    params: { address, onSelectAddress },
  } = useRoute<ECommerceCartAddressRouteProps>();
  const navigation = useNavigation<ECommerceCartNavigationProp>();
  const [current, setCurrent] = useState<AddressEntity>(address as AddressEntity);

  const { data, refetch } = useAddressesQuery();
  const { showFullscreenLoading } = useFullScreenLoading();
  const [removeAddress, { loading: removeLoading }] = useRemoveAddressMutation({
    onError: showFlashMessageError,
  });
  const { showDialog } = useOverlay();
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  useEffect(() => {
    showFullscreenLoading(removeLoading);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [removeLoading]);

  const onAddAddress = useCallback(() => {
    navigation.navigate('address-detail', { item: undefined });
  }, [navigation]);

  const onDelete = useCallback(
    async (item?: AddressEntity) => {
      if (address?.id !== item?.id) {
        const nameAddr = item?.addressName;
        const res = await showDialog({
          title: `Xóa địa chỉ ${nameAddr}`,
          message: 'Bạn chắc chắn muốn xóa địa chỉ này khỏi danh sách địa điểm đã lưu của bạn?',
          type: 'CONFIRM',
        });
        if (res) {
          if (current?.id === item?.id) {
            setCurrent(address as AddressEntity);
          }
          await removeAddress({
            variables: { id: item?.id },
            refetchQueries: [{ query: AddressesDocument }],
          });
        }
      }
    },
    [address, showDialog, current?.id, removeAddress],
  );

  const onSubmit = useCallback(() => {
    onSelectAddress?.(current);
    navigation.goBack();
  }, [current, navigation, onSelectAddress]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<AddressEntity>) => (
      <ECommerceCartAddressItem
        containerStyle={tw`mb-3`}
        onPress={setCurrent}
        selected={current?.id === item?.id}
        item={item}
        onDelete={onDelete}
      />
    ),
    [current, onDelete],
  );

  const renderFooter = useMemo(
    () => (
      <TouchableOpacity style={tw`p-4 border border-[#EEE] rounded-1 flex-row items-center`} onPress={onAddAddress}>
        <AddCircle />
        <Text style={tw`font-semibold text-grayscale-black ml-3`}>Thêm địa chỉ</Text>
      </TouchableOpacity>
    ),
    [onAddAddress],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title="Địa chỉ nhận hàng" />

      <FlatList
        data={data?.addresses as AddressEntity[]}
        renderItem={renderItem}
        ListFooterComponent={renderFooter}
        contentContainerStyle={tw`p-4`}
        refreshControl={<RefreshControl onRefresh={refetchByUser} refreshing={isRefetchingByUser} />}
      />
      <Button disabled={!current} title={'Xác nhận'} containerStyle={tw`pt-2 px-4 pb-4`} onPress={onSubmit} />
    </SafeAreaView>
  );
};
