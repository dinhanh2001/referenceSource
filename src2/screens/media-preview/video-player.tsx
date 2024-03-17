import { ResizeMode, Video } from 'expo-av';
import { memo, useState } from 'react';
import { View } from 'react-native';

import { ActivityIndicator, tw } from '../../components';

type Props = {
  uri: string;
  shouldPlay?: boolean;
};

export const VideoPlayer = memo(({ uri, shouldPlay }: Props) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <View style={tw`relative aspect-16/9 w-screen bg-white`}>
      <Video
        style={tw`w-full aspect-16/9`}
        source={{
          uri,
        }}
        resizeMode={ResizeMode.CONTAIN}
        useNativeControls
        isLooping
        onLoad={({ isLoaded }) => setLoaded(isLoaded)}
        shouldPlay={shouldPlay}
      />
      {!loaded && (
        <View style={tw`justify-center items-center absolute top-0 left-0 w-full h-full bg-black bg-opacity-50`}>
          <ActivityIndicator />
        </View>
      )}
    </View>
  );
});
