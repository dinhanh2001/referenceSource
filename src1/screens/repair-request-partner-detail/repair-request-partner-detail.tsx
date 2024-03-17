import { RouteProp, useRoute } from '@react-navigation/native';
import { Button } from '@rneui/themed';
import React, { memo, useCallback } from 'react';
import { View } from 'react-native';

import { ContentPartnerDetail, tw } from '../../components';
import { PartnerTypeEnum } from '../../graphql/type.interface';
import { AppStackNavigatorParamList } from '../../navigator-params';

import { useSubmitRepairRequest } from './use-submit-repair-request';

export const RepairRequestPartnerDetail = memo(() => {
  const { params } = useRoute<RouteProp<AppStackNavigatorParamList, 'repair-request/select-partner/partner-detail'>>();

  const { isLoading, submit } = useSubmitRepairRequest(params);

  const handleFinishBooking = useCallback(() => {
    submit();
  }, [submit]);

  return (
    <View style={tw`flex-1`}>
      <ContentPartnerDetail id={params?.partner?.id as string} type={params?.partner?.type as PartnerTypeEnum} />
      <View style={tw`mb-32px w-full p-16px bg-white`}>
        <Button onPress={handleFinishBooking} disabled={isLoading} loading={isLoading}>
          Chọn đơn vị sửa chữa này
        </Button>
      </View>
    </View>
  );
});
