import { fork, takeLatest, all } from "redux-saga/effects";

import {
  LOGIN,
  LOGIN_ASYNC,
  loginType,
  loginPayload,
  Login,
  ADD_ADMIN,
  ADD_ADMIN_ASYNC,
  addAdminType,
  addAdminPayload,
  AddAdmin,
  GET_ADMIN_LIST,
  GET_ADMIN_LIST_ASYNC,
  getAdminListType,
  getAdminListPayload,
  GetAdminList,
} from "actions/auth";
import { loginApi, addAdminApi, getAdminListApi } from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* login(action: Login) {
  yield sagaEntity<loginType, loginPayload>({
    action,
    api: loginApi,
    type: LOGIN_ASYNC,
  });
}

function* addAdmin(action: AddAdmin) {
  yield sagaEntity<addAdminType, addAdminPayload>({
    action,
    api: addAdminApi,
    type: ADD_ADMIN_ASYNC,
  });
}

function* getAdminList(action: GetAdminList) {
  yield sagaEntity<getAdminListType, getAdminListPayload>({
    action,
    api: getAdminListApi,
    type: GET_ADMIN_LIST_ASYNC,
  });
}

function* whatchLogin() {
  yield takeLatest(LOGIN, login);
}

function* whatchAddAdmin() {
  yield takeLatest(ADD_ADMIN, addAdmin);
}

function* whatchGetAdminList() {
  yield takeLatest(GET_ADMIN_LIST, getAdminList);
}

export default function* authSaga() {
  yield all([
    fork(whatchLogin),
    fork(whatchAddAdmin),
    fork(whatchGetAdminList),
  ]);
}
