import {
  ApiPayload,
  AdminLoginRequestType,
  UserLoginRequestType,
  AuthorizationTokens,
} from "data/middleware/api/apiTypes";

export const ADMIN_LOGIN = "ADMIN_LOGIN" as const;
export const ADMIN_LOGIN_ASYNC = "ADMIN_LOGIN_ASYNC" as const;
export const USER_LOGIN = "USER_LOGIN" as const;
export const USER_LOGIN_ASYNC = "USER_LOGIN_ASYNC" as const;
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

interface ResetStatus {
  type: typeof RESET_STATUS;
}

export type AuthActions = AdminLogin | UserLogin | ResetStatus;

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

export const resetStatusAction = (): AuthActions => ({
  type: RESET_STATUS,
});
