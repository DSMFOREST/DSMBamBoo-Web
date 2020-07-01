import { fork, takeLatest, all } from "redux-saga/effects";

import {
  ADMIN_LOGIN,
  ADMIN_LOGIN_ASYNC,
  USER_LOGIN,
  USER_LOGIN_ASYNC,
  REFRESH_AUTHORIZATION_TOKEN,
  REFRESH_AUTHORIZATION_TOKEN_ASYNC,
  REFRESH_DEVICE_TOKEN,
  REFRESH_DEVICE_TOKEN_ASYNC,
  adminLoginType,
  adminLoginPayload,
  userLoginType,
  userLoginPayload,
  refreshAuthorizationTokenType,
  refreshAuthorizationTokenPayload,
  refreshDeviceTokenType,
  refreshDeviceTokenPayload,
  AdminLogin,
  UserLogin,
  RefreshAuthorizationToken,
  RefreshDeviceToken,
} from "data/actions/auth";
import {
  adminLoginApi,
  userLoginApi,
  refreshDeviceTokenApi,
  refreshAuthorizationTokenApi,
} from "data/middleware/api";
import { sagaEntity } from "data/middleware/sagas";

function* adminLogin(action: AdminLogin) {
  yield sagaEntity<adminLoginType, adminLoginPayload>({
    action,
    api: adminLoginApi,
    type: ADMIN_LOGIN_ASYNC,
  });
}

function* userLogin(action: UserLogin) {
  yield sagaEntity<userLoginType, userLoginPayload>({
    action,
    api: userLoginApi,
    type: USER_LOGIN_ASYNC,
  });
}
function* refreshAuthorizationToken(action: RefreshAuthorizationToken) {
  yield sagaEntity<
    refreshAuthorizationTokenType,
    refreshAuthorizationTokenPayload
  >({
    action,
    api: refreshAuthorizationTokenApi,
    type: REFRESH_AUTHORIZATION_TOKEN_ASYNC,
  });
}
function* refreshDeviceToken(action: RefreshDeviceToken) {
  yield sagaEntity<refreshDeviceTokenType, refreshDeviceTokenPayload>({
    action,
    api: refreshDeviceTokenApi,
    type: REFRESH_DEVICE_TOKEN_ASYNC,
  });
}

function* watchAdminLogin() {
  yield takeLatest(ADMIN_LOGIN, adminLogin);
}

function* watchUserLogin() {
  yield takeLatest(USER_LOGIN, userLogin);
}

function* watchRefreshAuthorizationToken() {
  yield takeLatest(REFRESH_AUTHORIZATION_TOKEN, refreshAuthorizationToken);
}

function* watchRefreshDeviceToken() {
  yield takeLatest(REFRESH_DEVICE_TOKEN, refreshDeviceToken);
}

export default function* authSaga() {
  yield all([
    fork(watchAdminLogin),
    fork(watchUserLogin),
    fork(watchRefreshAuthorizationToken),
    fork(watchRefreshDeviceToken),
  ]);
}
