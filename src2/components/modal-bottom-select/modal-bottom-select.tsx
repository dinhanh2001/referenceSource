import {
  View,
  Text,
  ViewStyle,
  StyleProp,
  TouchableOpacity,
  LayoutChangeEvent,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import Modal from 'react-native-modal';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '@rneui/themed';

import { tw } from '../tw';
import { ArrowDown, CheckSVG } from '../../svg';
import { Space } from '../spacer';

type OptionProps = {
  title: string;
  value: string;
};

type Props = {
  containerStyle?: StyleProp<ViewStyle>;
  children?: (func: () => void) => React.ReactNode;
  title?: string;
  label?: string;
  options: OptionProps[];
  onChange?: (value: string) => void;
  value?: string;
};

export const ModalBottomSelect = ({
  containerStyle,
  children,
  label = 'Sắp xếp',
  title = 'Chọn một',
  options,
  onChange,
  value = '',
}: Props) => {
  const { bottom } = useSafeAreaInsets();
  const { height } = useWindowDimensions();

  const [visible, setVisible] = useState(false);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState(value);

  const onOpen = useCallback(() => {
    setVisible(true);
  }, []);

  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setWidth(e.nativeEvent.layout.width);
  }, []);

  const onClose = useCallback(() => {
    setVisible(false);
  }, []);

  const onConfirm = useCallback(() => {
    onChange?.(selected);
    onClose();
  }, [onChange, onClose, selected]);

  const onModalWillShow = useCallback(() => {
    setSelected(value);
  }, [value]);

  const renderItem = useCallback(
    ({ item }: { item: OptionProps }) => {
      const isSelected = item?.value === selected;
      return (
        <TouchableOpacity style={tw`flex-row py-3 border-b border-b-[#EEE]`} onPress={() => setSelected(item?.value)}>
          <View style={tw`flex-1`}>
            <Text>{item?.title}</Text>
          </View>
          {isSelected && <CheckSVG />}
        </TouchableOpacity>
      );
    },
    [selected],
  );

  const renderContentModal = useMemo(() => {
    return (
      <View style={tw`bg-white rounded-3 p-4  max-h-${height / 2}px pb-${bottom + 20}px`}>
        <View style={tw`flex-row mb-2 items-center`}>
          <View style={tw`w-${width}px`} />
          <View style={tw`flex-1`}>
            <Text style={tw`text-center font-semibold text-17px`}>{title}</Text>
          </View>
          <TouchableOpacity onPress={onClose} onLayout={onLayout}>
            <Text style={tw`font-semibold text-blue`}>Đóng</Text>
          </TouchableOpacity>
        </View>
        <Space size={1} backgroundColor={'#EEE'} />

        <FlatList
          data={options}
          renderItem={renderItem}
          keyExtractor={(item) => item.value}
          showsVerticalScrollIndicator={false}
        />
        <Button disabled={!selected} title={'Chọn'} containerStyle={tw`mt-4`} onPress={onConfirm} />
      </View>
    );
  }, [bottom, height, onClose, onConfirm, onLayout, options, renderItem, selected, title, width]);

  return (
    <View style={containerStyle}>
      {children?.(onOpen) ?? (
        <TouchableOpacity
          onPress={onOpen}
          style={tw` bg-grayscale-bg py-6px px-3 rounded-full self-start flex-row items-center`}
        >
          <Text style={tw`font-semibold mr-2`}>{label}</Text>
          <ArrowDown width={12} height={12} />
        </TouchableOpacity>
      )}

      <Modal
        isVisible={visible}
        onDismiss={onClose}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
        useNativeDriver
        onModalWillShow={onModalWillShow}
        style={tw`justify-end m-0 `}
      >
        {renderContentModal}
      </Modal>
    </View>
  );
};
