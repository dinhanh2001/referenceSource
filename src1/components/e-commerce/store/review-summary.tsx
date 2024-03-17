import React from 'react';
import { StyleProp, Text, View, ViewStyle } from 'react-native';

import { ReviewSummary } from '../../../graphql/type.interface';
import { Stars } from '../../stars';
import { tw } from '../../tw';

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  reviewSummary?: ReviewSummary;
};

export const ECommerceReviewSummary = ({ containerStyle, reviewSummary }: Props) => {
  const { percent, starAverage, total } = reviewSummary || {};

  return (
    <View style={[tw`m-4`, containerStyle]}>
      <View style={tw`flex-row mb-3`}>
        <Text style={tw`text-31px font-semibold`}>{starAverage?.toFixed?.(1) || 0}</Text>
        <Text style={tw`text-17px font-medium mt-4px`}>/ 5</Text>
        <View style={tw`ml-4`}>
          <Stars value={starAverage as number} />

          <Text style={tw`text-3 text-grayscale-gray`}>{`${total || 0} đánh giá, ${percent || 0}% hài lòng`}</Text>
        </View>
      </View>

      {/* <Space size={1} backgroundColor={'#EEE'} /> */}
      {/* <RowDetail title="Vận chuyển, lắp đặt" value={3.9} />
      <RowDetail title="Hỗ trợ, bảo hành" value={5} /> */}
    </View>
  );
};

// const RowDetail = ({ title, value }: { title: string; value: number }) => (
//   <View style={tw`flex-row items-center mt-3`}>
//     <View style={tw`flex-1`}>
//       <Text style={tw`text-3 text-grayscale-black`}>{title}</Text>
//     </View>

//     <View style={tw`h-3px w-100px bg-[#EEE] rounded-full`}>
//       <View
//         style={[
//           tw`absolute h-3px w-${(value / 5.0) * 100}px bg-primary-dark rounded-tl-full rounded-bl-full`,
//           value === 5.0 && tw`rounded-tr-full rounded-br-full`,
//         ]}
//       />
//     </View>
//     <Text style={tw`ml-3`}>{value?.toFixed?.(1)}</Text>
//   </View>
// );
