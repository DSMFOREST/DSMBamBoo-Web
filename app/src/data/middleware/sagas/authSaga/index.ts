import { fork, takeLatest, all } from "redux-saga/effects";

import {
  ADMIN_LOGIN,
  ADMIN_LOGIN_ASYNC,
  USER_LOGIN,
  USER_LOGIN_ASYNC,
  adminLoginType,
  adminLoginPayload,
  userLoginType,
  userLoginPayload,
  AdminLogin,
  UserLogin,
} from "data/actions/auth";
import { adminLoginApi, userLoginApi } from "data/middleware/api";
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

function* watchAdminLogin() {
  yield takeLatest(ADMIN_LOGIN, adminLogin);
}

function* watchUserLogin() {
  yield takeLatest(USER_LOGIN, userLogin);
}

export default function* authSaga() {
  yield all([fork(watchAdminLogin), fork(watchUserLogin)]);
}
