import { memo } from 'react';
import { View } from 'react-native';
import { Text } from '@rneui/themed';
import { NumericFormat } from 'react-number-format';

import { Expense } from '../../graphql/type.interface';
import { tw } from '../tw';

type Props = {
  expense: Expense;
};

export const PartnerExpenseInfoGroup = memo(({ expense }: Props) => {
  return (
    <>
      <View style={tw`flex flex-row gap-2 mt-1 items-center`}>
        <Text style={tw`text-12px`}>{expense?.time ?? 1} phút</Text>
        <View style={tw`h-1 w-1 bg-grayscale-disabled rounded-full`} />
        <Text style={tw`text-12px`}>{expense?.distance ?? 1} km</Text>
      </View>
      <View style={tw`mt-3`}>
        <NumericFormat
          displayType={'text'}
          value={expense?.cost ?? 0}
          thousandSeparator={','}
          suffix={' đ'}
          renderText={(value) => <Text style={tw`text-blue font-bold text-base`}>{value}</Text>}
        />
      </View>
    </>
  );
});
