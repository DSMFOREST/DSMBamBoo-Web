import {
  ApiPayload,
  AdminLoginRequestType,
  UserLoginRequestType,
  AuthorizationTokens,
  RefreshToken,
  AccessToken,
  DeviceToken,
} from "data/middleware/api/apiTypes";

export const ADMIN_LOGIN = "ADMIN_LOGIN" as const;
export const ADMIN_LOGIN_ASYNC = "ADMIN_LOGIN_ASYNC" as const;
export const USER_LOGIN = "USER_LOGIN" as const;
export const USER_LOGIN_ASYNC = "USER_LOGIN_ASYNC" as const;
export const REFRESH_AUTHORIZATION_TOKEN = "REFRESH_AUTHORIZATION_TOKEN" as const;
export const REFRESH_AUTHORIZATION_TOKEN_ASYNC = "REFRESH_AUTHORIZATION_TOKEN_ASYNC" as const;
export const REFRESH_DEVICE_TOKEN = "REFRESH_DEVICE_TOKEN" as const;
export const REFRESH_DEVICE_TOKEN_ASYNC = "REFRESH_DEVICE_TOKEN_ASYNC" as const;
export const SET_AUTHORIZATION_TOKENS = "SET_AUTHORIZATION_TOKENS" as const;
export const SET_IS_ADMIN = "SET_IS_ADMIN" as const;
export const LOG_OUT = "LOG_OUT" as const;
export const RESET_STATUS = "RESET_STATUS" as const;

export type adminLoginType = typeof ADMIN_LOGIN | typeof ADMIN_LOGIN_ASYNC;
export type adminLoginPayload = ApiPayload<AuthorizationTokens> &
  AdminLoginRequestType;
export interface AdminLogin {
  type: adminLoginType;
  payload: adminLoginPayload;
}

export type userLoginType = typeof USER_LOGIN | typeof USER_LOGIN_ASYNC;
export type userLoginPayload = ApiPayload<AuthorizationTokens> &
  UserLoginRequestType;
export interface UserLogin {
  type: userLoginType;
  payload: userLoginPayload;
}

export type refreshAuthorizationTokenType =
  | typeof REFRESH_AUTHORIZATION_TOKEN
  | typeof REFRESH_AUTHORIZATION_TOKEN_ASYNC;
export type refreshAuthorizationTokenPayload = ApiPayload<AuthorizationTokens> &
  RefreshToken;
export interface RefreshAuthorizationToken {
  type: refreshAuthorizationTokenType;
  payload: refreshAuthorizationTokenPayload;
}

export type refreshDeviceTokenType =
  | typeof REFRESH_DEVICE_TOKEN
  | typeof REFRESH_DEVICE_TOKEN_ASYNC;
export type refreshDeviceTokenPayload = ApiPayload & AccessToken & DeviceToken;
export interface RefreshDeviceToken {
  type: refreshDeviceTokenType;
  payload: refreshDeviceTokenPayload;
}

interface SetAuthorizationTokens {
  type: typeof SET_AUTHORIZATION_TOKENS;
  payload: AuthorizationTokens;
}

interface SetIsAdmin {
  type: typeof SET_IS_ADMIN;
  payload: boolean;
}

interface Logout {
  type: typeof LOG_OUT;
}

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type AuthActions =
  | AdminLogin
  | UserLogin
  | RefreshAuthorizationToken
  | RefreshDeviceToken
  | SetAuthorizationTokens
  | Logout
  | SetIsAdmin
  | ResetStatus;

export const adminLoginAction = (
  payload: AdminLoginRequestType
): AuthActions => ({
  type: ADMIN_LOGIN,
  payload,
});

export const userLoginAction = (
  payload: UserLoginRequestType
): AuthActions => ({
  type: USER_LOGIN,
  payload,
});

export const refreshAuthorizationTokenAction = (
  payload: RefreshToken
): AuthActions => ({
  type: REFRESH_AUTHORIZATION_TOKEN,
  payload,
});

export const refreshDeviceTokenAction = (
  payload: AccessToken & DeviceToken
): AuthActions => ({
  type: REFRESH_DEVICE_TOKEN,
  payload,
});

export const setAuthorizationTokensAction = (
  payload: AuthorizationTokens
): AuthActions => ({
  type: SET_AUTHORIZATION_TOKENS,
  payload,
});

export const setIsAdminAction = (payload: boolean): AuthActions => ({
  type: SET_IS_ADMIN,
  payload,
});

export const logoutAction = (): AuthActions => ({
  type: LOG_OUT,
});

export const resetStatusAction = (): AuthActions => ({
  type: RESET_STATUS,
});
