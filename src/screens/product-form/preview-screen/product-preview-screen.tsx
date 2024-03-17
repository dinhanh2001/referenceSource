import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image, Text } from '@rneui/themed';
import Constants from 'expo-constants';
import { ImagePickerAsset } from 'expo-image-picker';
import React, { memo, useCallback, useMemo } from 'react';
import { Dimensions, FlatList, ScrollView, TouchableOpacity, View } from 'react-native';

import { Space, StoreSection, tw } from '../../../components';
import { useAuth, useOverlay } from '../../../contexts';
import { FileType, Media, PartnerEntity, ProductTypeEnum } from '../../../graphql/type.interface';
import { thousandSeparator } from '../../../helpers';
import { AppRoutes } from '../../../navigator-params';
import { ArrowLeftSVG, DiamondSVG, EyeSVG, TickGreen } from '../../../svg';
import { FormAccessoryData } from '../add-accessory-screen/type';
import { FormVehicleData } from '../add-vehicle-screen/type';
import { useOptionsPreview, useSaveAccessoryForm, useSaveVehicleForm } from '../hooks';

import { ProductPreviewNavigationProps, ProductPreviewRouteProps, PropsType } from './type';

const { width } = Dimensions.get('window');

export const ProductAddVehiclePreviewScreen: React.FC<PropsType> = memo(() => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<ProductPreviewNavigationProps>();
  const {
    params: { vehicle, accessory, type, id, isView = false },
  } = useRoute<ProductPreviewRouteProps>();

  const isVehicle = useMemo(() => type === ProductTypeEnum.VEHICLE, [type]);

  const onCompleted = useCallback(async () => {
    const res = await showDialog({
      icon: <TickGreen />,
      title: id ? 'Sửa thành công' : 'Thêm mới thành công',
      message: `${isVehicle ? 'Thiết bị' : 'Phụ tùng'} ${
        id ? 'đã được sửa' : 'được thêm mới đã có'
      } trong danh sách Sản phẩm của tôi`,
      type: 'ALERT',
    });

    if (res) {
      navigation.pop(id ? 2 : 3);
    }
  }, [id, isVehicle, navigation, showDialog]);

  const { onSave: onSaveVehicle } = useSaveVehicleForm(onCompleted);
  const { onSave: onSaveAccessory } = useSaveAccessoryForm(onCompleted);

  const { partner } = useAuth();
  const { vehicleTypeOptions, modelOptions, originOptions } = useOptionsPreview();

  const data = useMemo(() => (isVehicle ? vehicle : accessory), [isVehicle, vehicle, accessory]);
  const { partNumber } = accessory || {};
  const { name, avatar, descriptionImageIds, price, serialNumber, originId } = data || {};
  const isNew = useMemo(
    () => (isVehicle ? vehicle?.status?.isNew : accessory?.isNew),
    [isVehicle, vehicle?.status?.isNew, accessory?.isNew],
  );
  const listImages: Media[] = useMemo(
    () =>
      (isView
        ? data?.descriptionImages
        : (descriptionImageIds ?? []).map((i: ImagePickerAsset) => ({
            ...i,
            id: i?.assetId,
            fullOriginalUrl: i?.uri,
            fullThumbUrl: i?.uri,
            type: i.type === 'image' ? FileType.IMAGE : i.type === 'video' ? FileType.VIDEO : i.type,
          }))) || [],
    [data?.descriptionImages, descriptionImageIds, isView],
  );

  const vehicleType = useMemo(
    () => vehicleTypeOptions.find((item) => item.value === vehicle?.vehicleTypeId)?.label,
    [vehicleTypeOptions, vehicle?.vehicleTypeId],
  );
  const model = useMemo(
    () => modelOptions.find((item) => item.value === vehicle?.modelId)?.label,
    [modelOptions, vehicle?.modelId],
  );
  const origin = useMemo(() => originOptions.find((item) => item.value === originId)?.label, [originOptions, originId]);

  const onSave = useCallback(() => {
    if (isVehicle) {
      onSaveVehicle(vehicle as FormVehicleData, id);
    } else {
      onSaveAccessory(accessory as FormAccessoryData, id);
    }
  }, [accessory, id, isVehicle, onSaveAccessory, onSaveVehicle, vehicle]);

  return (
    <View style={tw`flex-1`}>
      <ScrollView scrollIndicatorInsets={{ right: 1 }}>
        <View style={tw`bg-white`}>
          <Image source={{ uri: avatar?.uri || avatar?.fullThumbUrl }} style={tw`w-${width}px h-${width}px`} />
          <FlatList
            horizontal
            keyExtractor={(item: Media, index: number) => `${item?.id}-${index}`}
            contentContainerStyle={tw`px-12px `}
            data={listImages}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(AppRoutes.MEDIA_LIST_VIEW_SCREEN, {
                    listImage: listImages,
                    index,
                  });
                }}
                style={tw`mx-4px`}
              >
                <Image source={{ uri: item?.fullThumbUrl as string }} style={tw`w-56px h-56px rounded-2 mt-3`} />
              </TouchableOpacity>
            )}
            showsHorizontalScrollIndicator={false}
          />
          <Space size={20} />
        </View>

        <View style={tw`px-16px`}>
          <View style={tw`flex-row`}>
            {isNew ? (
              <View style={tw`bg-blue rounded-full px-6px py-2px`}>
                <Text style={tw`text-9px text-white`}>Mới</Text>
              </View>
            ) : (
              <View style={tw`bg-grayscale-gray rounded-full px-6px py-2px`}>
                <Text style={tw`text-9px text-white`}>Qua sử dụng</Text>
              </View>
            )}
          </View>
          <Space size={4} />
          <View style={tw`flex-row`}>
            <Text style={tw`flex-1 text-17px font-semibold`}>{name}</Text>
          </View>
          <Space size={12} />
          <View style={tw`flex-row`}>
            <Text style={tw`text-13px text-grayscale-gray`}>0 đánh giá</Text>
            <Text style={tw`mx-8px text-grayscale-gray`}>•</Text>
            <Text style={tw`text-13px text-grayscale-gray`}>0 đơn hàng</Text>
          </View>
          <Space size={20} />
          <Text style={tw`text-17px font-semibold`}>
            {price?.isFixedCost ? `${thousandSeparator(price?.unitPrice || '')} đ` : 'Thương lượng'}
          </Text>
          <Space size={20} />
          <Space backgroundColor={tw.color('grayscale-border')} size={1} />
          <View style={tw`flex-row items-center py-16px`}>
            <DiamondSVG />
            <Space horizontal />
            <View style={tw`flex-1 `}>
              <Text style={tw`text-12px text-grayscale-gray`}>Khuyến mãi</Text>
              <Text style={tw`text-13px font-semibold`}>Miễn phí công vận chuyển, bảo dưỡng</Text>
            </View>
            {/* <ArrowRightSVG /> */}
          </View>
          <Space backgroundColor={tw.color('grayscale-border')} size={1} />
          <View style={tw`py-16px`}>
            <View style={tw`flex-row items-center mb-12px`}>
              <View style={tw`flex-1 `}>
                <Text style={tw`text-17px font-semibold`}>Thông tin sản phẩm</Text>
              </View>
              {/* <ArrowRightSVG /> */}
            </View>
            <Text style={tw`text-grayscale-gray text-13px`}>
              {isVehicle ? 'Chủng loại máy' : 'Ký hiệu/Model'}:{' '}
              <Text style={tw`text-13px`}>{(isVehicle ? vehicleType : serialNumber) || ''}</Text>
            </Text>
            <Text style={tw`text-grayscale-gray text-13px my-8px`}>
              {isVehicle ? 'Model' : 'Serial/Part-number'}:{' '}
              <Text style={tw`text-13px`}>{(isVehicle ? model : partNumber) || ''}</Text>
            </Text>
            <Text style={tw`text-grayscale-gray text-13px`}>
              {isVehicle ? 'Số serial' : 'Xuất xứ'}:{' '}
              <Text style={tw`text-13px`}>{(isVehicle ? serialNumber : origin) || ''}</Text>
            </Text>
          </View>
          <Space backgroundColor={tw.color('grayscale-border')} size={1} />
          <View style={tw`py-16px`}>
            <View style={tw`flex-row items-center mb-12px`}>
              <View style={tw`flex-1 `}>
                <Text style={tw`text-17px font-semibold`}>Thông tin gian hàng</Text>
              </View>
              {/* <ArrowRightSVG /> */}
            </View>
            <Space size={12} />
            <StoreSection store={partner as PartnerEntity} />
          </View>
          {!isView && <Button onPress={onSave}>Lưu</Button>}
          <Space size={40} />
        </View>
      </ScrollView>
      <View
        style={tw`mt-${Constants.statusBarHeight}px bg-white80 flex-row items-center h-40px absolute top-0 left-0 right-0`}
      >
        <TouchableOpacity onPress={() => navigation.goBack()} style={tw`z-999`}>
          <ArrowLeftSVG style={tw`ml-18px`} fill={tw.color('black')} />
        </TouchableOpacity>
        {isView ? (
          <View style={tw`flex-row absolute justify-center items-center left-0 right-0`}>
            <Text style={tw`text-12px`}>{data?.name}</Text>
          </View>
        ) : (
          <View style={tw`flex-row absolute justify-center items-center left-0 right-0`}>
            <EyeSVG />
            <Space horizontal size={10} />
            <Text style={tw`text-12px`}>Bản xem trước</Text>
          </View>
        )}
      </View>
    </View>
  );
});
