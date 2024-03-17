import { useNavigation } from '@react-navigation/native';
import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Screen } from 'react-native-screens';

import { tw } from '../../components';
import { AppRoutes } from '../../navigator-params';
import { AddCircleSVG } from '../../svg';

import { AccountAddressScreenNavigationProps } from './type';

export const AccountAddress = memo(() => {
  const navigation = useNavigation<AccountAddressScreenNavigationProps>();
  return (
    <Screen>
      <TouchableOpacity
        onPress={() => navigation.navigate(AppRoutes.ACCOUNT_ADDRESS_DETAIL, { item: null, title: 'Thêm địa chỉ' })}
        style={tw`border rounded border-grayscale-border m-16px`}
      >
        <View style={tw`flex-row items-center p-16px`}>
          <AddCircleSVG />
          <View style={tw`pl-12px`}>
            <Text style={tw`font-bold text-14px leading-20px text-grayscale-black`}>Thêm địa chỉ</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Screen>
  );
});
