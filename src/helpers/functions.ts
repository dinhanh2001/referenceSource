import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Alert, Linking } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import mime from 'mime';

dayjs.extend(relativeTime);

import { DialogOption } from '../contexts';

const localizedFormat = require('dayjs/plugin/localizedFormat');

dayjs.extend(localizedFormat);

export const hitSlop = (value: number) => ({
  top: value,
  right: value,
  bottom: value,
  left: value,
});

export const renderTime = (time: Date | string, hiddenFormatTimeFromNow?: boolean) => {
  const date1 = dayjs(time, 'DD/MM/YYYY HH:mm');
  const date2 = dayjs(Date.now());

  const compareDay = date2.diff(date1, 'day');
  if (compareDay === 1) {
    return 'Hôm qua';
  }

  if (hiddenFormatTimeFromNow) {
    return dayjs(time).locale('vi').fromNow();
  }

  return dayjs(time, 'DD/MM/YYYY HH:mm').locale('vi').fromNow();
};

export const openSetting = () => {
  Linking.openSettings().catch(() => {
    Alert.alert('Unable to open settings');
  });
};

export const onMediaImage = async (
  options: ImagePicker.ImagePickerOptions,
  showDialog: (option: DialogOption) => Promise<boolean | undefined>,
) => {
  try {
    const currentPermision = await ImagePicker.getMediaLibraryPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaPermission.granted) {
      return await ImagePicker.launchImageLibraryAsync(options);
    } else if (!mediaPermission.granted && currentPermision.status !== 'undetermined') {
      const res = await showDialog({
        type: 'CONFIRM',
        title: 'Truy cập ảnh thất bại',
        message: 'Cần cho phép truy cập thư viện ảnh của bạn',
        confirmText: 'Cài đặt',
        cancelText: 'Huỷ',
      });
      if (res) {
        openSetting();
      }
    }
  } catch (error) {
    await showDialog({
      type: 'ALERT',
      title: 'Lỗi',
      message: 'Có lỗi xảy ra!',
    });
  }
};

export const onPickerImage = async (
  options: ImagePicker.ImagePickerOptions,
  showDialog: (option: DialogOption) => Promise<boolean>,
) => {
  try {
    const currentPermision = await ImagePicker.getMediaLibraryPermissionsAsync();
    const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (mediaPermission.granted) {
      return await ImagePicker.launchImageLibraryAsync(options);
    } else if (!mediaPermission.granted && currentPermision.status !== 'undetermined') {
      const res = await showDialog({
        type: 'CONFIRM',
        title: 'Truy cập ảnh thất bại',
        message: 'Cần cho phép truy cập thư viện ảnh của bạn',
        confirmText: 'Cài đặt',
        cancelText: 'Huỷ',
      });
      if (res) {
        openSetting();
      }
    }
  } catch (error) {
    await showDialog({
      type: 'ALERT',
      title: 'Lỗi',
      message: 'Có lỗi xảy ra!',
    });
  }
};

export const onLaunchCamera = async (
  options: ImagePicker.ImagePickerOptions,
  showDialog: (option: DialogOption) => Promise<boolean | undefined>,
) => {
  try {
    const currentPermision = await ImagePicker.getCameraPermissionsAsync();
    const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
    if (cameraPermission.granted) {
      return await ImagePicker.launchCameraAsync(options);
    } else if (!cameraPermission.granted && currentPermision.status !== 'undetermined') {
      const res = await showDialog({
        type: 'CONFIRM',
        title: 'Truy cập camera thất bại',
        message: 'Cần cho phép truy cập camera của bạn',
        confirmText: 'Cài đặt',
        cancelText: 'Huỷ',
      });
      if (res) {
        openSetting();
      }
    }
  } catch (error) {
    //error
  }
};

export const renderPrice = (value: number) => {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
};

export const transformFileToFormData = (file: ImagePicker.ImagePickerAsset) => {
  const formData = new FormData();

  const newImageUri = 'file:///' + file.uri.split('file:/').join('');

  formData.append('file', {
    uri: file.uri,
    type: mime.getType(newImageUri),
    name: file.uri.split('/').pop(),
  } as any);

  return formData;
};
