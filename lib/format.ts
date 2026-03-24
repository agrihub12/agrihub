export const formatNaira = (kobo: number): string => {
  return `₦${(kobo / 100).toLocaleString("en-NG")}`;
};

export const toKobo = (naira: number): number => {
  return Math.round(naira * 100);
};
