import { zodResolver } from '@hookform/resolvers/zod';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { tw } from '../../../components';
import { AppRoutes, AppStackNavigatorParamList } from '../../../navigator-params';
import { ProductDeviceType } from '../add-accessory-screen/type';
import { CategoryInput } from '../components';
import { useOptionsProductDevices, useSchemaAccessory } from '../hooks';

type ScreenRouteProp = RouteProp<AppStackNavigatorParamList, AppRoutes.PART_SELECT_SCREEN>;
type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const PartSelectScreen = () => {
  const {
    params: { onChange },
  } = useRoute<ScreenRouteProp>();
  const navigation = useNavigation<ScreenNavigationProp>();

  const { productDeviceSchema } = useSchemaAccessory();

  const { vehicleTypeOptions, manufacturerOptions, modelOptions } = useOptionsProductDevices();

  const { control, handleSubmit, watch } = useForm<ProductDeviceType>({
    resolver: zodResolver(productDeviceSchema),
    mode: 'onChange',
    defaultValues: {},
  });

  const vehicleTypeId = watch('vehicleTypeId');
  const manufacturerId = watch('manufacturerId');
  const modelId = watch('modelId');

  const disabledButton = useMemo(() => {
    return !vehicleTypeId || !manufacturerId || !modelId;
  }, [manufacturerId, modelId, vehicleTypeId]);

  const onSubmit = (values: ProductDeviceType) => {
    onChange(values);
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1`}>
      <ScrollView>
        <View style={tw`m-16px`}>
          <CategoryInput<ProductDeviceType>
            name={'vehicleTypeId'}
            control={control}
            data={vehicleTypeOptions}
            placeholder={'Chọn chủng loại máy'}
            title="Chủng loại máy"
          />

          <CategoryInput<ProductDeviceType>
            name={'manufacturerId'}
            control={control}
            data={manufacturerOptions}
            placeholder={'Chọn hãng sản xuất'}
            title="Hãng sản xuất"
          />

          <CategoryInput<ProductDeviceType>
            name={'modelId'}
            control={control}
            data={modelOptions}
            placeholder={'Chọn model'}
            title="Model"
          />
        </View>
      </ScrollView>
      <Button
        title={'Xác nhận'}
        disabled={disabledButton}
        containerStyle={tw`m-16px`}
        onPress={handleSubmit(onSubmit)}
      />
    </SafeAreaView>
  );
};
