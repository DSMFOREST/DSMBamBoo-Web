import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  adminLoginAction,
  userLoginAction,
  resetStatusAction,
} from "data/actions/auth";
import { AppState } from "data/store";
import { InitialState } from "data/reducers/auth";
import {
  AdminLoginRequestType,
  UserLoginRequestType,
} from "data/middleware/api/apiTypes";

export const useAuthRedux = () => {
  const dispatch = useDispatch();
  const authStore = useSelector<AppState, InitialState>((state) => ({
    adminLoginStatus: state.auth.adminLoginStatus,
    userLoginStatus: state.auth.userLoginStatus,
    access_token: state.auth.access_token,
    refresh_token: state.auth.refresh_token,
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

  const resetStatus = useCallback(() => {
    dispatch(resetStatusAction());
  }, [dispatch]);

  const authReducer = {
    adminLogin,
    userLogin,
    resetStatus,
  };

  return { authStore, authReducer };
};
