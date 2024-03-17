import React, {useEffect, useState} from 'react';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import Icon from 'assets/svg/Icon';
import { IconCus, ImageCus, TextCus, TouchCus, ViewCus } from 'components';
import styles from './styles';
import { BaseStyle, Colors } from 'theme';
import { FindCarScreenStepView } from '../FindCar';
import { height } from 'utils';
import { NavigationService } from 'navigation';
import { Images } from 'assets';
import { Advertisement } from 'screens/MainTab/Home/Components';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ScrollView} from "react-native";

interface IProps {
  goBack: () => void;
  onMap: () => void;
  setStepView?: React.Dispatch<React.SetStateAction<FindCarScreenStepView>>;
  setIsShowRecentLocation?: React.Dispatch<boolean>;
  setLocationFinal?: React.Dispatch<any>;
}

const RecentLocation: React.FC<IProps> = props => {
  
  const [dataRecent, setDataRecent] = useState([]);
  
  useEffect(() => {
    fetchDataRecent();
  }, []);
  
  const fetchDataRecent = async () => {
    const data = await AsyncStorage.getItem('RecentLocations');
    const dataParse = JSON.parse(data ?? '[]');
    setDataRecent(dataParse);
  };
  
  return (
    <ViewCus flex-1 flex-column flexGrow-1 style={[styles.w100]}>
      <ViewCus style={styles.headerRecent}>
        <TouchCus style={styles.backIconRecent} onPress={props.goBack}>
          <IconCus name={'chevron-left'} size={24} color={'#08A3A2'} />
        </TouchCus>
        <TouchCus onPress={props.onMap}>
          <ImageCus
            source={Images.IconMapSearch}
            style={{ width: 44, height: 24 }}
          />
        </TouchCus>
      </ViewCus>
      <TouchCus
        mt-10
        items-center
        onPress={() => {
          props.setStepView?.(FindCarScreenStepView.CHOOSE_FROM_TO);
          props.setIsShowRecentLocation?.(false);
        }}
        style={[
          BaseStyle.flexRow,
          {
            borderWidth: 1,
            borderColor: '#9DA5A5',
            paddingHorizontal: 12,
            paddingVertical: 8,
            borderRadius: 8,
            marginHorizontal: 16,
            marginTop: 34,
          },
        ]}>
        <ViewCus>
          <Icon.IconLocationMain />
        </ViewCus>
        <ViewCus f-1>
          <TextCus ml-10 bold color={'#697575'}>
            Đến đâu?
          </TextCus>
        </ViewCus>
      </TouchCus>
      <ScrollView>
        <ViewCus mt-16>
          {!!dataRecent?.length &&
            dataRecent?.splice(0, 5)?.map(data => {
              return (
                <TouchCus
                  onPress={() => {
                    props?.setLocationFinal?.(data);
                    props.setStepView?.(FindCarScreenStepView.CHOOSE_FROM_TO);
                    props.setIsShowRecentLocation?.(false);
                  }}
                  style={styles.itemRecent}>
                  <Icon.ClockRecentSearch />
                  <ViewCus ml-10>
                    <TextCus
                      bold
                      mainSize
                      color={'#242B30'}
                      numberOfLines={1}
                      width={'85%'}>
                      {data?.name || ''}
                    </TextCus>
                    <TextCus
                      width={'85%'}
                      regular
                      subhead
                      color={'#242B30'}
                      numberOfLines={1}>
                      {data?.address || ''}
                    </TextCus>
                  </ViewCus>
                </TouchCus>
              );
            })}
        </ViewCus>
        <Advertisement />
        <ViewCus>
          <ViewCus flex-row items-center justify-space-between px-16>
            <ViewCus flex-row items-center>
              <Icon.HeartRed />
              <TextCus ml-6 bold mainSize color={'#242B30'}>
                Lưu địa điểm yêu thích
              </TextCus>
            </ViewCus>
            <Icon.LocationFav />
          </ViewCus>
          <ViewCus flex-row px-16 pt-20>
            <TouchCus onPress={() => {}} items-center>
              <ImageCus source={Images.HomeFav} size={56} />
              <TextCus mt-6 caption color={'#697575'}>
                Nhà riêng
              </TextCus>
            </TouchCus>
            <TouchCus onPress={() => {}} items-center ml-18>
              <ImageCus source={Images.CompanyFav} size={56} />
              <TextCus mt-6 caption color={'#697575'}>
                Cơ quan
              </TextCus>
            </TouchCus>
            <TouchCus onPress={() => {}} items-center ml-18>
              <ImageCus source={Images.CoffeeFav} size={56} />
              <TextCus mt-6 caption color={'#697575'}>
                Thêm khác
              </TextCus>
            </TouchCus>
          </ViewCus>
        </ViewCus>
      </ScrollView>
    </ViewCus>
  );
};

export default RecentLocation;
