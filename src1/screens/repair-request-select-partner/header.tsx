import { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@rneui/themed';

import { tw } from '../../components';
import { SearchNormalSvg, SettingSVG } from '../../svg';

export const Header = memo(() => {
  return (
    <View style={tw`px-16px py-8px flex-row`}>
      <TouchableOpacity style={tw`flex-row items-center px-12px py-6px rounded-xl bg-grayscale-bg`}>
        <SearchNormalSvg width={16} height={16} />
        <Text style={tw`text-12px ml-6px`}>Tìm kiếm</Text>
      </TouchableOpacity>
      <TouchableOpacity style={tw`flex-row items-center px-12px py-6px rounded-xl bg-grayscale-bg`}>
        <SettingSVG width={16} height={16} fill="#202C38" />
        <Text style={tw`text-12px ml-6px`}>Tìm kiếm</Text>
      </TouchableOpacity>
    </View>
  );
});
