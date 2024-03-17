import { View, Text, TouchableOpacity, StyleSheet, Pressable, SafeAreaView, Keyboard } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import { FlashList } from '@shopify/flash-list';

import { DEVICE_WIDTH } from '../../utils';
import { tw } from '../tw';
import { TextInput, TextInputProps } from '../text-input';
import { CloseSvg, EmptyListSvg } from '../../svg';
import { RNModal } from '../rn-modal';
import { EmptyView } from '../empty-view';

type GridSelectProps = { data: string[]; col?: number } & TextInputProps;

const MARGIN = 16;
const MARGIN_ITEM = 10;

export const GridSelect = React.memo(({ placeholder, data, col = 3, value, onChange, ...props }: GridSelectProps) => {
  const [showSelect, setShowSelect] = useState(false);
  const ITEM_WIDTH = (DEVICE_WIDTH - MARGIN_ITEM * 2 - MARGIN * 2) / col;

  const onOpen = useCallback(() => {
    Keyboard.dismiss();

    setShowSelect(true);
  }, [setShowSelect]);

  const onClose = useCallback(() => {
    setShowSelect(false);
  }, [setShowSelect]);

  const renderItem = useCallback(
    ({ item }: any) => {
      return (
        <TouchableOpacity
          style={[
            { width: ITEM_WIDTH },
            tw`h-44px border items-center justify-center rounded mb-10px`,
            { borderColor: value === item ? tw.color('grayscale-black') : tw.color('grayscale-border') },
          ]}
          onPress={() => {
            onChange && onChange(item);
            setShowSelect(false);
          }}
        >
          <Text style={tw`text-grayscale-black text-14px`}>{item}</Text>
        </TouchableOpacity>
      );
    },
    [value, ITEM_WIDTH, onChange],
  );

  const ListEmptyComponent = useMemo(() => {
    return <EmptyView icon={<EmptyListSvg />} text="Không tìm thấy kết quả" />;
  }, []);

  return (
    <>
      <TouchableOpacity onPress={onOpen}>
        <TextInput value={value} borderVisibleIfValue={false} type="select" placeholder={placeholder} {...props} />
        <View style={StyleSheet.absoluteFillObject} />
      </TouchableOpacity>
      <RNModal style={tw`justify-end bg-white`} isVisible={showSelect}>
        <SafeAreaView style={tw`bg-white mt-32px flex-1`}>
          <View style={tw`flex-row items-center pt-16px px-16px`}>
            <Pressable style={tw`mr-16px`} onPress={onClose}>
              <CloseSvg width={28} height={28} />
            </Pressable>
            <Text style={tw`font-semibold text-18px`}>{placeholder}</Text>
          </View>
          <FlashList
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={tw`py-32px px-16px`}
            data={data || []}
            numColumns={col}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            ListEmptyComponent={ListEmptyComponent}
            estimatedItemSize={55}
          />
        </SafeAreaView>
      </RNModal>
    </>
  );
});
