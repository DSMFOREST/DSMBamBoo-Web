import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  adminLoginAction,
  userLoginAction,
  refreshAuthorizationTokenAction,
  refreshDeviceTokenAction,
  setAuthorizationTokensAction,
  logoutAction,
  setIsAdminAction,
  resetStatusAction,
} from "data/actions/auth";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/auth";
import {
  AdminLoginRequestType,
  UserLoginRequestType,
  RefreshToken,
  AccessToken,
  DeviceToken,
  AuthorizationTokens,
} from "data/middleware/api/apiTypes";

export const useAuthRedux = () => {
  const dispatch = useDispatch();
  const authStore = useSelector<AppState, InitialState>((state) => ({
    adminLoginStatus: state.auth.adminLoginStatus,
    userLoginStatus: state.auth.userLoginStatus,
    refreshAuthorizationTokenStatus: state.auth.refreshAuthorizationTokenStatus,
    refreshDeviceTokenStatus: state.auth.refreshDeviceTokenStatus,
    access_token: state.auth.access_token,
    refresh_token: state.auth.refresh_token,
    isAdmin: state.auth.isAdmin,
  }));

  const adminLogin = useCallback(
    (payload: AdminLoginRequestType) => {
      dispatch(adminLoginAction(payload));
    },
    [dispatch]
  );

  const userLogin = useCallback(
    (payload: UserLoginRequestType) => {
      dispatch(userLoginAction(payload));
    },
    [dispatch]
  );

  const refreshAuthorizationToken = useCallback(
    (payload: RefreshToken) => {
      dispatch(refreshAuthorizationTokenAction(payload));
    },
    [dispatch]
  );

  const refreshDeviceToken = useCallback(
    (payload: AccessToken & DeviceToken) => {
      dispatch(refreshDeviceTokenAction(payload));
    },
    [dispatch]
  );

  const setAuthorizationTokens = useCallback(
    (payload: AuthorizationTokens) => {
      dispatch(setAuthorizationTokensAction(payload));
    },
    [dispatch]
  );

  const setIsAdmin = useCallback(
    (payload: boolean) => {
      dispatch(setIsAdminAction(payload));
    },
    [dispatch]
  );

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const authReducer = {
    adminLogin,
    userLogin,
    refreshAuthorizationToken,
    refreshDeviceToken,
    setAuthorizationTokens,
    logout,
    setIsAdmin,
    resetStatus,
  };

  return { authStore, authReducer };
};
