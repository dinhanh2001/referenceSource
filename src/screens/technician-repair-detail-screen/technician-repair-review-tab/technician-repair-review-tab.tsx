import { Text } from '@rneui/themed';
import React, { memo } from 'react';
import { View } from 'react-native';

import { RowWithTwoCells, Space, tw } from '../../../components';

export const TechnicianRepairReviewTab: React.FC = memo(() => {
  return (
    <View style={tw`flex-1 p-16px`}>
      <View>
        <Text style={tw`font-semibold`}>Nhân viên</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Thái độ'} rightValue={'Tuyệt vời'} />
          <RowWithTwoCells leftValue={'Chẩn đoán'} rightValue={'Tuyệt vời'} />
        </View>
      </View>
      <Space />
      <View>
        <Text style={tw`font-semibold`}>Đại lý</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Chất lượng dịch vụ'} rightValue={'Tuyệt vời'} />
          <RowWithTwoCells leftValue={'Phụ tùng'} rightValue={'Tuyệt vời'} />
        </View>
      </View>
    </View>
  );
});
