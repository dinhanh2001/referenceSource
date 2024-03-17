import { Button, Text } from '@rneui/themed';
import { View } from 'react-native';
import Modal from 'react-native-modal/dist/modal';
import React from 'react';
import { FieldValues, Path, PathValue, UseFormSetValue } from 'react-hook-form';

import { Space } from '../spacer';
import { tw } from '../tw';
import { OperatingUnitEnum } from '../../graphql/type.interface';

type ModalProps<TFieldValues extends FieldValues> = {
  isModalVisible: boolean;
  onClose: () => void;
  onChooseValue: UseFormSetValue<TFieldValues>;
  name: Path<TFieldValues>;
};

export const ModalUnit = <TFieldValues extends FieldValues>({
  isModalVisible,
  onClose,
  onChooseValue,
  name,
}: ModalProps<TFieldValues>) => {
  return (
    <Modal
      isVisible={isModalVisible}
      style={tw`justify-end -mx-1px`}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={onClose}
    >
      <View style={tw`bg-white rounded-t-16px p-16px`}>
        <Text style={tw`font-semibold`}>Đơn vị</Text>
        <Space size={26} />
        <View style={tw`flex-row`}>
          <Button
            type="outline"
            containerStyle={tw`flex-1`}
            buttonStyle={tw`border-grayscale-border`}
            onPress={() => {
              onChooseValue(name, OperatingUnitEnum.HOURS as PathValue<TFieldValues, Path<TFieldValues>>);
              onClose();
            }}
          >
            <Text>Giờ</Text>
          </Button>
          <Space size={8} horizontal />
          <Button
            type="outline"
            containerStyle={tw`flex-1`}
            buttonStyle={tw`border-grayscale-border`}
            onPress={() => {
              onChooseValue(name, OperatingUnitEnum.KM as PathValue<TFieldValues, Path<TFieldValues>>);
              onClose();
            }}
          >
            <Text>KM</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};
