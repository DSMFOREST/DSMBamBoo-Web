import axios from "axios";

import { baseURL } from "./currentURL";
import {
  TokenWithType,
  AccessToken,
  AdminLoginRequestType,
  UserLoginRequestType,
  PagenationRequestType,
} from "./apiTypes";

export enum API_STATUS {
  adminLoginStatus = "adminLoginStatus",
  userLoginStatus = "userLoginStatus",
  getCategoryStatus = "getCategoryStatus",
  getNoticeStatus = "getNoticeStatus",
}

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

export const adminLoginApi = async ({ ...requset }: AdminLoginRequestType) => {
  const response = await instanceAxios.post("/admin/auth/signin", requset);

  return [response.data, response.status];
};

export const userLoginApi = async ({ ...requset }: UserLoginRequestType) => {
  const response = await instanceAxios.post("/auth/signin", requset);

  return [response.data, response.status];
};

export const getCategoryList = async ({ ...requset }: AccessToken) => {
  const response = await instanceAxios.get("/categories", {
    headers: authorizationHeader(requset.accessToken),
  });

  return [response.data, response.status];
};

export const getNoticeList = async ({
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
