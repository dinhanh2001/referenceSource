import { Images } from 'assets';
import {
  TouchCus,
  ImageCus,
  CarouselHorizontal,
  ViewCus,
  TextCus,
} from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { BaseStyle, Colors } from 'theme';
import { width } from 'utils';
import Toast from 'react-native-toast-message';
interface IProps {}
const Advertisement: React.FC<IProps> = () => {
  return (
    <ViewCus px-16 my-20>
      <ViewCus flex-row items-center mb-8>
        <ImageCus source={Images.iconGiftBox} size={12} />
        <TextCus ml-5 color={'#6C5F6D'} subhead>
          Mở tài khoản doanh nghiệp tại Hi Vietnam
        </TextCus>
      </ViewCus>
      <ViewCus backgroundColor={Colors.greyEE} br-8 py-8 px-12>
        <TextCus color={Colors.black3A} caption>
          Chính sách đặc biệt cho tài khoản{' '}
          <TextCus bold caption>
            Doanh Nghiệp
          </TextCus>{' '}
          để phân bổ quỹ thưởng , quỹ tiếp khách, quỹ du lịch cho nhân viên tại
          Hi Vietnam
        </TextCus>
        <ViewCus mt-8 flex-row items-center justify-space-between>
          <ViewCus px-8 br-43 justify-center backgroundColor={Colors.greenDark}>
            <TextCus color={Colors.white} caption bold>
              Được tài trợ từ đối tác
            </TextCus>
          </ViewCus>
          <TouchCus
            flex-row
            items-center
            px-8
            justify-center
            onPress={() => {
              Toast.show({
                type: 'error',
                text1: 'Tính năng đang được phát triển',
              });
            }}>
            <TextCus color={Colors.black} caption regular mr-4>
              Đăng ký
            </TextCus>
            <ImageCus
              source={Images.iconArrowLeft}
              size={12}
              resizeMode={'contain'}
            />
          </TouchCus>
        </ViewCus>
      </ViewCus>
    </ViewCus>
  );
};
const styles = StyleSheet.create({
  imagePromotion: {
    height: 112,
    width: '100%',
  },
  itemImage: {
    ...BaseStyle.boxShadow,
    position: 'relative',
    width: width / 1.5 - 22,
    borderRadius: 16,
    overflow: 'hidden',
    marginRight: 12,
  },
  tag: {
    position: 'absolute',
    left: -2,
    top: -6,
  },
  conent: {
    position: 'absolute',
    left: 8,
    top: 15,
  },
  lineH: {
    lineHeight: 16,
  },
  contentContainer: {
    paddingHorizontal: 10,
    overflow: 'visible',
  },
});
export default Advertisement;
