import { Icons, Images } from 'assets';
import Icon from 'assets/svg/Icon';
import { HomeLayout, ImageCus, TextCus, ViewCus } from 'components';
import { NavigationService, Routes } from 'navigation';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { UserSelectors } from 'store/user';
import { Colors, FontWeight } from 'theme';
import { IUserInfo } from 'types';
import { formatMoney, getImage } from 'utils';
import { getWalletProfileAPI } from 'utils/APIManager';
import { Platform } from 'react-native';
import { useTheme } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import Lotties from 'theme/Lotties';
interface wallet {
  id?: string;
  user_name?: string;
  wallet_active?: number;
  point?: number;
  promotion?: number;
  total_amount?: number;
}
export default function Wallet() {
  const [wallet, setWallet] = useState<wallet>({});
  const userInfo = useSelector(
    UserSelectors.getAttrByKey('userInfo'),
  ) as IUserInfo;
  const { colors } = useTheme();

  const DataFunction = [
    {
      id: 1,
      Icon: <Icon.IncreasePoint tintColor={colors.secondary} />,
      title: 'Nạp điểm',
      action: () => NavigationService.navigate(Routes.TopUpPoint, {}),
    },
    {
      id: 2,
      Icon: <Icon.DecreasePoint tintColor={colors.secondary} />,
      title: 'Rút điểm',
      action: () =>
        NavigationService.navigate(Routes.WithdrawPoints, {
          wallet: wallet,
        }),
    },
    {
      id: 3,
      Icon: <Icon.History tintColor={colors.secondary} />,
      title: 'Lịch sử',
      action: () => NavigationService.navigate(Routes.HistoryWallet, {}),
    },
    {
      id: 4,
      Icon: <Icon.Volunteer tintColor={colors.secondary} />,
      title: 'Thiện Nguyện',
      action: () => {},
    },
  ];

  const getWalletProfile = async () => {
    try {
      const res = await getWalletProfileAPI(userInfo?.id);
      if (res) {
        setWallet(res?.data?.result?.[0]);
      }
    } catch (error) {
      if (error) {
      }
    }
  };

  useEffect(() => {
    getWalletProfile();
  }, []);

  const renderTopContent = () => {
    return (
      <ViewCus>
        <ViewCus
          style={[
            styles.boxHeader,
            {
              backgroundColor: colors.secondary,
            },
          ]}>
          <ViewCus style={styles.boxContent}>
            {/* <Image source={getImage({ image: userInfo?.avatar })} /> */}
            {/* <ImageCus
              style={styles.image}
              source={{ uri: getImage({ image: userInfo?.avatar }) }}
            /> */}
            <ViewCus style={styles.walletRow}>
              <ViewCus style={styles.lottieWalletContainer}>
                <LottieView
                  loop
                  autoPlay={true}
                  source={Lotties?.[userInfo?.gender || 'MALE']}
                  style={styles.lottieWallet}
                  renderMode="SOFTWARE"
                />
              </ViewCus>
              <ViewCus>
                <TextCus regular color="white">
                  Số dư hiện tại
                </TextCus>
                <TextCus heading1 color="white">
                  {formatMoney(wallet?.total_amount || 0)}
                </TextCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
        <ViewCus style={styles.viewChooseDate}>
          <ViewCus style={styles.viewChooseDate1}>
            <ViewCus
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* <Image source={Icons.IconWallet} /> */}
              <Icon.Wallet tintColor={colors.secondary} />
              <TextCus heading5 regular style={{ marginLeft: 8 }}>
                Ví hoạt động
              </TextCus>
            </ViewCus>

            <ViewCus style={styles.textChooseDate}>
              <TextCus
                heading3
                color={colors.primary}
                style={{ marginRight: 10 }}>
                {formatMoney(wallet?.wallet_active || 0)}
              </TextCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>

        <ViewCus
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ViewCus style={styles.viewWalletAdd}>
            <ViewCus style={styles.viewChooseDate1}>
              <ViewCus
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon.AddPoint tintColor={colors.secondary} />
                <TextCus heading5 regular style={{ marginLeft: 8 }}>
                  Điểm nạp
                </TextCus>
              </ViewCus>

              <ViewCus style={styles.textChooseDate}>
                <TextCus
                  heading3
                  color={colors.primary}
                  style={{ marginRight: 10 }}>
                  {formatMoney(wallet?.point || 0)}
                </TextCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
          <ViewCus style={styles.viewWalletAdd}>
            <ViewCus style={styles.viewChooseDate1}>
              <ViewCus
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon.Discount tintColor={colors.secondary} />
                <TextCus heading5 regular style={{ marginLeft: 8 }}>
                  Khuyến mãi
                </TextCus>
              </ViewCus>

              <ViewCus style={styles.textChooseDate}>
                <TextCus
                  heading3
                  color={colors.primary}
                  style={{ marginRight: 10 }}>
                  {formatMoney(wallet?.promotion || 0)}
                </TextCus>
              </ViewCus>
            </ViewCus>
          </ViewCus>
        </ViewCus>
      </ViewCus>
    );
  };
  return (
    <HomeLayout
      bgColor={colors.secondary}
      header={{
        notGoBack: false,
        title: 'Ví điểm',
        iconColor: Colors.white,
      }}>
      <ViewCus
        style={{
          backgroundColor: Colors.greyF7,
          flex: 1,
        }}>
        {renderTopContent()}
        <ViewCus style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <TextCus heading4>Chức năng</TextCus>
          <ViewCus style={styles.viewContentFunction}>
            {DataFunction?.map((e, index) => (
              <TouchableOpacity
                onPress={e?.action ? e?.action : () => {}}
                key={`${index}_${e.id}`}
                style={{ alignItems: 'center' }}>
                {e.Icon}
                <TextCus style={{ marginTop: 6 }}>{e.title}</TextCus>
              </TouchableOpacity>
            ))}
          </ViewCus>
        </ViewCus>
        <ViewCus style={{ paddingHorizontal: 24, marginTop: 24 }}>
          <TextCus heading5>Chương trình thành viên Hi-Goladi</TextCus>
          <Image
            resizeMode="cover"
            source={Images.ProgramForCustomer}
            style={styles.imgProgramForCustomer}
          />
        </ViewCus>
      </ViewCus>
    </HomeLayout>
  );
}
const styles = StyleSheet.create({
  header: {
    flex: 1,
    marginTop: 12,
  },
  divide: {},
  boxUpdated: {
    backgroundColor: Colors.blueED,
  },
  textUpdated: {
    fontSize: 14,
    lineHeight: 16,
    color: Colors.black3A,
  },
  textWallet: {
    fontSize: 14,
    lineHeight: 19,
  },
  btnAction: {
    width: 71,
    height: 28,
    borderRadius: 4,
  },
  boxHeader: {
    height: 100,
    backgroundColor: Colors.main,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },

  container: {
    flexGrow: 1,
    backgroundColor: Colors.white,
  },
  boxContent: {
    height: 100,
    alignItems: 'center',
    marginLeft: 24,
    flexDirection: 'row',
  },
  textIncome: {
    fontSize: 16,
    lineHeight: 18,
  },
  textMoney: {
    fontSize: 24,
    fontWeight: FontWeight.bold,
    color: Colors.black3A,
    paddingTop: 6,
  },
  viewChooseDate: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    marginTop: 30,
  },
  viewWalletAdd: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
    width: '47%',
    marginTop: 20,
  },
  viewChooseDate1: {
    width: '90%',
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: Colors.greyEE,
  },
  textChooseDate: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
  },
  viewTotal: {
    width: '90%',
    height: 80,
    backgroundColor: Colors.white,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  viewContentFunction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 12,
  },
  image: {
    height: 56,
    width: 56,
    borderRadius: 28,
    alignSelf: 'center',
  },
  lottieWallet: {
    width: 48,
    height: 48,
  },
  walletRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lottieWalletContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.white,
    padding: 4,
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },
  imgProgramForCustomer: {
    marginTop: 10,
    width: '100%',
    borderRadius: 8,
  },
});
