import React, { memo } from 'react';
import { View } from 'react-native';
import { Image, Text } from '@rneui/themed';

import { AppHeader, ChipButton, Screen, tw } from '../../components';
import { ArrowLeftSVG, CallSVG } from '../../svg';

export const GarageDetailScreen = memo(() => {
  // const navigator = useNavigation<NavigationProp<AppStackNavigatorParamList>>();
  // const {} = useRoute<RouteProp<AppStackNavigatorParamList, 'garage-detail'>>();

  function _renderHeading() {
    return (
      <View style={tw`flex flex-row gap-4 px-4`}>
        <View style={tw``}>
          <Image
            style={tw`h-[56px] w-[56px] rounded-xl`}
            source={{ uri: 'https://placehold.co/400x400/#FFC42C' }}
            resizeMode={'contain'}
          />
        </View>
        <View style={tw`flex-1 flex gap-1`}>
          <Text style={tw`text-white text-[17px] font-bold`}>Dịch vụ cứu hộ 911 Hà Nội</Text>
          <Text style={tw`text-white opacity-80`}>Chuyên máy công trình XCMG, Shacman,...</Text>
          <ChipButton
            leftIcon={<CallSVG />}
            style={tw`bg-transparent border border-primary mt-4`}
            text={<Text style={tw`text-primary`}>0944 911 911</Text>}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-[#11263d]`}>
      <Screen edges={['top', 'bottom']}>
        <AppHeader leftIcon={<ArrowLeftSVG fill={'#FFF'} width={24} height={24} />} />
        {_renderHeading()}
      </Screen>
    </View>
  );
});
