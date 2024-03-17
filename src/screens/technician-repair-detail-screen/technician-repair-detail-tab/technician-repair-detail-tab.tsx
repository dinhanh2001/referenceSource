import React, { memo } from 'react';
import { ScrollView, View } from 'react-native';
import { Text } from '@rneui/themed';

import { RowWithTwoCells, Space, tw } from '../../../components';

export const TechnicianRepairDetailTab: React.FC = memo(() => {
  return (
    <ScrollView style={tw`flex-1 p-16px`}>
      <View style={tw`border-t border-r border-l border-grayscale-border`}>
        <RowWithTwoCells
          leftValue={'Mã yêu cầu'}
          rightValue={'#YCSC0000000001'}
          spacerColor={tw.color('white')}
          bgColorLeft={tw`bg-grayscale-border`}
          bgColorRight={tw`bg-grayscale-border`}
        />
        <RowWithTwoCells
          leftValue={'Trạng thái'}
          rightValue={<Text style={tw`text-status-success mx-16px my-10px`}>Hoàn thành</Text>}
        />
      </View>
      <Space />
      <View>
        <Text style={tw`font-semibold`}>1. Thông tin Khách hàng</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Họ và tên'} rightValue={'Nguyễn Văn B'} />
          <RowWithTwoCells leftValue={'Số điện thoại'} rightValue={'0123456789'} />
        </View>
      </View>
      <Space />
      <View>
        <Text style={tw`font-semibold`}>2. Thông tin Kỹ thuật viên phụ trách</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Họ và tên'} rightValue={'Nguyễn Văn A'} />
          <RowWithTwoCells leftValue={'Số điện thoại'} rightValue={'0123456789'} />
        </View>
      </View>
      <Space />
      <View>
        <Text style={tw`font-semibold`}>3. Thông tin xe gặp sự cố</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Tên xe'} rightValue={'Máy xúc đào bánh xích XCMG gầu 0.3 m3 Model: XE75D'} />
          <RowWithTwoCells leftValue={'Biển kiểm soát'} rightValue={'-'} />
          <RowWithTwoCells
            leftValue={'Vị trí xe'}
            rightValue={'Khu đô thị Vinhomes Smart City, Tây Mỗ, Nam Từ Liêm, Hà Nội'}
          />
        </View>
      </View>
      <Space />
      <View>
        <Text style={tw`font-semibold`}>4. Chẩn đoán từ Kỹ thuật viên</Text>
        <Space />
        <View style={tw`border-t border-r border-l border-grayscale-border`}>
          <RowWithTwoCells leftValue={'Đã vận hành'} rightValue={'-'} />
          <RowWithTwoCells leftValue={'Mã chẩn đoán'} rightValue={'-'} />
          <RowWithTwoCells leftValue={'Ghi chú'} rightValue={'-'} />
          <RowWithTwoCells leftValue={'Thời gian hoàn thành'} rightValue={'-'} />
        </View>
      </View>
    </ScrollView>
  );
});
