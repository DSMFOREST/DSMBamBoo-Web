export function convert1dArrayTo2dArray(array: any, sliceLength: number) {
  const newArr = [];
  while (array.length) newArr.push(array.splice(0, sliceLength));
  return newArr;
}

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
