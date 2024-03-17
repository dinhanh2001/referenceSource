export const REGEXP = {
  email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  phone: /^0\d{9}$/,
  slug: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  letter_number_space: /^[A-Za-z0-9 ]*$/,
  coupon_code: /^[0-9]{8}(-)[0-9]{8}$/,
  fabric_code: /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/,
  at_least_one_number_and_one_letter: /[^\w\d]*(([0-9]+.*[A-Za-z]+.*)|[A-Za-z]+.*([0-9]+.*))/,
  // iframe: /?:<iframe[^>]*)(?:(?:\/>)|(?:>.*?<\/iframe>)/,
};
