import { HomeLayout, ImageCus, TextCus, ViewCus } from 'components';
import React from 'react';
import { Colors } from 'theme';
import { Images } from 'assets';
import { useTheme } from 'react-native-paper';

const Games = () => {
  const { colors } = useTheme();
  return (
    <HomeLayout
      bgColor={colors.primary}
      header={{
        notGoBack: true,
        title: 'bottom.games',
        iconColor: Colors.white,
      }}>
      <ViewCus p-20 f-1 items-center mt-20>
        <ImageCus source={Images.bgEmpty} size={100} />
        <TextCus heading4 semiBold mt-10>
          Không có dữ liệu
        </TextCus>
      </ViewCus>
    </HomeLayout>
  );
};

export default Games;
