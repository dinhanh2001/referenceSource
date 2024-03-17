import { OperatingUnitEnum } from '../graphql/type.interface';

export const FIREBASE_ACCESS_TOKEN = 'FIREBASE_ACCESS_TOKEN';
export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const REMEMBER_ME = 'REMEMBER_ME';
export const DEVICE_ID = 'DEVICE_ID';
export const KEYCHAIN_CREDENTIAL = 'KEYCHAIN_CREDENTIAL';
export const DISABLE_ATTEMPT_OTP = 'DISABLE_ATTEMPT_OTP';

export const validationMessage = {
  required: 'Trường này là bắt buộc',
  phone: {
    notValid: 'Định dạng số điện thoại phải gồm 10 kí tự số và bắt đầu bằng số 0',
  },
  citizenID: {
    notValid: 'Định dạng số CMND/CCCD phải gồm 9-12 kí tự số',
  },
  email: {
    notValid: 'Email không đúng định dạng',
  },
  cardNumber: {
    notValid: 'Định dạng số thẻ phải gồm 10-19 kí tự số',
  },
  invalidDateFormat: 'Vui lòng nhập đúng định dạng format: DD/MM/YYYY',
  notChoosePastDate: 'Vui lòng không chọn ngày trong quá khứ',
};

export const OPERATING_UNIT: any = {
  [OperatingUnitEnum.HOURS]: 'Giờ',
  [OperatingUnitEnum.KM]: 'Km',
};
