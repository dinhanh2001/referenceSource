import { HomeLayout, ModalCus } from 'components';
import React from 'react';
import { Colors } from 'theme';
import { usePermisstion } from 'hooks/usePermisstion';
import { PERMISSIONS } from 'react-native-permissions';
import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';
import { CameraScreen } from 'react-native-camera-kit';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';

const QRCode: React.FC = () => {
  const { isHasPermisstion, onSetting } = usePermisstion(
    Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
  );
  const camera = React.useRef<CameraScreen | null>(null);
  const [qrCode, setQRCode] = React.useState<any>('');
  const [visible, setVisible] = React.useState(false);
  const onReadScanner = (event: any) => {
    if (event.nativeEvent.codeStringValue) {
      setQRCode(event.nativeEvent.codeStringValue);
      setVisible(true);
    }
  };

  const handleCloseBottom = () => {
    setVisible(false);
  };

  const onClick = () => {
    Clipboard.setString(qrCode);
    Toast.show({
      type: 'success',
      text2: 'Sao chép thành công',
    });
  };
  return (
    <HomeLayout
      bgColor={Colors.main}
      header={{
        iconColor: Colors.white,
        title: 'home.qr_code',
      }}>
      <React.Suspense>
        {!isHasPermisstion && (
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: 'center', color: '#000' }}>
              Vui lòng cấp quyền camera
            </Text>
            <TouchableOpacity onPress={onSetting} style={{ marginTop: 10 }}>
              <Text
                style={{ fontSize: 16, color: Colors.main, fontWeight: '500' }}>
                Đi tới cài đặt
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {isHasPermisstion && (
          <CameraScreen
            ref={ref => (camera.current = ref)}
            hideControls
            scanBarcode={true}
            showFrame={true}
            laserColor="#3d5cff"
            frameColor="#3d5cff"
            cameraRatioOverlay={{}}
            captureButtonImage={undefined}
            cameraFlipImage={undefined}
            torchOnImage={undefined}
            torchOffImage={undefined}
            onBottomButtonPressed={() => {}}
            captureButtonImageStyle={{}}
            cameraFlipImageStyle={{}}
            torchImageStyle={{}}
            focusMode="off"
            onReadCode={onReadScanner}
          />
        )}
      </React.Suspense>
      {visible && (
        <View
          style={{
            backgroundColor: Colors.white,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              alignItems: 'center',
              marginBottom: 10,
              justifyContent: 'space-between',
            }}>
            <View style={{ width: '100%', padding: 5 }}>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: 14,
                  lineHeight: 20,
                  color: 'black',
                  textAlign: 'left',
                }}>
                {qrCode}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '70%',
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              onPress={() => onClick()}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: 'skyblue',
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ alignSelf: 'center', color: '#FFF' }}>
                Sao chép
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleCloseBottom()}
              style={{
                paddingVertical: 10,
                paddingHorizontal: 30,
                backgroundColor: 'red',
                borderRadius: 5,
                marginLeft: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ alignSelf: 'center', color: '#FFF' }}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </HomeLayout>
  );
};

export default QRCode;
