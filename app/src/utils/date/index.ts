export const firstSeatChecker = (date: number) => {
  if (date < 10) {
    return `0${date}`;
  }

  return String(date);
};

export const returnAfterDateToFormattingDate = (afterDate: string) => {
  const newDate = new Date();
  const numberAfterDate = Number(afterDate.split("일")[0]);

  newDate.setDate(newDate.getDate() + numberAfterDate);

  const year = newDate.getFullYear();
  const month = firstSeatChecker(newDate.getMonth() + 1);
  const date = firstSeatChecker(newDate.getDate());

  return `${year}-${month}-${date}`;
};

export const splitHyphen = (value: string) => value.split("-");

// birth is like "20020126"
export const residentRegistrationNumberToAge = (birth: string) => {
  const tmpSSN = birth.slice(2);
  const isOld = Number(birth.slice(0, 1)) === 1;
  const tmpBirthday = tmpSSN.substring(2, 6);

  const nowDate = new Date();
  const y = nowDate.getFullYear();
  const m = firstSeatChecker(nowDate.getMonth() + 1);
  const d = firstSeatChecker(nowDate.getDate());
  const curDate = y + m + d;

  let tmpAge = isOld
    ? y - (1900 + parseInt(tmpSSN.substring(0, 2), 10))
    : y - (2000 + parseInt(tmpSSN.substring(0, 2), 10));

  if (curDate > y + tmpBirthday) {
    tmpAge += 1;
  }

  return tmpAge - 1;
};
