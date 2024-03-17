import { Text } from '@rneui/themed';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { FlatList, Pressable, SafeAreaView, ScrollView, View } from 'react-native';

import { RowWithTwoCells, Space, tw } from '../../components';
import { ArrowDownSVG, ArrowUpSVG } from '../../svg';

import { PropsType } from './type';

export const TechnicianReceiptDetailScreen: React.FC<PropsType> = memo(({ navigation }: PropsType) => {
  const [isCollapsedI, setCollapsedI] = useState(true);
  const [isCollapsedII, setCollapsedII] = useState(true);

  const handleCollapseI = useCallback(() => {
    setCollapsedI(!isCollapsedI);
  }, [isCollapsedI]);
  const handleCollapseII = useCallback(() => {
    setCollapsedII(!isCollapsedII);
  }, [isCollapsedII]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View>
          <Text style={tw`font-semibold text-17px`}>Chi tiết hoá đơn</Text>
        </View>
      ),
      headerRight: () => {
        return <Text style={tw`text-primary font-semibold mr-16px`}>Tải hoá đơn</Text>;
      },
      headerTitleAlign: 'left',
      headerBackgroundContainerStyle: {
        borderColor: tw.color('transparent'),
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={tw`flex-1`}>
      <ScrollView>
        <View style={tw`p-16px`}>
          <View style={tw`border-t border-r border-l border-grayscale-border`}>
            <RowWithTwoCells
              leftValue={'Mã hoá đơn'}
              rightValue={'#YCSC0000000001'}
              spacerColor={tw.color('white')}
              bgColorLeft={tw`bg-grayscale-border`}
              bgColorRight={tw`bg-grayscale-border`}
            />
          </View>
          <Space />
          <Pressable onPress={handleCollapseI} style={tw`justify-between flex-row items-center`}>
            <Text style={tw`font-semibold`}>I. CHI PHÍ CÔNG DỊCH VỤ</Text>
            {isCollapsedI ? <ArrowUpSVG /> : <ArrowDownSVG />}
          </Pressable>
          {!isCollapsedI && (
            <View>
              <Space />
              <View style={tw`flex-1`}>
                <Text style={tw`font-semibold`}>1. Chi phí di chuyển</Text>
                <Space />
                <View style={tw`border-t border-r border-l border-grayscale-border`}>
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn vị tính'} rightValue={'KM'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Số lượng'} rightValue={'1'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn giá'} rightValue={'500.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Tiền chiết khấu'} rightValue={'100.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'VAT'} rightValue={'0%'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Thanh toán'} rightValue={'400.000 đ'} />
                </View>
              </View>
              <Space />
              <View>
                <Text style={tw`font-semibold`}>2. Chi phí chẩn đoán</Text>
                <Space />
                <View style={tw`border-t border-r border-l border-grayscale-border`}>
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn vị tính'} rightValue={'Lần'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Số lượng'} rightValue={'1'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn giá'} rightValue={'500.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Tiền chiết khấu'} rightValue={'100.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'VAT'} rightValue={'0%'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Thanh toán'} rightValue={'400.000 đ'} />
                </View>
              </View>
              <Space />
              <View>
                <Text style={tw`font-semibold`}>3. Chi phí sửa chữa, thay thế</Text>
                <Space />
                <View style={tw`border-t border-r border-l border-grayscale-border`}>
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn vị tính'} rightValue={'Lần'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Số lượng'} rightValue={'1'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn giá'} rightValue={'500.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Tiền chiết khấu'} rightValue={'100.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'VAT'} rightValue={'0%'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Thanh toán'} rightValue={'400.000 đ'} />
                </View>
              </View>
              <Space />
              <View>
                <Text style={tw`font-semibold`}>4. Chi phí phát sinh</Text>
                <Space />
                <View style={tw`border-t border-r border-l border-grayscale-border`}>
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn vị tính'} rightValue={'Lần'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Số lượng'} rightValue={'1'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Đơn giá'} rightValue={'500.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Tiền chiết khấu'} rightValue={'100.000 đ'} />
                  <RowWithTwoCells isAlignEnd leftValue={'VAT'} rightValue={'0%'} />
                  <RowWithTwoCells isAlignEnd leftValue={'Thanh toán'} rightValue={'400.000 đ'} />
                </View>
              </View>
            </View>
          )}
        </View>
        <Space backgroundColor={tw.color('grayscale-border')} size={6} />
        <View style={tw`p-16px`}>
          <Pressable onPress={handleCollapseII} style={tw`justify-between flex-row items-center`}>
            <Text style={tw`font-semibold`}>II. CHI PHÍ VẬT TƯ PHỤ TÙNG</Text>
            {isCollapsedII ? <ArrowUpSVG /> : <ArrowDownSVG />}
          </Pressable>
          {!isCollapsedII && (
            <View>
              <Space />
              <FlatList
                scrollEnabled={false}
                data={[1, 2]}
                ItemSeparatorComponent={() => <Space />}
                renderItem={() => {
                  return (
                    <View>
                      <Text style={tw`font-semibold`}>1. Lọc dầu</Text>
                      <Space />
                      <View style={tw`border-t border-r border-l border-grayscale-border`}>
                        <RowWithTwoCells isAlignEnd leftValue={'Đơn vị tính'} rightValue={'Cái'} />
                        <RowWithTwoCells isAlignEnd leftValue={'Số lượng'} rightValue={'1'} />
                        <RowWithTwoCells isAlignEnd leftValue={'Đơn giá'} rightValue={'500.000 đ'} />
                        <RowWithTwoCells isAlignEnd leftValue={'Tiền chiết khấu'} rightValue={'100.000 đ'} />
                        <RowWithTwoCells isAlignEnd leftValue={'VAT'} rightValue={'0%'} />
                        <RowWithTwoCells isAlignEnd leftValue={'Thanh toán'} rightValue={'400.000 đ'} />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}
        </View>
        <Space backgroundColor={tw.color('grayscale-border')} size={6} />
        <View style={tw`p-16px`}>
          <Text style={tw`font-semibold`}>TỔNG CHI PHÍ (I+II)</Text>
          <Space />
          <View style={tw`border-t border-r border-l border-grayscale-border`}>
            <RowWithTwoCells isAlignEnd leftValue={'Tổng dịch vụ'} rightValue={'Cái'} />
            <RowWithTwoCells isAlignEnd leftValue={'Tổng phụ tùng'} rightValue={'1'} />
            <RowWithTwoCells isAlignEnd leftValue={'Thuế VAT'} rightValue={'500.000 đ'} />
            <RowWithTwoCells isAlignEnd leftValue={'Giảm giá'} rightValue={'100.000 đ'} />
            <RowWithTwoCells
              isAlignEnd
              leftValue={'Tổng cộng'}
              rightValue={<Text style={tw`mx-16px my-10px font-semibold text-17px`}>88.000.000 đ</Text>}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
});
