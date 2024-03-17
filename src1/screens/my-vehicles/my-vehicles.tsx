import { View, Text, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import { Button } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';

import { AppHeader, InfinityMyVehicleList, Screen, tw } from '../../components';
import { EmptyListSvg } from '../../svg';
import { UseAppStackNavigatorScreenProps } from '../../navigator-params';

export const MyVehicles = React.memo(() => {
  const navigation = useNavigation<UseAppStackNavigatorScreenProps<'my-vehicles'>>();

  const addNewButton = useMemo(() => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('vehicle-create');
        }}
      >
        <Text style={tw`text-14px font-semibold text-primary`}>+ Thêm mới</Text>
      </TouchableOpacity>
    );
  }, [navigation]);

  const ListEmptyComponent = useMemo(() => {
    return (
      <View style={tw`flex-1 items-center`}>
        <EmptyListSvg />
        <Text style={tw`text-14px text-grayscale-gray`}>Bạn chưa có xe nào</Text>
        <Button
          onPress={() => {
            navigation.navigate('vehicle-create');
          }}
          title={'Thêm xe'}
          style={tw`w-130px mt-16px`}
        />
      </View>
    );
  }, [navigation]);

  return (
    <Screen>
      <AppHeader title="Xe của tôi" rightView={addNewButton} />
      <InfinityMyVehicleList
        hideCheckbox
        EmptyComponent={ListEmptyComponent}
        onVehiclePress={(item) => navigation.navigate('vehicle-detail', { item })}
      />
    </Screen>
  );
});
