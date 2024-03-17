import { View, Text, ScrollView, ViewStyle, StyleProp } from 'react-native';
import React, { useCallback, useContext } from 'react';
import { Button, Image } from '@rneui/themed';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { showMessage } from 'react-native-flash-message';

import { BackButton, tw } from '../../components';
import { FullScreenLoadingContext, useOverlay } from '../../contexts';
import { AppStackNavigatorParamList, AppStackNavigatorScreenProps } from '../../navigator-params';
import { useRemoveVehicleMutation } from '../../graphql/mutations/removeVehicle.generated';
import { VehiclesDocument } from '../../graphql/queries/vehicles.generated';
import { OperatingUnitEnum } from '../../graphql/type.interface';

const RowItem = React.memo(
  ({
    label,
    value,
    containerStyle,
  }: {
    label?: string;
    value?: string | number | null;
    containerStyle?: StyleProp<ViewStyle>;
  }) => {
    const renderValue = value === undefined || value === null ? '' : value;
    return (
      <View style={[tw`flex-row items-center border border-grayscale-border bg-[#f9f9f9]`, containerStyle]}>
        <View style={tw`flex-1 px-16px py-10px `}>
          <Text style={tw`text-12px text-grayscale-black`}>{label}</Text>
        </View>
        <View style={tw`flex-1 px-16px py-10px bg-white`}>
          <Text style={tw`text-12px text-grayscale-black`}>{renderValue}</Text>
        </View>
      </View>
    );
  },
);

export const VehicleDetail = React.memo(() => {
  const route = useRoute<AppStackNavigatorScreenProps<'vehicle-detail'>['route']>();
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  const inset = useSafeAreaInsets();
  const { showFullscreenLoading } = useContext(FullScreenLoadingContext);
  const { showDialog } = useOverlay();
  const [removeVehicle] = useRemoveVehicleMutation();
  const onEdit = useCallback(() => {
    navigation.navigate('vehicle-create', { vehicle: route.params.item });
  }, [navigation, route]);

  const onDelete = useCallback(async () => {
    try {
      const res = await showDialog({
        type: 'CONFIRM',
        title: `Xóa “${route.params.item.name}”`,
        message: 'Bạn chắc chắn muốn xóa xe này khỏi danh sách xe của bạn?',
      });

      if (res) {
        const response = await removeVehicle({
          variables: { id: route.params.item.id },
          refetchQueries: [VehiclesDocument],
        });

        if (response.errors) {
          showFullscreenLoading(false);
          showMessage({
            message: 'Có lỗi xảy ra',
            type: 'danger',
          });
          return;
        }
        showFullscreenLoading(false);
        navigation.navigate('my-vehicles');
      }
    } catch (error) {
      showFullscreenLoading(false);
      showMessage({
        message: 'Có lỗi xảy ra',
        type: 'danger',
      });
    }
  }, [showDialog, route.params.item.name, route.params.item.id, removeVehicle, showFullscreenLoading, navigation]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView contentContainerStyle={tw`pb-40px`}>
        <Image
          source={{ uri: route.params?.item?.avatar?.fullThumbUrl || undefined }}
          style={tw`w-full h-250px`}
          resizeMode="cover"
        />
        <View style={tw`px-16px pt-16px`}>
          <RowItem label={'Tên xe'} value={route.params.item.name} />
          <RowItem label={'Biển số'} value={route.params.item.vehicleRegistrationPlate} />
          <RowItem label={'Số thứ tự'} value={route.params.item.ordinalNumber} />
          <RowItem label={'Chủng loại máy'} value={route.params.item.vehicleType?.name} />
          <RowItem label={'Hãng sản xuất'} value={route.params.item.manufacturer?.name} />
          <RowItem label={'Model'} value={route.params.item.model?.name} />
          <RowItem label={'Số serial'} value={route.params.item.serialNumber} />
          <RowItem label={'Số VIN'} value={route.params.item.vinNumber} />
          <RowItem label={'Xuất xứ'} value={route.params.item.origin?.name} />
          <RowItem label={'Năm sản xuất'} value={route.params.item.yearOfManufacture} />
          <RowItem
            label={'Số giờ/km đã vận hành'}
            value={`${route.params.item.operatingNumber || ''} ${
              route.params.item.operatingUnit === OperatingUnitEnum.KM ? 'KM' : 'Giờ'
            }`}
          />
          <RowItem label={'Địa điểm đặt máy'} value={route.params.item.mapAddress} />
          <RowItem label={'Chi tiết'} value={route.params.item.detail} />
        </View>
      </ScrollView>
      <View style={tw`flex-row px-16px items-end justify-between py-16px pb-34px`}>
        <Button
          type="outline"
          buttonStyle={tw`border-grayscale-border border-2`}
          containerStyle={tw`w-45%`}
          title={'Xóa'}
          onPress={onDelete}
        />
        <Button containerStyle={tw`w-45%`} title={'Sửa thông tin'} onPress={onEdit} />
      </View>
      <BackButton containerStyle={[tw`absolute bg-black_40 left-16px`, { top: inset.top + 8 }]} />
    </SafeAreaView>
  );
});
