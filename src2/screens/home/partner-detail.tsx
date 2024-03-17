import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react';

import { ContentPartnerDetail } from '../../components';
import { AppStackNavigatorParamList } from '../../navigator-params';

export const PartnerDetailScreen = () => {
  const {
    params: { partnerId, type },
  } = useRoute<RouteProp<AppStackNavigatorParamList, 'home/partner-detail'>>();

  return <ContentPartnerDetail id={partnerId} type={type} />;
};
