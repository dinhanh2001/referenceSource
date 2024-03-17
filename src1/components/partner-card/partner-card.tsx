import React, { memo } from 'react';
import { View, Text } from 'react-native';
import { Image } from '@rneui/themed';

import { tw } from '../tw';
import { CategoryEntity, PartnerEntity, ReviewSummary } from '../../graphql/type.interface';
import { PartnerRateGroup } from '../partner-rate-group';
import { PartnerExpenseInfoGroup } from '../partner-expense-info-group';
import { getQualification } from '../../utils';

interface Props {
  partner: PartnerEntity;
}

export const PartnerCard = memo(({ partner }: Props) => {
  const { reviewSummary, avatar, fullname, description, qualifications, expenseInfo } = partner || {};

  return (
    <View style={tw`flex flex-row w-full gap-4`}>
      <View style={tw`w-88px h-88px flex-shrink-0`}>
        <Image style={[tw`h-88px rounded`]} source={{ uri: avatar?.fullThumbUrl ?? '' }} />
      </View>
      <View style={tw`flex-2`}>
        <Text style={tw`font-bold`} numberOfLines={2}>
          {fullname}
        </Text>
        {!!description && (
          <Text style={tw`text-13px`} numberOfLines={2}>
            {description}
          </Text>
        )}

        <Text style={tw`font-medium text-13px`} numberOfLines={2}>
          {getQualification(qualifications as CategoryEntity[])}
        </Text>
        <PartnerRateGroup reviewSummary={reviewSummary as ReviewSummary} />
        {expenseInfo?.distance != null && (
          <>
            <PartnerExpenseInfoGroup expense={expenseInfo} />
          </>
        )}
      </View>
    </View>
  );
});
