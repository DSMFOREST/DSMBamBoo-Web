export const roundUpToNumber = (
  number: number,
  roundUpPlace: 1 | 10 | 100 | 1000
) => {
  return Math.round(number / (roundUpPlace * 10)) * roundUpPlace * 10;
};

export const fileSizeSum = (fileArray: File[]) =>
  fileArray.reduce((prev, acc) => prev + acc.size, 0);
