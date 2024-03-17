import { View, Text, TouchableOpacity } from 'react-native';
import React, { useCallback, useMemo } from 'react';
import { Button, Image } from '@rneui/themed';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Space, tw } from '../../../components';
import { showFlashMessageError, thousandSeparator } from '../../../helpers';
import { useOverlay } from '../../../contexts';
import { ProductEntity, ProductTypeEnum } from '../../../graphql/type.interface';
import { usePartnerRemoveProductMutation } from '../../../graphql/mutations/partnerRemoveProduct.generated';
import { usePartnerUpdateProductStatusMutation } from '../../../graphql/mutations/partnerUpdateProductStatus.generated';
import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { FormAccessoryData, ProductDeviceType } from '../add-accessory-screen/type';
import { FormVehicleData } from '../add-vehicle-screen/type';

type Props = {
  item: ProductEntity;
  refetch: () => void;
};

export const ProductItem = ({ item, refetch }: Props) => {
  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const [removeProduct, { loading: removeLoading }] = usePartnerRemoveProductMutation();
  const [hideProduct, { loading: hideLoading }] = usePartnerUpdateProductStatusMutation();

  const { showDialog } = useOverlay();
  const { id, name, isNew, avatar, isFixedCost, unitPrice, quantity } = item || {};

  const renderStatus = useMemo(() => {
    const bg = isNew ? 'blue' : 'grayscale-gray';

    return (
      <View style={tw`bg-${bg} m-4px py-2px px-6px rounded-9999`}>
        <Text style={tw`text-white text-9px`}>{isNew ? 'Mới' : 'Qua sử dụng'}</Text>
      </View>
    );
  }, [isNew]);

  const onHide = useCallback(async () => {
    const res = await showDialog({
      title: `Ẩn sản phẩm “${name}”`,
      message: 'Bạn chắc chắn muốn ẩn sản phẩm này khỏi danh sách sản phẩm đang bán của bạn?',
      type: 'CONFIRM',
      confirmText: 'Ẩn',
    });

    if (res) {
      hideProduct({
        variables: {
          input: {
            id,
            isActive: false,
          },
        },
        onError: showFlashMessageError,
        onCompleted: () => {
          refetch();
        },
      });
    }
  }, [hideProduct, id, name, refetch, showDialog]);

  const onRemove = useCallback(async () => {
    const res = await showDialog({
      title: `Xoá sản phẩm “${name}”`,
      message: 'Sau khi xoá bạn không thể khôi phục sản phẩm',
      type: 'CONFIRM',
      confirmText: 'Xoá',
    });

    if (res) {
      removeProduct({
        variables: { id },
        onError: showFlashMessageError,
        onCompleted: () => {
          refetch();
        },
      });
    }
  }, [id, name, refetch, removeProduct, showDialog]);

  const onEdit = useCallback(() => {
    const route =
      item?.type === ProductTypeEnum.ACCESSARY
        ? AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN
        : AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN;
    navigation.navigate(route, { data: item });
  }, [item, navigation]);

  const onPreview = useCallback(() => {
    if (item?.type === ProductTypeEnum.ACCESSARY) {
      navigation.navigate(AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW, {
        type: ProductTypeEnum.ACCESSARY,
        accessory: {
          ...item,
          quantity: item?.quantity.toString(),
          partId: item?.partOfProduct?.id,
          price: {
            isFixedCost: item?.isFixedCost,
            unitPrice: item?.unitPrice.toString(),
          },
          originId: item?.origin?.id,
          productUnitId: item?.productUnit?.id,
          productDevices: (item?.productDevices ?? []).map((p) => ({
            modelId: p?.model?.id,
            manufacturerId: p?.manufacturer?.id,
            vehicleTypeId: p?.vehicleType?.id,
          })) as ProductDeviceType[],
        } as FormAccessoryData,
        isView: true,
        id: item?.id,
      });
    }
    if (item?.type === ProductTypeEnum.VEHICLE) {
      navigation.navigate(AppRoutes.PRODUCT_VEHICLE_ACCESSORY_PREVIEW, {
        vehicle: {
          ...item,
          quantity: item?.quantity.toString(),
          vehicleTypeId: item?.productType?.id,
          manufacturerId: item?.manufacturer?.id,
          modelId: item?.model?.id,
          status: {
            isNew: item?.isNew,
            operatingNumber: item?.operatingNumber,
            operatingUnit: item?.operatingUnit,
          },
          price: {
            isFixedCost: item?.isFixedCost,
            unitPrice: item?.unitPrice.toString(),
          },
          productUnitId: item?.productUnit?.id,
        } as FormVehicleData,
        isView: true,
        type: ProductTypeEnum.VEHICLE,
        id: item?.id,
      });
    }
  }, [item, navigation]);

  return (
    <View style={tw`px-16px py-20px`}>
      <TouchableOpacity style={tw`flex-row mb-16px`} onPress={onPreview}>
        <View>
          <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`w-80px h-80px rounded-4px`} />
          <View style={tw`absolute`}>{renderStatus}</View>
        </View>
        <View style={tw`flex-1 ml-12px`}>
          <Text style={tw`text-13px text-grayscale-black`} numberOfLines={2}>
            {name}
          </Text>
          <Text style={tw`font-semibold mt-8px text-grayscale-black`}>
            {isFixedCost ? `${thousandSeparator(unitPrice)} đ` : 'Thương lượng'}
          </Text>
        </View>
      </TouchableOpacity>
      <Space size={1} backgroundColor={tw.color('grayscale-border')} />
      <View style={tw`flex-row my-8px`}>
        <RowCount label="Kho hàng" value={quantity} />
        <RowCount label="Đã bán" value={0} />
      </View>
      <Space size={1} backgroundColor={tw.color('grayscale-border')} />
      <View style={tw`flex-row my-16px`}>
        <View style={tw`flex-1`}>
          <Button
            title={'Ẩn'}
            type="outline"
            titleStyle={tw`text-grayscale-black`}
            buttonStyle={tw`border-grayscale-disabled`}
            onPress={onHide}
            loading={hideLoading}
          />
        </View>
        <View style={tw`flex-1 mx-12px`}>
          <Button
            title={'Xóa'}
            type="outline"
            titleStyle={tw`text-error`}
            buttonStyle={tw`border-error`}
            onPress={onRemove}
            loading={removeLoading}
          />
        </View>
        <View style={tw`flex-1`}>
          <Button title={'Sửa'} onPress={onEdit} />
        </View>
      </View>
      <Space size={6} backgroundColor={tw.color('grayscale-border')} style={tw`-mx-16px`} />
    </View>
  );
};

type RowCountProps = {
  label: string;
  value: number;
};

const RowCount = ({ label, value }: RowCountProps) => {
  return (
    <View style={tw`flex-1 flex-row items-center`}>
      <Text style={tw`text-13px text-grayscale-gray mr-8px`}>{label}</Text>
      <Text style={tw`text-13px text-grayscale-black font-semibold mr-8px`}>{value}</Text>
    </View>
  );
};
