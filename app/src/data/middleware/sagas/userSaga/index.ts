import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_USER_LIST,
  GET_USER_LIST_ASYNC,
  SEARCH_USER,
  SEARCH_USER_ASYNC,
  SEARCH_USER_EMAIL,
  SEARCH_USER_EMAIL_ASYNC,
  CHANGE_USER_PROFILE,
  CHANGE_USER_PROFILE_ASYNC,
  CHANGE_USER_NAME,
  CHANGE_USER_NAME_ASYNC,
  SET_USABLE_USER,
  SET_USABLE_USER_ASYNC,
  SET_RATING_USER,
  SET_RATING_USER_ASYNC,
  getUserListType,
  getUserListPayload,
  searchUserType,
  searchUserPayload,
  searchUserEmailType,
  searchUserEmailPayload,
  ChangeUserProfileType,
  ChangeUserProfilePayload,
  ChangeUserNameType,
  ChangeUserNamePayload,
  SetUsableUserType,
  SetUsableUserPayload,
  SetRatingUserType,
  SetRatingUserPayload,
  GetUserList,
  SearchUser,
  SearchUserEmail,
  ChangeUserProfile,
  ChangeUserName,
  SetUsableUser,
  SetRatingUser,
} from "actions/user";
import {
  getUserListApi,
  searchUesrApi,
  searchUesrEmailApi,
  changeUserProfileApi,
  changeUserNameApi,
  setUsableUserApi,
  setRatingUserApi,
} from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getUserList(action: GetUserList) {
  yield sagaEntity<getUserListType, getUserListPayload>({
    action,
    api: getUserListApi,
    type: GET_USER_LIST_ASYNC,
  });
}
function* searchUser(action: SearchUser) {
  yield sagaEntity<searchUserType, searchUserPayload>({
    action,
    api: searchUesrApi,
    type: SEARCH_USER_ASYNC,
  });
}
function* searchUserEmail(action: SearchUserEmail) {
  yield sagaEntity<searchUserEmailType, searchUserEmailPayload>({
    action,
    api: searchUesrEmailApi,
    type: SEARCH_USER_EMAIL_ASYNC,
  });
}
function* changeUserProfile(action: ChangeUserProfile) {
  yield sagaEntity<ChangeUserProfileType, ChangeUserProfilePayload>({
    action,
    api: changeUserProfileApi,
    type: CHANGE_USER_PROFILE_ASYNC,
  });
}
function* changeUserName(action: ChangeUserName) {
  yield sagaEntity<ChangeUserNameType, ChangeUserNamePayload>({
    action,
    api: changeUserNameApi,
    type: CHANGE_USER_NAME_ASYNC,
  });
}
function* setUsableUser(action: SetUsableUser) {
  yield sagaEntity<SetUsableUserType, SetUsableUserPayload>({
    action,
    api: setUsableUserApi,
    type: SET_USABLE_USER_ASYNC,
  });
}
function* setRatingUser(action: SetRatingUser) {
  yield sagaEntity<SetRatingUserType, SetRatingUserPayload>({
    action,
    api: setRatingUserApi,
    type: SET_RATING_USER_ASYNC,
  });
}

function* watchGetUserList() {
  yield takeLatest(GET_USER_LIST, getUserList);
}
function* watchSearchUser() {
  yield takeLatest(SEARCH_USER, searchUser);
}
function* watchSearchUserEmail() {
  yield takeLatest(SEARCH_USER_EMAIL, searchUserEmail);
}
function* watchChangeUserProfile() {
  yield takeLatest(CHANGE_USER_PROFILE, changeUserProfile);
}
function* watchChangeUserName() {
  yield takeLatest(CHANGE_USER_NAME, changeUserName);
}
function* watchSetUsableUser() {
  yield takeLatest(SET_USABLE_USER, setUsableUser);
}
function* watchSetRatingUser() {
  yield takeLatest(SET_RATING_USER, setRatingUser);
}

export default function* userSaga() {
  yield all([
    fork(watchGetUserList),
    fork(watchSearchUser),
    fork(watchSearchUserEmail),
    fork(watchChangeUserProfile),
    fork(watchChangeUserName),
    fork(watchSetUsableUser),
    fork(watchSetRatingUser),
  ]);
}
