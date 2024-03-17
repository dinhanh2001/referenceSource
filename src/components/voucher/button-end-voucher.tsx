import { Button } from '@rneui/themed';
import dayjs from 'dayjs';
import React, { useCallback, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';

import { client } from '../../apollo/apollo';
import { useOverlay } from '../../contexts';
import { usePartnerDeleteDiscountCodeMutation } from '../../graphql/mutations/partnerDeleteDiscountCode.generated';
import { usePartnerEndDiscountMutation } from '../../graphql/mutations/partnerEndDiscount.generated';
import { PartnerCountDiscountCodeDocument } from '../../graphql/queries/partnerCountDiscountCode.generated';
import { PartnerGetDiscountCodesDocument } from '../../graphql/queries/partnerGetDiscountCodes.generated';
import { DiscountCodeEntity } from '../../graphql/type.interface';
import { showFlashMessageError } from '../../helpers';
import { tw } from '../tw';

type Props = {
  item: DiscountCodeEntity;
  isBack?: boolean;
};

export const ButtonEndVoucher = ({ item, isBack }: Props) => {
  const { showDialog } = useOverlay();
  const navigation = useNavigation();

  const { id, isActive, startDate } = item || {};
  const voucherActive = useMemo(() => isActive && dayjs().isSameOrAfter(dayjs(startDate)), [isActive, startDate]);

  const onCompleted = useCallback(() => {
    client.refetchQueries({
      include: [PartnerCountDiscountCodeDocument, PartnerGetDiscountCodesDocument],
    });
    if (isBack) {
      navigation.goBack();
    }
  }, [isBack, navigation]);

  const [handleDeleteDiscount, { loading: loadingDelete }] = usePartnerDeleteDiscountCodeMutation({
    onError: showFlashMessageError,
    onCompleted,
  });

  const [handleEndDiscount, { loading: loadingEnd }] = usePartnerEndDiscountMutation({
    onError: showFlashMessageError,
    onCompleted,
  });

  const onDelete = useCallback(async () => {
    const res = await showDialog({
      title: 'Xác nhận',
      message: 'Bạn có chắc chắn muốn xoá voucher này?',
      confirmText: 'Xoá',
      cancelText: 'Huỷ',
      type: 'CONFIRM',
    });

    if (res) {
      handleDeleteDiscount({
        variables: {
          input: {
            id,
          },
        },
      });
    }
  }, [handleDeleteDiscount, id, showDialog]);

  const onEnd = useCallback(async () => {
    const res = await showDialog({
      title: 'Xác nhận',
      message: 'Bạn có chắc chắn muốn kết thúc voucher này?',
      confirmText: 'Kết thúc',
      cancelText: 'Huỷ',
      type: 'CONFIRM',
    });

    if (res) {
      handleEndDiscount({
        variables: {
          id,
        },
      });
    }
  }, [handleEndDiscount, id, showDialog]);

  const onPress = useCallback(() => {
    if (voucherActive) {
      onEnd();
    } else {
      onDelete();
    }
  }, [onDelete, onEnd, voucherActive]);

  return (
    <Button
      containerStyle={tw`flex-1`}
      type="outline"
      titleStyle={tw`text-error`}
      buttonStyle={tw`border-error`}
      onPress={onPress}
      loading={loadingDelete || loadingEnd}
      title={voucherActive ? 'Kết thúc' : 'Xoá'}
    />
  );
};
