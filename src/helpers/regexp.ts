export const REGEXP = {
  email: /^[a-zA-Z0-9]+@+((\w+[-]?\w+\.){1,})\w+[-]?\w+$/,
  phone: /^0\d{9}$/,
  bankCardID: /^\d{10,19}$/,
  citizenID: /^\d{9,12}$/,
  slug: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  letter_number_space: /^[A-Za-z0-9 ]*$/,
  coupon_code: /^[0-9]{8}(-)[0-9]{8}$/,
  fabric_code: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  at_least_one_number_and_one_letter: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  // eslint-disable-next-line no-useless-escape
  date: /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/,
  // iframe: /?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>)/,
};
