import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { FlatList, View } from 'react-native';

import { Space, tw } from '../../../components';
import { Empty4 } from '../../../svg';
import { TableItem } from '../components';

export const TechnicianReceiptTab: React.FC = memo(() => {
  return (
    <View style={tw`flex-1 p-16px`}>
      <FlatList
        data={[1, 2, 3]}
        renderItem={(item) => <TableItem key={item.index} itemType="receipt" />}
        ItemSeparatorComponent={() => <Space />}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 items-center mt-35px`}>
            <Empty4 />
            <Space size={8} />
            <Text style={tw`text-grayscale-gray text-center`}>Kỹ thuật viên này chưa có Hóa đơn nào</Text>
          </View>
        )}
      />
    </View>
  );
});
