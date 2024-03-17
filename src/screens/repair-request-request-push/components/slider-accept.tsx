import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Slider from 'react-native-slide-to-unlock';

import { tw } from '../../../components';
import { DoubleRightSVG } from '../../../svg';
import { useInterval } from '../../../hooks';
import { atLeast2Digit } from '../../../helpers';

type Props = {
  onAccept: () => void;
  minute: number;
  onClose: () => void;
};

export const SliderAccept = ({ onAccept, minute, onClose }: Props) => {
  const [timer, setTimer] = useState(minute * 60);

  useInterval(() => {
    if (timer > 0) {
      setTimer(timer - 1);
    } else {
      onClose();
    }
  }, 1000);

  return (
    <View>
      <Slider
        onEndReached={onAccept}
        sliderElement={
          <View style={tw`bg-white w-40px h-40px items-center justify-center rounded-4px`}>
            <DoubleRightSVG />
          </View>
        }
        containerStyle={tw`bg-primary justify-center mt-12px rounded-4px p-4px`}
        childrenContainer={StyleSheet.compose(styles.childrenContainer, StyleSheet.absoluteFill)}
      >
        <View style={tw`flex-row ml-60px`}>
          <Text style={tw`font-semibold flex-1`}>Nhận yêu cầu</Text>
          <Text style={tw`font-semibold mr-16px`}>{`${atLeast2Digit(Math.floor(timer / 60))}:${atLeast2Digit(
            timer % 60,
          )}`}</Text>
        </View>
      </Slider>
    </View>
  );
};

const styles = StyleSheet.create({
  childrenContainer: {
    justifyContent: 'center',
  },
});
