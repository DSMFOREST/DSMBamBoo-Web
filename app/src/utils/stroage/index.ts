export const setTokenToStorage = (
  tokenName: "accessToken" | "refreshToken",
  token: string | undefined
) => {
  if (tokenName === "accessToken") {
    sessionStorage.setItem(tokenName, token || "");
  } else if (tokenName === "refreshToken") {
    localStorage.setItem(tokenName, token || "");
  }
};

export const getTokenToStorage = (
  tokenName: "accessToken" | "refreshToken"
): string => {
  if (tokenName === "accessToken") {
    return sessionStorage.getItem(tokenName) ?? "";
  }

  return localStorage.getItem(tokenName) ?? "";
};

export const setDeviceToken = (token: string) => {
  sessionStorage.setItem("deviceToken", token);
};

export const getDeviceToken = () => {
  return sessionStorage.getItem("deviceToken");
};

export const setAdminRefreshToken = (token: string) => {
  localStorage.setItem("adminRefreshToken", token);
};

export const getAdminRefreshToken = () => {
  return localStorage.getItem("adminRefreshToken");
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
