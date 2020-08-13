export function b64DecodeUnicode(str: string | undefined) {
  return str
    ? decodeURIComponent(
        Array.prototype.map
          .call(atob(str), function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      )
    : "";
}

export function decodingToToken<T>(token: string | undefined): T {
  const data = token?.split(".")[1];

  return data ? JSON.parse(b64DecodeUnicode(data)) : null;
}

export const fileSizeToMb = (size: number) => {
  if (size < 1000000) {
    return `${(size / 1000).toFixed(2)}KB`;
  } else {
    return `${(size / 1000000).toFixed(2)}MB`;
  }
};
