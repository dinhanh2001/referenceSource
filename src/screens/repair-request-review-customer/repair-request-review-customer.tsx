import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, View } from 'react-native';

import { client } from '../../apollo/apollo';
import { TextArea, tw } from '../../components';
import { useOverlay } from '../../contexts';
import { usePartnerCreateReviewMutation } from '../../graphql/mutations/partnerCreateReview.generated';
import { PartnerBookingDocument } from '../../graphql/queries/partnerBooking.generated';
import type * as Types from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppStackNavigatorParamList } from '../../navigator-params';
import { TickGreen } from '../../svg';

import { CustomerView, Rate } from './components';
import { PropsType } from './type';

type FormData = {
  star: number;
  comment: string;
};

export const RepairRequestReviewCustomerScreen: React.FC<PropsType> = (props: PropsType) => {
  const { showDialog } = useOverlay();
  const { user, bookingId } = props.route.params;

  const navigation = useNavigation<NavigationProp<AppStackNavigatorParamList>>();

  const [reviewCustomer, { loading: reviewLoading }] = usePartnerCreateReviewMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      await showDialog({
        icon: <TickGreen />,
        title: 'Gửi đánh giá thành công',
        message: `Cảm ơn bạn đã đánh giá khách hàng ${user?.fullname || ''}`,
        type: 'ALERT',
      });
      client.refetchQueries({
        include: [PartnerBookingDocument],
      });
      navigation.goBack();
    },
  });

  const { control, watch } = useForm<FormData>({
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

  const onSubmit = useCallback(() => {
    const input: Types.CreateReviewInput = {
      bookingId,
      star,
      comment: comment?.trim?.(),
      personEvaluatedId: user?.id,
    };

    reviewCustomer({ variables: { input } });
  }, [bookingId, comment, reviewCustomer, star, user?.id]);

  const renderContent = useMemo(() => {
    return (
      <ScrollView keyboardShouldPersistTaps={'handled'}>
        <CustomerView user={user} />
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
      </ScrollView>
    );
  }, [control, user]);

  const renderBottom = useMemo(() => {
    return (
      <View style={tw`px-16px pt-8px pb-34px`}>
        <Button title="Gửi đánh giá" disabled={disabledBtn} onPress={onSubmit} loading={reviewLoading} />
      </View>
    );
  }, [disabledBtn, onSubmit, reviewLoading]);

  return (
    <View style={tw`flex-1`}>
      {renderContent}
      {renderBottom}
    </View>
  );
};
