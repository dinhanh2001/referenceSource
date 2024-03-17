import { Images } from 'assets';
import {
  Divider,
  IconApp,
  ImageCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import React from 'react';
import { Image, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import { BaseStyle } from 'theme';

interface IProps {
  icon?: any;
  name: string;
  isLine?: boolean;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  styleLine?: StyleProp<ViewStyle>;
  isHiden?: boolean;
  isImage?: boolean;
  isArrowRight?: boolean;
  tintColor?: string;
}

const ListItem: React.FC<IProps> = ({
  icon,
  name,
  isLine,
  onPress,
  style,
  styleLine,
  isHiden,
  isImage,
  isArrowRight,
  tintColor,
}) => {
  const { colors } = useTheme();
  if (!isHiden) {
    return <ViewCus />;
  }

  return (
    <>
      <TouchCus
        onPress={onPress}
        style={[BaseStyle.flexRowSpaceBetwwen, BaseStyle.wrapperMain, style]}
        bg-white>
        <ViewCus style={[BaseStyle.flexRowSpaceBetwwen]}>
          {icon ? (
            isImage ? (
              <Image
                source={icon}
                style={[
                  styles.icContainer,
                  {
                    tintColor: tintColor || colors.primary,
                  },
                ]}
              />
            ) : (
              <IconApp
                style={styles.icContainer}
                color={tintColor || colors.primary}
                name={icon}
                size={22}
              />
            )
          ) : null}
          <TextCus useI18n>{name}</TextCus>
        </ViewCus>
        {isArrowRight && (
          <ImageCus source={Images.ArrowRight} style={styles.icRight} />
        )}
      </TouchCus>
      {!isLine && <Divider large style={[styleLine]} />}
    </>
  );
};
export default ListItem;

const styles = StyleSheet.create({
  icContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    marginRight: 14,
    borderRadius: 20,
  },
  icRight: {
    width: 20,
    height: 20,
    marginRight: 14,
  },
});
