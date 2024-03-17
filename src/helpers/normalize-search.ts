export const normalizeSearch = (str: string, des: string) => {
  const normalize = (x: string) =>
    x
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[đĐ]/g, 'd');

  return normalize(str).includes(normalize(des));
};
