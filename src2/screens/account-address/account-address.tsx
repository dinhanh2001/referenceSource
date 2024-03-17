import { View, Text, Pressable, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { AppHeader, Screen, tw } from '../../components';
import { AddCircle, Location, Trash } from '../../svg';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { AddressEntity } from '../../graphql/type.interface';
import { AddressesDocument, useAddressesQuery } from '../../graphql/queries/addresses.generated';
import { useFullScreenLoading, useOverlay } from '../../contexts';
import { useRemoveAddressMutation } from '../../graphql/mutations/removeAddress.generated';
import { showFlashMessageError } from '../../helpers';

type ItemProps = {
  icon?: React.ReactNode;
  title: string;
  value?: string;
  onPress: () => void;
  onDelete?: () => void;
};

const Item = React.memo(({ icon, title, onPress, value, onDelete }: ItemProps) => {
  return (
    <TouchableOpacity
      style={tw`flex-row items-center p-16px border mx-16px mb-16px border-grayscale-border rounded`}
      onPress={onPress}
    >
      {icon}
      <View style={tw`ml-12px flex-1`}>
        <Text style={tw`text-14px font-semibold`}>{title}</Text>
        {!!value && (
          <Text numberOfLines={1} style={tw`text-13px leading-18px text-grayscale-gray font-normal`}>
            {value}
          </Text>
        )}
      </View>
      {!!value && (
        <Pressable onPress={onDelete}>
          <Trash width={20} height={20} fill={tw.color('grayscale-gray')} />
        </Pressable>
      )}
    </TouchableOpacity>
  );
});

export const AccountAddress = React.memo(
  ({ navigation }: NativeStackScreenProps<AppStackNavigatorParamList, 'account-address'>) => {
    const { data, loading } = useAddressesQuery({
      onError: showFlashMessageError,
    });
    const { showFullscreenLoading } = useFullScreenLoading();
    const [removeAddress, { loading: removeLoading }] = useRemoveAddressMutation({
      onError: showFlashMessageError,
    });
    const { showDialog } = useOverlay();

    const onAddAddress = useCallback(() => {
      navigation.navigate('address-detail', { item: undefined });
    }, [navigation]);

    const onDelete = useCallback(
      (item?: AddressEntity) => async () => {
        const nameAddr = item?.addressName;
        const res = await showDialog({
          title: `Xóa địa chỉ ${nameAddr}`,
          message: 'Bạn chắc chắn muốn xóa địa chỉ này khỏi danh sách địa điểm đã lưu của bạn?',
          type: 'CONFIRM',
        });
        if (res) {
          await removeAddress({
            variables: { id: item?.id },
            refetchQueries: [{ query: AddressesDocument }],
          });
        }
      },
      [showDialog, removeAddress],
    );

    const onEditCustomAddress = useCallback(
      (item: AddressEntity) => () => {
        navigation.navigate('address-detail', { item });
      },
      [navigation],
    );

    useEffect(() => {
      showFullscreenLoading(removeLoading);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [removeLoading]);

    return (
      <Screen>
        <AppHeader title="Địa chỉ" />
        <ScrollView>
          <View style={tw`mt-26px`}>
            {loading ? (
              <ActivityIndicator color={tw.color('bg-primary')} />
            ) : (
              <>
                {data &&
                  (data?.addresses || []).map((item) => (
                    <Item
                      icon={
                        <View style={tw`h-32px w-32px rounded-full bg-primary items-center justify-center`}>
                          <Location fill={tw.color('white')} />
                        </View>
                      }
                      key={item.id}
                      onPress={onEditCustomAddress(item as AddressEntity)}
                      title={`${item.addressName}  ${item.isDefault ? '(mặc định)' : ''}`}
                      value={item?.mapAddress}
                      onDelete={onDelete(item as AddressEntity)}
                    />
                  ))}
                <Item icon={<AddCircle width={32} height={32} />} onPress={onAddAddress} title="Thêm địa chỉ" />
              </>
            )}
          </View>
        </ScrollView>
      </Screen>
    );
  },
);
