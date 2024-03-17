import { IconName } from 'assets';
import { RNFlatList, IconApp, TextCus, TouchCus, ViewCus } from 'components';
import React from 'react';
import { FlatListProps, ListRenderItem } from 'react-native';
import { Colors } from 'theme';
import CountDown from 'react-native-countdown-component';
import { useTheme } from 'react-native-paper';

interface IProps<T> extends FlatListProps<T> {
  title?: string;
  onPress?: () => void | undefined;
  data: T[];
  renderItem: ListRenderItem<T>;
  showCountdown?: boolean;
}
const CarouselHorizontal = <T extends object | number>(props: IProps<T>) => {
  const {
    renderItem,
    title,
    onPress,
    data,
    showCountdown = false,
    ...rest
  } = props;
  const { colors } = useTheme();

  return (
    <ViewCus px-5>
      {title && (
        <ViewCus flex-row items-center justify-space-between mb-16 px-12>
          <ViewCus flex-row items-center>
            <TextCus heading3 bold useI18n>
              {title}
            </TextCus>
            {showCountdown && (
              <CountDown
                size={9}
                until={1000 * 100}
                onFinish={() => {}}
                digitStyle={{
                  backgroundColor: colors.primary,
                  borderColor: colors.primary,
                  borderWidth: 2,
                }}
                digitTxtStyle={{ color: Colors.white }}
                timeLabelStyle={{ color: 'red', fontWeight: 'bold' }}
                separatorStyle={{ color: Colors.black }}
                timeToShow={['H', 'M', 'S']}
                timeLabels={{ m: null, s: null }}
                style={{ marginLeft: 5 }}
                showSeparator
              />
            )}
          </ViewCus>

          {!showCountdown && (
            <TouchCus onPress={onPress!} flex-row items-center>
              <TextCus useI18n color={Colors.hsba} subhead mr-5>
                seeAll
              </TextCus>
              {/*<IconApp*/}
              {/*  name={IconName.ChevronRight}*/}
              {/*  size={14}*/}
              {/*  color={'#171A1F'}*/}
              {/*/>*/}
            </TouchCus>
          )}
        </ViewCus>
      )}
      <RNFlatList
        data={data}
        renderItem={renderItem}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        decelerationRate={'fast'}
        {...rest}
      />
    </ViewCus>
  );
};
export default CarouselHorizontal;
