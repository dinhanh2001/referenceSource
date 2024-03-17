import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { client } from '../../apollo/apollo';
import { ActivityIndicator, AppHeader, tw } from '../../components';
import { useOverlay } from '../../contexts';
import { useUserCreateReviewMutation } from '../../graphql/mutations/userCreateReview.generated';
import { BookingDocument, useBookingQuery } from '../../graphql/queries/booking.generated';
import { CreateReviewInput, PartnerEntity, PartnerTypeEnum } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { AppStackNavigatorParamList, AppStackNavigatorScreenProps } from '../../navigator-params';
import { TickCircleGreen } from '../../svg';

import { FormRate } from './components';

type FormData = {
  star: number;
  comment: string;
};

type ScreenNavigationProp = NavigationProp<AppStackNavigatorParamList>;

export const MyRepairRequestsReview: React.FC = () => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation<ScreenNavigationProp>();
  const route = useRoute<AppStackNavigatorScreenProps<'my-repair-request/review'>['route']>();

  const { bookingId } = route?.params || {};

  const { data, loading } = useBookingQuery({ variables: { id: bookingId } });

  const [reviewBooking, { loading: reviewLoading }] = useUserCreateReviewMutation({
    onError: (error) => showFlashMessageError(error),
    onCompleted: async () => {
      const res = await showDialog({
        icon: <TickCircleGreen />,
        title: 'Gửi đánh giá thành công',
        message: `Cảm ơn bạn đã đánh giá kỹ thuật viên ${technician?.fullname || ''}`,
        type: 'ALERT',
      });

      if (res) {
        client.refetchQueries({
          include: [BookingDocument],
        });
        navigation.goBack();
      }
    },
  });
  const [reviewBookingAgency, { loading: reviewLoadingAgency }] = useUserCreateReviewMutation({
    onError: (error) => showFlashMessageError(error),
  });

  const { technician, partner } = data?.booking || {};

  const { control, watch } = useForm<FormData>({
    defaultValues: {
      star: 0,
      comment: '',
    },
  });

  const { control: controlAgency, watch: watchAgency } = useForm<FormData>({
    defaultValues: {
      star: 0,
      comment: '',
    },
  });

  const star = watch('star');
  const comment = watch('comment');

  const starAgency = watchAgency('star');
  const commentAgency = watchAgency('comment');

  const disabledBtn = useMemo(() => {
    const isAgency = partner?.type === PartnerTypeEnum?.AGENCY && (starAgency === 0 || commentAgency?.trim?.() === '');
    return star === 0 || comment?.trim?.() === '' || isAgency;
  }, [comment, commentAgency, partner?.type, star, starAgency]);

  const onSubmit = useCallback(async () => {
    const input: CreateReviewInput = {
      bookingId,
      star,
      comment: comment?.trim?.(),
      personEvaluatedId: technician?.id || partner?.id || '',
    };

    const inputAgency: CreateReviewInput = {
      bookingId,
      star: starAgency,
      comment: commentAgency?.trim?.(),
      personEvaluatedId: partner?.id || '',
    };

    if (partner?.type === PartnerTypeEnum?.AGENCY) {
      await reviewBookingAgency({ variables: { input: inputAgency } });
    }
    await reviewBooking({ variables: { input } });
  }, [
    bookingId,
    comment,
    commentAgency,
    partner?.id,
    partner?.type,
    reviewBooking,
    reviewBookingAgency,
    star,
    starAgency,
    technician?.id,
  ]);

  const renderContent = useMemo(() => {
    if (loading) {
      return <ActivityIndicator />;
    }

    return (
      <View style={tw`flex-1`}>
        <FormRate
          control={control}
          partner={(technician || partner) as PartnerEntity}
          labelRate="Chẩn đoán"
          placeholder="Nhận xét về kỹ thuật viên này..."
        />
        {partner?.type === PartnerTypeEnum?.AGENCY && (
          <FormRate
            control={controlAgency}
            partner={partner as PartnerEntity}
            labelRate="Chất lượng dịch vụ"
            placeholder="Nhận xét về đơn vị này..."
          />
        )}
      </View>
    );
  }, [control, controlAgency, loading, partner, technician]);

  const renderBottom = useMemo(() => {
    return (
      <View style={tw`px-16px pt-8px pb-34px`}>
        <Button
          title="Gửi đánh giá"
          onPress={onSubmit}
          loading={reviewLoading || reviewLoadingAgency}
          disabled={disabledBtn}
        />
      </View>
    );
  }, [disabledBtn, onSubmit, reviewLoading, reviewLoadingAgency]);

  return (
    <SafeAreaView edges={['top', 'bottom']} style={tw`flex-1`}>
      <AppHeader title="Đánh giá" />
      <ScrollView>{renderContent}</ScrollView>
      {renderBottom}
    </SafeAreaView>
  );
};
