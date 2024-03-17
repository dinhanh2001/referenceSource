import { Image } from '@rneui/themed';
import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { tw } from '../../../components';
import { CallButton } from '../../../components/call-button';
import { PartnerEntity, PartnerTypeEnum } from '../../../graphql/type.interface';
import { StarPrimary } from '../../../svg';
import { getQualification } from '../../../utils';

type PartnerContactViewProps = {
  containerStyle?: StyleProp<ViewStyle>;
  partner: PartnerEntity;
};

export const PartnerContactView = React.memo(({ containerStyle, partner }: PartnerContactViewProps) => {
  const { reviewSummary } = partner || {};
  return (
    <View style={[tw`flex-row items-center pt-3 pb-6 border-b border-t border-grayscale-border mt-5`, containerStyle]}>
      <View>
        <Image
          source={{
            uri: partner?.avatar?.fullThumbUrl ?? '',
          }}
          style={tw`w-10 h-10 rounded-full`}
        />
        <View
          style={tw`flex-row items-center p-4px justify-between shadow-sm absolute bg-white rounded-md -bottom-12px`}
        >
          <StarPrimary />
          <Text style={tw`text-11px font-semibold ml-4px`}>{reviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
        </View>
      </View>
      <View style={tw`mx-4 flex-1 items-stretch`}>
        <Text style={tw`text-14px font-medium mt-4px`}>{partner?.fullname}</Text>
        <Text style={tw`text-3 text-grayscale-gray mt-2px`} numberOfLines={1}>
          {partner.type === PartnerTypeEnum.AGENCY
            ? partner.description
            : getQualification(partner.qualifications ?? [], 'Đơn vị sửa chữa')}
        </Text>
      </View>
      <CallButton phone={partner?.phone} />
    </View>
  );
});
