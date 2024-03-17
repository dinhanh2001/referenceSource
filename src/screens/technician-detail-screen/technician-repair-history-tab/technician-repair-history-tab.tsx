import React, { memo } from 'react';
import { FlatList, View } from 'react-native';
import { Text } from '@rneui/themed';

import { Space, TextInput, tw } from '../../../components';
import { Empty1, SearchNormalSVG } from '../../../svg';
import { TableItem } from '../components';

export const TechnicianRepairHistoryTab: React.FC = memo(() => {
  return (
    <View style={tw`flex-1 p-16px`}>
      <TextInput
        placeholder="Tìm trong hoá đơn"
        clearButtonMode="while-editing"
        // onChangeText={() => {}}
        inputContainerStyle={tw`rounded-full`}
        renderErrorMessage={false}
        leftIcon={
          <View>
            <SearchNormalSVG width={16} height={16} style={tw`mr-8px`} />
          </View>
        }
      />
      <Space size={16} />
      <FlatList
        data={[1, 2, 3]}
        renderItem={(item) => <TableItem key={item.index} itemType="history" />}
        ItemSeparatorComponent={() => <Space />}
        ListEmptyComponent={() => (
          <View style={tw`flex-1 items-center mt-35px`}>
            <Empty1 />
            <Space size={8} />
            <Text style={tw`text-grayscale-gray text-center`}>
              Kỹ thuật viên này chưa có Lịch sử{'\n'} sửa chữa nào
            </Text>
          </View>
        )}
      />
    </View>
  );
});
