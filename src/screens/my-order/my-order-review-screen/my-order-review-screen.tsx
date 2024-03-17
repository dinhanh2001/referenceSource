import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View } from 'react-native';

import { TextArea, tw } from '../../../components';
import { UserEntity } from '../../../graphql/type.interface';
import { CustomerView, Rate } from '../../repair-request-review-customer/components';

import { FormData } from './type';

export const MyOrderReviewScreen = () => {
  const { control, watch, handleSubmit } = useForm<FormData>({
    defaultValues: {
      star: 0,
      comment: '',
    },
  });

  const star = watch('star');
  const comment = watch('comment');

  const disabledBtn = useMemo(() => {
    return star === 0 || comment?.trim?.() === '';
  }, [comment, star]);

  const onSubmit = useCallback((data: FormData) => {
    console.log(data);
  }, []);

  return (
    <View style={tw`flex-1`}>
      <View style={tw`flex-1`}>
        <CustomerView user={USER as UserEntity} />
        <View style={tw`px-16px mt-20px`}>
          <Controller
            name="star"
            control={control}
            render={({ field: { onChange } }) => <Rate label="Độ thân thiện" onChange={onChange} />}
          />
          <Controller
            name="comment"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextArea
                value={value}
                placeholder={'Nhận xét về khách hàng này...'}
                containerStyle={tw`mt-20px `}
                onChangeText={onChange}
              />
            )}
          />
        </View>
      </View>
      <View style={tw`px-16px pt-8px pb-34px`}>
        <Button title="Gửi đánh giá" disabled={disabledBtn} onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};

const USER = {
  fullname: 'Nguyễn Văn A',
  phone: '0123456789',
  avatar: {
    fullThumbUrl: 'https://haycafe.vn/wp-content/uploads/2022/02/Anh-gai-xinh-Viet-Nam.jpg',
  },
};
