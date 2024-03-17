import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';
import { Image } from '@rneui/themed';

import { tw } from '../../../components';
import { CallButton } from '../../../components/call-button';
import { PartnerEntity } from '../../../graphql/type.interface';
import { StarSVG } from '../../../svg';

type ContactViewProps = {
  containerStyle?: StyleProp<ViewStyle>;
  partner?: PartnerEntity;
};
export const ContactView = React.memo(({ containerStyle, partner }: ContactViewProps) => {
  const { reviewSummary } = partner || {};

  return (
    <View style={[tw`flex-row items-center p-16px pb-30px rounded-4px border border-[#FFFFFF1A]`, containerStyle]}>
      <View>
        <Image
          source={{
            uri: partner?.avatar?.fullThumbUrl as string,
          }}
          style={tw`w-10 h-10 border-2 border-white rounded-full `}
        />
        <View
          style={tw`flex-row items-center p-4px justify-between shadow-sm absolute bg-white rounded-md -bottom-12px`}
        >
          <StarSVG />
          <Text style={tw`text-11px font-bold ml-4px`}>{reviewSummary?.starAverage?.toFixed?.(1) || 0}</Text>
        </View>
      </View>
      <View style={tw`mx-4 flex-1 items-stretch`}>
        <Text style={tw`text-3 text-white text-opacity-70`}>Khách hàng</Text>
        <Text style={tw`text-white text-14px font-bold mt-4px`}>{partner?.fullname || 'Nguyễn Văn B'}</Text>
      </View>
      <CallButton phone={partner?.phone} />
    </View>
  );
});
