import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Modal, useTheme } from 'react-native-paper';
import { IActivityProps } from 'types';

export function ActivityIndicatorCus(props: IActivityProps) {
  const {
    animating,
    size = 'small',
    color,
    loading = false,
    backdropColor = 'white',
    ...rest
  } = props;

  const { colors } = useTheme();

  return (
    <Modal
      visible={loading}
      style={styles.modalView}
      contentContainerStyle={styles.container}
      theme={{
        colors: {
          backdrop: backdropColor,
        },
      }}>
      <View style={styles.container}>
        <ActivityIndicator
          animating={animating}
          color={color || colors?.primary}
          {...rest}
          size={size}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    backgroundColor: 'transparent',
  },
});
