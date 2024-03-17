import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '@rneui/themed';

import { Space, tw } from '../../../components';
import { Empty3 } from '../../../svg';
import { TableItem } from '../components';

export const TechnicianReviewTab: React.FC = memo(() => {
  return (
    <View style={tw`flex p-16px`}>
      <FlatList
        data={[1, 2, 3]}
        renderItem={(item) => <TableItem key={item.index} itemType="review" />}
        ItemSeparatorComponent={() => <Space size={16} />}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 items-center mt-35px`}>
            <Empty3 />
            <Space size={8} />
            <Text style={tw`text-grayscale-gray text-center`}>Kỹ thuật viên này chưa có Đánh giá nào</Text>
          </View>
        )}
      />
    </View>
  );
});
