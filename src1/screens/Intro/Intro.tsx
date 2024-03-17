import { ImageCus, TextCus, TouchCus } from 'components';
import { useAuth } from 'hooks';
import { NavigationService, Routes } from 'navigation';
import React, { useRef, useState } from 'react';
import { Dimensions, View } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import FastImage from 'react-native-fast-image';
import { Colors } from 'theme';
import { IIntroSilde } from 'types';
import { slidesIntro } from 'utils';
import styles from './styles';

const Intro = () => {
  const { onShowFirstIntro } = useAuth();

  const [activeDot, setActiveDot] = useState(0);
  const sliderIntro = useRef<AppIntroSlider>(null);
  const { width: screenW } = Dimensions.get('window');

  const _renderItem = ({ item }) => {
    const { image, subtitle, title } = item as IIntroSilde;

    return (
      <View style={styles.wrapperIntro}>
        <View style={styles.haflFlex} />
        <View style={styles.contentImage}>
          <ImageCus
            source={image}
            style={[
              styles.image,
              {
                width: screenW - 60,
              },
            ]}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
        <View style={styles.viewContent}>
          <TextCus useI18n heading1 main mb-12 textAlign="left" color-black3A>
            {title}
          </TextCus>
          <TextCus useI18n heading5 medium textAlign="left" color-grey85>
            {subtitle}
          </TextCus>
        </View>
      </View>
    );
  };

  const nextIntro = () => {
    if (activeDot < slidesIntro.length - 1) {
      sliderIntro.current?.goToSlide(activeDot + 1, true);
      return;
    }
    onShowFirstIntro();
    NavigationService.navigate(Routes.InputPhone);
  };

  const handleSkip = () => {
    onShowFirstIntro();
    NavigationService.navigate(Routes.InputPhone);
  };

  return (
    <AppIntroSlider
      ref={sliderIntro}
      renderItem={_renderItem}
      data={slidesIntro}
      dotStyle={styles.dot}
      activeDotStyle={styles.dotActive}
      renderPagination={() => {
        const canSkip = activeDot < slidesIntro?.length - 1;
        return (
          <View style={styles.pagination}>
            <TouchCus
              minw-60
              h-40
              items-flex-start
              style={styles.btnSkip}
              onPress={handleSkip}
              disabled={!canSkip}>
              <TextCus useI18n color={Colors.greyAD} bold>
                {canSkip ? 'auth.skip' : ''}
              </TextCus>
            </TouchCus>

            <View style={styles.contentDot}>
              {slidesIntro.map((_, index: number) => {
                return (
                  <View
                    style={[
                      styles.dot,
                      activeDot === index && styles.dotActive,
                    ]}
                    key={index}
                  />
                );
              })}
            </View>
            {activeDot === slidesIntro.length - 1 ? (
              <TouchCus
                style={styles.btnRegister}
                onPress={nextIntro}
                minw-60
                h-40
                items-flex-end
                justify-center>
                <TextCus useI18n color-main bold>
                  loginContinue
                </TextCus>
              </TouchCus>
            ) : (
              <TouchCus
                activeOpacity={0.8}
                minw-60
                h-40
                items-flex-end
                justify-center
                onPress={nextIntro}>
                {/* <IconApp
                    name={IconName.ChevronRight}
                    size={16}
                    color={Colors.white}
                  /> */}
                <TextCus useI18n color-main bold>
                  auth.next
                </TextCus>
              </TouchCus>
            )}
          </View>
        );
      }}
      onSlideChange={(index: number) => {
        setActiveDot(index);
      }}
      bottomButton={true}
      showSkipButton={true}
    />
  );
};

export default Intro;
