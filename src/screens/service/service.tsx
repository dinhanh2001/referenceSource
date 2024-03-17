import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { RepairRequestListScreen } from '../repair-request-list-screen';
import { AppHeader, tw } from '../../components';

export const Service = React.memo(() => {
  return (
    <SafeAreaView edges={['top']} style={tw`flex-1`}>
      <AppHeader title="Yêu cầu sửa chữa" />
      <RepairRequestListScreen />
    </SafeAreaView>
  );
});
