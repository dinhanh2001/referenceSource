import Icon from 'assets/svg/Icon';
import { TextCus, ViewCus } from 'components';
import styles from './styles';
import { Colors } from 'theme';
const CannotFoundDriver: React.FC = props => {
  return (
    <>
      <Icon.ICON_ERROR />
      <ViewCus p-16 style={[styles.w100]}>
        <ViewCus items-center>
          {!props?.title ? (
            <TextCus useI18n heading1 bold color={Colors.redBF}>
              Không tìm thấy dịch vụ
            </TextCus>
          ) : (
            <TextCus useI18n heading1 bold color={Colors.redBF}>
              delivery.cannotFindDriver
            </TextCus>
          )}
          <TextCus useI18n>delivery.cannotFindDriverQuote</TextCus>
        </ViewCus>
      </ViewCus>
    </>
  );
};

export default CannotFoundDriver;
