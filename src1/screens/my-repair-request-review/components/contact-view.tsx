import { Image } from '@rneui/themed';
import React from 'react';
import { Text, View } from 'react-native';

import { tw } from '../../../components';
import { PartnerEntity } from '../../../graphql/type.interface';

type ContactViewProps = {
  partner: PartnerEntity;
};
export const ContactView = React.memo(({ partner }: ContactViewProps) => {
  return (
    <View style={[tw`flex-row items-center pt-3 pb-6 px-16px bg-grayscale-bg mt-5`]}>
      <View>
        <Image
          source={{
            uri: partner?.avatar?.fullThumbUrl || '',
          }}
          style={tw`w-10 h-10 rounded-full bg-gray-100`}
        />
      </View>
      <View style={tw`mx-4 flex-1 items-stretch`}>
        <Text style={tw`text-14px font-bold mt-4px`}>{partner?.fullname}</Text>
        <Text style={tw`text-3 text-grayscale-gray mt-2px`}>Kỹ thuật viên máy xúc</Text>
      </View>
    </View>
  );
});
