import { Text } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { Pressable, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Space, tw } from '../../../components';
import { CalqueSVG, TruckingSVG } from '../../../svg';
import { AppRoutes } from '../../../navigator-params';

import { ProductAddScreenNavigationProps, PropsType } from './type';

export const ProductAddScreen: React.FC<PropsType> = memo(() => {
  const navigation = useNavigation<ProductAddScreenNavigationProps>();
  const navigateAddDevice = useCallback(() => {
    navigation.navigate(AppRoutes.PRODUCT_ADD_VEHICLE_SCREEN, {});
  }, [navigation]);
  const navigateAddSparePart = useCallback(() => {
    navigation.navigate(AppRoutes.PRODUCT_ADD_ACCESSORY_SCREEN, {});
  }, [navigation]);

  return (
    <View style={tw`flex-1 items-center mt-35px px-16px`}>
      <View style={tw`flex-row`}>
        <Pressable
          style={tw`border border-grayscale-border justify-center items-center flex-1 py-20px`}
          onPress={navigateAddDevice}
        >
          <TruckingSVG />
          <Space size={12} />
          <Text>Thiết bị</Text>
        </Pressable>
        <Space horizontal />
        <Pressable
          style={tw`border border-grayscale-border justify-center items-center flex-1 py-20px`}
          onPress={navigateAddSparePart}
        >
          <CalqueSVG />
          <Space size={12} />
          <Text>Phụ tùng</Text>
        </Pressable>
      </View>
    </View>
  );
});
