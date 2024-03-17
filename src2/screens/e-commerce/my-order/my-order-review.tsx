import { useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RefreshControl, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { ActivityIndicator, ECommerceMyOrderProductReview, TextInput, tw } from '../../../components';
import { Space } from '../../../components/spacer';
import { useOverlay } from '../../../contexts';
import { useUserCreateOrderReviewMutation } from '../../../graphql/mutations/userCreateOrderReview.generated';
import { useOrderQuery } from '../../../graphql/queries/order.generated';
import { showFlashMessageError } from '../../../helpers';
import { useRefreshByUser } from '../../../hooks';
import { Sent } from '../../../svg';
import { Rate } from '../../my-repair-request-review/components';

import { ECommerceMyOrderNavigationProp, ECommerceMyOrderReviewRouteProp } from './type';

type ProductReviewData = {
  productId: string;
  star: number;
  comment: string;
};

type PartnerReviewData = {
  partnerId: string;
  star: number;
  comment: string;
};

type FormReviewData = {
  productReviews: ProductReviewData[];
  partnerReview: PartnerReviewData;
};

const DEFAULT_REVIEW = {
  star: 0,
  comment: '',
};

export const ECommerceMyOrderReview = () => {
  const { showDialog } = useOverlay();
  const {
    params: { orderId },
  } = useRoute<ECommerceMyOrderReviewRouteProp>();
  const navigation = useNavigation<ECommerceMyOrderNavigationProp>();

  const { data, loading, refetch } = useOrderQuery({ variables: { id: orderId } });
  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refetch);

  const [review, { loading: loadingReview }] = useUserCreateOrderReviewMutation({
    onError: showFlashMessageError,
    onCompleted: async () => {
      const res = await showDialog({
        icon: <Sent />,
        type: 'ALERT',
        title: 'Gửi đánh giá thành công',
        message: 'Cảm ơn bạn đã đánh giá sản phẩm',
      });
      refetch();
      if (res) {
        navigation.goBack();
      }
    },
  });

  const { product } = data?.order || {};

  const { control, handleSubmit, setValue, watch } = useForm<FormReviewData>({
    defaultValues: {
      productReviews: [],
      partnerReview: DEFAULT_REVIEW,
    },
  });

  useEffect(() => {
    if (!loading && data?.order) {
      const productReviews = data?.order?.product?.map((it) => ({
        productId: it?.productId,
        ...DEFAULT_REVIEW,
      }));
      const partnerReview = {
        partnerId: data?.order?.partnerId || '',
        ...DEFAULT_REVIEW,
      };
      setValue('productReviews', productReviews || []);
      setValue('partnerReview', partnerReview);
    }
  }, [data?.order, loading, setValue]);

  const productReviewsWatch = watch('productReviews');
  const partnerReviewWatch = watch('partnerReview');

  const onSubmit = useCallback(
    (form: FormReviewData) => {
      review({
        variables: {
          input: {
            orderId,
            ...form,
          },
        },
      });
    },
    [orderId, review],
  );

  const renderProductItem = useCallback(
    (it: any, index: number) => {
      return (
        <View key={it?.id} style={tw`mx-4`}>
          <ECommerceMyOrderProductReview product={it} />
          <Controller
            name={`productReviews.${index}.star`}
            control={control}
            render={({ field: { onChange } }) => <Rate label="Chất lượng sản phẩm" onChange={onChange} />}
          />
          <Controller
            name={`productReviews.${index}.comment`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextInput
                value={value}
                placeholder={'Nhận xét về sản phẩm...'}
                containerStyle={tw`mt-5 `}
                onChangeText={onChange}
                inputContainerStyle={tw`h-62px`}
                multiline
              />
            )}
          />
          <Space size={6} backgroundColor={'#EEE'} style={tw`-mx-4 mb-4`} />
        </View>
      );
    },
    [control],
  );

  const renderStore = useMemo(() => {
    return (
      <View style={tw`px-4 mt-1`}>
        <Controller
          name={'partnerReview.star'}
          control={control}
          render={({ field: { onChange } }) => <Rate label="Gian hàng" onChange={onChange} />}
        />
        <Controller
          name={`partnerReview.comment`}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              placeholder={'Nhận xét về gian hàng...'}
              containerStyle={tw`mt-5 `}
              onChangeText={onChange}
              inputContainerStyle={tw`h-62px`}
              multiline
            />
          )}
        />
      </View>
    );
  }, [control]);

  if (loading && !data?.order) {
    return <ActivityIndicator />;
  }

  return (
    <View style={tw`flex-1`}>
      <KeyboardAwareScrollView
        refreshControl={<RefreshControl refreshing={isRefetchingByUser} onRefresh={refetchByUser} />}
        keyboardShouldPersistTaps={'handled'}
      >
        <View>{product?.map?.(renderProductItem)}</View>

        {renderStore}
      </KeyboardAwareScrollView>
      <View style={tw`px-16px pt-8px pb-34px`}>
        <Button
          title="Gửi đánh giá"
          onPress={handleSubmit(onSubmit)}
          disabled={
            productReviewsWatch?.some((it: ProductReviewData) => it?.star === 0 || it?.comment?.trim?.() === '') ||
            partnerReviewWatch?.star === 0 ||
            partnerReviewWatch?.comment?.trim?.() === ''
          }
          loading={loadingReview}
        />
      </View>
    </View>
  );
};
