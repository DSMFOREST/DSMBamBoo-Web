import { fork, takeLatest, all } from "redux-saga/effects";

import {
  GET_NOTICE_LIST,
  GET_NOTICE_LIST_ASYNC,
  getNoticeListType,
  getNoticeListPayload,
  GetNoticeList,
  POST_NOTICE,
  POST_NOTICE_ASYNC,
  postNoticeType,
  postNoticePayload,
  PostNotice,
  REMOVE_NOTICE,
  REMOVE_NOTICE_ASYNC,
  removeNoticeType,
  removeNoticePayload,
  RemoveNotice
} from "actions/notice";
import {
  getNoticeListApi,
  postNoticeApi,
  removeNoticeApi
} from "middleware/api";
import { sagaEntity } from "middleware/sagas";

function* getNoticeList(action: GetNoticeList) {
  yield sagaEntity<getNoticeListType, getNoticeListPayload>({
    action,
    api: getNoticeListApi,
    type: GET_NOTICE_LIST_ASYNC
  });
}

function* postNotice(action: PostNotice) {
  yield sagaEntity<postNoticeType, postNoticePayload>({
    action,
    api: postNoticeApi,
    type: POST_NOTICE_ASYNC
  });
}

function* removeNotice(action: RemoveNotice) {
  yield sagaEntity<removeNoticeType, removeNoticePayload>({
    action,
    api: removeNoticeApi,
    type: REMOVE_NOTICE_ASYNC
  });
}

function* watchGetNoticeList() {
  yield takeLatest(GET_NOTICE_LIST, getNoticeList);
}

function* watchPostNotice() {
  yield takeLatest(POST_NOTICE, postNotice);
}

function* watchRemoveNotice() {
  yield takeLatest(REMOVE_NOTICE, removeNotice);
}

export default function* noticeSaga() {
  yield all([
    fork(watchGetNoticeList),
    fork(watchPostNotice),
    fork(watchRemoveNotice)
  ]);
}
