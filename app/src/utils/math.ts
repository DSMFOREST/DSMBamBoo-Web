export const fileSizeSum = (fileArray: File[]) =>
  fileArray.reduce((prev, acc) => prev + acc.size, 0);
