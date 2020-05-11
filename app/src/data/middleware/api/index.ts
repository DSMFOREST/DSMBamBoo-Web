import axios, { AxiosError } from "axios";

import { baseURL } from "./currentURL";
import { TokenWithType } from "./apiTypes";

export enum API_STATUS {
  loginStatus = "loginStatus",
}

const authorizationHeader = (accessToken: string) => ({
  Authorization: `Bearer ${accessToken}`,
});

const instanceAxios = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});
