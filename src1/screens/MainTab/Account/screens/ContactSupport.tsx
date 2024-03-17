import { Images } from 'assets';
import Icon from 'assets/svg/Icon';
import {
  HomeLayout,
  ImageCus,
  ScrollViewCus,
  TextCus,
  TouchCus,
  ViewCus,
} from 'components';
import { showCallPhone } from 'components/CallPhone/CallPhone';
import React from 'react';
import { Dimensions, Image, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Colors } from 'theme';
import { openLink } from 'utils';
import fakeContacts from 'utils/data/fakeContacts';

const ContactSupport: React.FC = () => {
  const { colors } = useTheme();
  const { width: screenW } = Dimensions.get('window');
  const { bottom } = useSafeAreaInsets();

  return (
    <HomeLayout
      bgColor={colors.secondary}
      header={{
        title: 'account.support',
        iconColor: Colors.white,
        renderRight: () => (
          <TouchCus
            onPress={() => {}}
            hitSlop={{
              left: 10,
              right: 10,
              top: 10,
              bottom: 10,
            }}>
            <Image source={Images.icChat2} style={styles.icRight} />
          </TouchCus>
        ),
      }}>
      <ViewCus px-0 py-24>
        <ViewCus
          style={[
            styles.headerHaftView,
            {
              backgroundColor: colors.secondary,
            },
          ]}
        />
        <ImageCus
          resizeMode="contain"
          source={Images.contactHeader}
          style={[
            styles.imgContactHeader,
            {
              width: screenW - 48,
            },
          ]}
        />
      </ViewCus>
      <ScrollViewCus
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: bottom,
          },
        ]}>
        {fakeContacts.map((item, _index) => {
          const handleCall = () => {
            showCallPhone({
              phone: item?.phoneNumber,
            });
          };

          const handleChat = () => {
            item?.chatLink && openLink('url', item?.chatLink);
          };

          return (
            <ViewCus
              key={item?.province + item?.phoneNumber}
              style={[styles.item, styles.shadow]}>
              <ViewCus style={styles.itemSubRow}>
                <Image
                  source={Images.contactLogo}
                  resizeMode="contain"
                  style={styles.imgLogo}
                />
                <TextCus regular>{item.province}</TextCus>
                <ViewCus style={styles.buttonRow}>
                  <TouchCus ml-12 onPress={handleChat}>
                    <Icon.Chat tintColor={colors.secondary} />
                  </TouchCus>
                  <TouchCus ml-12 onPress={handleCall}>
                    <Icon.SupportPhone tintColor={colors.secondary} />
                  </TouchCus>
                </ViewCus>
              </ViewCus>
              <TextCus regular>{item?.address || ''}</TextCus>
            </ViewCus>
          );
        })}
      </ScrollViewCus>
    </HomeLayout>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.greyF9,
  },
  clearPadding: {
    paddingHorizontal: 10,
  },
  line: {
    height: 1,
    backgroundColor: Colors.greyEE,
  },
  headerHaftView: {
    position: 'absolute',
    height: '50%',
    width: '100%',
  },
  imgContactHeader: {
    marginHorizontal: 24,
    alignSelf: 'center',
    aspectRatio: 327 / 150,
  },
  icRight: {
    width: 24,
    height: 24,
  },
  imgLogo: {
    width: 80,
    height: 17,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  item: {
    flex: 1,
    marginHorizontal: 24,
    marginVertical: 8,
    padding: 14,
    minHeight: 76,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
  itemSubRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 76,
    marginRight: 14,
  },
});
export default ContactSupport;
