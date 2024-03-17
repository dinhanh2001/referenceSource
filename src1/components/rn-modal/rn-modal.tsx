import React from 'react';
import Modal, { ModalProps } from 'react-native-modal';

import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../../utils';
import { tw } from '../tw';

export const RNModal = ({ style, ...props }: Partial<ModalProps>) => {
  return (
    <Modal
      {...props}
      animationInTiming={400}
      animationOutTiming={400}
      animationOut="slideOutDown"
      animationIn="slideInUp"
      backdropTransitionInTiming={400}
      backdropTransitionOutTiming={0}
      hideModalContentWhileAnimating={false}
      deviceHeight={DEVICE_HEIGHT}
      deviceWidth={DEVICE_WIDTH}
      style={[tw`flex-1 m-0`, style]}
    >
      {props.children}
    </Modal>
  );
};
