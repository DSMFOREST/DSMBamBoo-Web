export const emailRegular = /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
export const passwordRegular = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}$/;
export const authenticationNumber = /^[0-9a-zA-Z]{6}$/;
export const phoneNumberRegular = /^[0-9]{11}$/;
export const nickNameRegular = /^[0-9각-힣a-zA-Z_]+$/;
export const moneyRegular = /[^0-9]/g;

export const checkOnlyNumber = (value: string): boolean =>
  /^[0-9,]+$/.test(value) || value === "";

export const checkLanguage = (value: string): boolean =>
  /^[ㄱ-ㅎ각-힣a-zA-Z]+$/g.test(value) || !value;

export const numberWithCommas = (value: string) => {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const phoneNumberWithDash = (value: string) => {
  return value.replace(
    /(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/,
    "$1-$2-$3"
  );
};

export const birth6wordWithDash = (value: string) => {
  return value.replace(/([0-9]{2})([0-9]{2})([0-9]{2})/, "$1-$2-$3");
};

export const birth8wordWithDash = (value: string) => {
  return value.replace(/([0-9]{4})([0-9]{2})([0-9]{2})/, "$1-$2-$3");
};

export const onlyNumber = (value: string) => {
  return value.replace(/[^0-9]/g, "");
};
