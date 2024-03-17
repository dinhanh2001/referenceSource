import { useNavigation, useRoute } from '@react-navigation/native';
import { Button, Image } from '@rneui/themed';
import React, { useCallback } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Controller, useForm } from 'react-hook-form';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppHeader, ECommerceCartCountInput, TextArea, tw } from '../../../components';
import { useUserProductQuery } from '../../../graphql/queries/userProduct.generated';
import { CloseSvg, Sent } from '../../../svg';
import { useOverlay } from '../../../contexts';
import { useUserCreateProductQuotationMutation } from '../../../graphql/mutations/userCreateProductQuotation.generated';

import {
  ECommercePriceRequestFormQuotationRouteProp,
  ECommercePriceRequestFormNavigationProp,
  FormQuotation,
} from './type';

export const ECommerceFormQuotation = () => {
  const {
    params: { productId },
  } = useRoute<ECommercePriceRequestFormQuotationRouteProp>();
  const { showDialog } = useOverlay();
  const navigation = useNavigation<ECommercePriceRequestFormNavigationProp>();

  const [createQuotation, { loading }] = useUserCreateProductQuotationMutation({
    onCompleted: async () => {
      const res = await showDialog({
        icon: <Sent />,
        message: <View />,
        title: (
          <Text style={tw`text-center font-semibold text-17px text-grayscale-black`}>
            Gửi yêu cầu báo giá thành công
          </Text>
        ),
        type: 'CONFIRM',
        columnAction: true,
        cancelText: 'Yêu cầu báo giá của tôi',
        confirmText: 'Tiếp tục mua sắm',
      });

      if (res) {
        navigation.pop(2);
      } else {
        navigation.navigate('e-commerce/price-request');
      }
    },
  });

  const { control, watch, setValue, handleSubmit } = useForm<FormQuotation>({
    defaultValues: {
      count: 0,
      question: '',
    },
  });

  const countWatch = watch('count');
  const questionWatch = watch('question');

  const { data } = useUserProductQuery({
    variables: {
      id: productId,
    },
  });
  const { avatar, name } = data?.userProduct || {};

  const onReset = useCallback(() => {
    setValue('count', 0);
    setValue('question', '');
  }, [setValue]);

  const onSubmit = useCallback(
    (form: FormQuotation) => {
      createQuotation({
        variables: {
          input: {
            productId,
            detail: form.question?.trim?.(),
            quantity: form.count,
          },
        },
      });
    },
    [createQuotation, productId],
  );

  return (
    <SafeAreaView style={tw`flex-1`}>
      <AppHeader title="Yêu cầu báo giá" leftIcon={<CloseSvg width={24} height={24} />} />
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <View style={tw`p-4`}>
          <View style={tw`flex-row`}>
            <Image source={{ uri: avatar?.fullThumbUrl as string }} style={tw`w-14 h-14 rounded-2px`} />
            <View style={tw`flex-1 ml-3 gap-2`}>
              <Text style={tw`text-13px text-grayscale-gray`}>{name}</Text>
              <Text style={tw`text-grayscale-black font-semibold`}>Thương lượng</Text>
            </View>
          </View>

          <View style={tw`flex-row justify-end mt-4 items-center gap-2`}>
            <Text style={tw`text-13px text-grayscale-gray`}>Số lượng</Text>
            <Controller
              name={'count'}
              control={control}
              render={({ field: { onChange, value } }) => (
                <ECommerceCartCountInput
                  value={value}
                  onMinus={() => {
                    if (value > 0) onChange(value - 1);
                  }}
                  onPlus={() => {
                    onChange(value + 1);
                  }}
                />
              )}
            />
          </View>

          <View style={tw`mt-8 `}>
            <Controller
              name={'question'}
              control={control}
              render={({ field: { onChange, value, onBlur } }) => (
                <View>
                  <TextArea
                    multiline
                    label={'Yêu cầu chi tiết/Câu hỏi của bạn'}
                    placeholder="Nhập yêu cầu chi tiết hoặc câu hỏi của bạn..."
                    maxLength={1000}
                    onChangeText={onChange}
                    value={value}
                    onBlur={onBlur}
                  />
                  <Text style={tw`mt-8 text-13px text-grayscale-gray`}>Thêm vào Yêu cầu chi tiết/Câu hỏi của bạn</Text>
                  {TEMPLATES?.map?.((template: string, idx: number) => (
                    <TouchableOpacity
                      key={idx}
                      style={tw` py-2 justify-center items-center border mt-2 border-[#EEE] rounded-full`}
                      onPress={() => {
                        onChange(value + template);
                      }}
                    >
                      <Text style={tw` text-13px text-grayscale-black`}>{template}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            />
          </View>
        </View>
      </ScrollView>
      <View style={tw`flex-row gap-4 p-4 pt-2`}>
        <Button
          containerStyle={tw`flex-1`}
          title={'Làm lại'}
          type="outline"
          buttonStyle={tw`border-grayscale-disabled`}
          onPress={onReset}
        />
        <Button
          containerStyle={tw`flex-1`}
          title={'Gửi yêu cầu'}
          onPress={handleSubmit(onSubmit)}
          disabled={!countWatch || !questionWatch?.trim?.()}
          loading={loading}
        />
      </View>
    </SafeAreaView>
  );
};

const TEMPLATES = ['Tôi có thể thương lượng giá không?', 'Bạn có hỗ trợ phí vận chuyển không?'];
