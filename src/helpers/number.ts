export const thousandSeparator = (num: number | string) => {
  let x = num?.toString?.();
  const pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1.$2');
  return x;
};

export const atLeast2Digit = (num: number, len = 2) => {
  return `${num}`.padStart(len, '0');
};

export function convertToRoman(num: number) {
  const roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  };
  let str = '';

  for (const i of Object.keys(roman)) {
    const q = Math.floor(num / roman[i as keyof typeof roman]);
    num -= q * roman[i as keyof typeof roman];
    str += i.repeat(q);
  }

  return str;
}

const unitlist = ['', 'K', 'M', 'G'];
export function abbreviateNumber(number: number) {
  const sign = Math.sign(number);
  let unit = 0;

  while (Math.abs(number) >= 1000) {
    unit = unit + 1;
    number = Math.floor(Math.abs(number) / 100) / 10;
  }
  return `${sign * Math.abs(number)}${unitlist[unit]}`;
}
