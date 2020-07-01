import axios from "axios";

import { baseURL } from "./currentURL";
import {
  TokenWithType,
  AccessToken,
  DeviceToken,
  RefreshToken,
  AdminLoginRequestType,
  UserLoginRequestType,
  PagenationRequestType,
} from "./apiTypes";

export enum API_STATUS {
  adminLoginStatus = "adminLoginStatus",
  userLoginStatus = "userLoginStatus",
  getCategoryStatus = "getCategoryStatus",
  getNoticeStatus = "getNoticeStatus",
  refreshDeviceTokenStatus = "refreshDeviceTokenStatus",
  refreshAuthorizationTokenStatus = "refreshAuthorizationTokenStatus",
}

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const refreshDeviceTokenApi = async ({
  accessToken,
  ...requset
}: TokenWithType<DeviceToken>) => {
  const response = await instanceAxios.patch(
    "/users/me/device-token",
    requset,
    {
      headers: authorizationHeader(accessToken),
    }
  );

  return [response.data, response.status];
};

export const refreshAuthorizationTokenApi = async ({
  refresh_token,
}: RefreshToken) => {
  const response = await instanceAxios.patch("/auth/refresh", null, {
    headers: {
      "X-Refresh-Token": refresh_token,
    },
  });

  return [response.data, response.status];
};

export const adminLoginApi = async ({ ...requset }: AdminLoginRequestType) => {
  const response = await instanceAxios.post("/admin/auth/signin", requset);

  return [response.data, response.status];
};

export const userLoginApi = async ({ ...requset }: UserLoginRequestType) => {
  const response = await instanceAxios.post("/auth/signin", requset);

  return [response.data, response.status];
};

export const getCategoryListApi = async ({ ...requset }: AccessToken) => {
  const response = await instanceAxios.get("/categories", {
    headers: authorizationHeader(requset.accessToken),
  });

  return [response.data, response.status];
};

export const getNoticeListApi = async ({
  accessToken,
  ...requset
}: TokenWithType<PagenationRequestType>) => {
  const response = await instanceAxios.get("/notices", {
    headers: authorizationHeader(accessToken),
    params: {
      ...requset,
    },
  });

  return [response.data, response.status];
};
